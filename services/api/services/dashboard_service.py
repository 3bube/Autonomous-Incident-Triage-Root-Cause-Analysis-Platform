"""
Dashboard service for aggregating and processing dashboard data
"""
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from models.logs_model import LogModel
from models.metrics_model import MetricsModel
from models.traces_model import TracesModel
from models.events_model import EventModel
from core.config import get_logger
from services.telemetry_service import TelemetryService
from services.ai_service import ai_service

logger = get_logger(__name__)


class DashboardService:
    """Service for aggregating telemetry data for dashboard display"""

    @staticmethod
    def calculate_service_health(
        db: Session, service_name: str, hours: int = 1
    ) -> Dict[str, Any]:
        """
        Calculate service health based on error rates and latency.
        
        Returns health status: 'healthy', 'degraded', 'critical'
        """
        try:
            from models.services_model import ServiceModel
            
            start_time = datetime.utcnow() - timedelta(hours=hours)
            
            # Get service details from services table
            service = db.query(ServiceModel).filter(ServiceModel.name == service_name).first()
            service_id = service.id if service else 0
            
            # Get log statistics
            log_stats = TelemetryService.get_log_statistics(
                db, service_name=service_name, start_time=start_time
            )
            
            # Get latency statistics
            latency_stats = TelemetryService.get_latency_statistics(
                db, service_name=service_name, start_time=start_time
            )
            
            error_rate = log_stats["error_rate"]
            avg_latency = latency_stats.get("avg_latency", 0)
            
            # Determine health status
            if error_rate > 20 or avg_latency > 5000:
                status = "critical"
                severity_score = 3
            elif error_rate > 10 or avg_latency > 2000:
                status = "degraded"
                severity_score = 2
            else:
                status = "healthy"
                severity_score = 1
            
            return {
                "service_id": service_id,
                "service_name": service_name,
                "version": "v1.0",  # Default version, can be enhanced later
                "status": status,
                "severity_score": severity_score,
                "error_rate": error_rate,
                "avg_latency": avg_latency,
                "error_count": log_stats["error_count"],
                "total_logs": log_stats["total_logs"],
            }
        except Exception as e:
            logger.error(f"Error calculating service health: {str(e)}")
            raise

    @staticmethod
    def get_incident_volume_trends(
        db: Session, service_name: Optional[str] = None, hours: int = 24
    ) -> Dict[str, Any]:
        """
        Get incident volume trends as time series data.
        
        Groups incidents by hour to show trends.
        """
        try:
            start_time = datetime.utcnow() - timedelta(hours=hours)
            
            query = db.query(
                func.date_format(EventModel.timestamp, "%Y-%m-%d %H:00:00"),
                func.count(EventModel.id),
            ).filter(EventModel.timestamp >= start_time)
            
            if service_name:
                query = query.filter(EventModel.service_name == service_name)
            
            query = query.group_by(
                func.date_format(EventModel.timestamp, "%Y-%m-%d %H:00:00")
            ).order_by(func.date_format(EventModel.timestamp, "%Y-%m-%d %H:00:00"))
            
            data_points = []
            for timestamp_str, count in query.all():
                data_points.append(
                    {
                        "timestamp": timestamp_str,
                        "incident_count": count,
                    }
                )
            
            return {
                "service_name": service_name or "all",
                "time_range_hours": hours,
                "data_points": data_points,
            }
        except Exception as e:
            logger.error(f"Error getting incident volume trends: {str(e)}")
            raise

    @staticmethod
    def get_critical_services(
        db: Session, hours: int = 1, limit: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Get list of critical/degraded services ordered by severity.
        """
        try:
            services = TelemetryService.get_service_list(db)
            
            service_health = []
            for service in services:
                health = DashboardService.calculate_service_health(
                    db, service, hours=hours
                )
                service_health.append(health)
            
            # Sort by severity score (descending) and error rate (descending)
            service_health.sort(
                key=lambda x: (
                    -x["severity_score"],
                    -x["error_rate"],
                ),
                reverse=False,
            )
            
            # Filter to only degraded/critical services
            critical_services = [
                s for s in service_health if s["status"] != "healthy"
            ]
            
            return critical_services[:limit]
        except Exception as e:
            logger.error(f"Error getting critical services: {str(e)}")
            raise

    @staticmethod
    def get_correlation_analysis(
        db: Session,
        service_name: Optional[str] = None,
        hours: int = 1,
    ) -> Dict[str, Any]:
        """
        Analyze correlations between logs, events, and metrics with AI predictions.
        
        Returns correlations with AI-predicted root causes.
        """
        try:
            start_time = datetime.utcnow() - timedelta(hours=hours)
            
            # Get error logs timeline
            error_logs_query = (
                db.query(LogModel)
                .filter(LogModel.level == "ERROR")
                .filter(LogModel.timestamp >= start_time)
            )
            if service_name:
                error_logs_query = error_logs_query.filter(
                    LogModel.service_name == service_name
                )
            error_logs = error_logs_query.all()
            
            # Get events in same time range
            events_query = db.query(EventModel).filter(
                EventModel.timestamp >= start_time
            )
            if service_name:
                events_query = events_query.filter(
                    EventModel.service_name == service_name
                )
            events = events_query.all()
            
            # Get high latency traces
            traces_query = db.query(TracesModel).filter(
                TracesModel.timestamp >= start_time,
                TracesModel.duration > 2000,  # > 2 seconds
            )
            if service_name:
                traces_query = traces_query.filter(
                    TracesModel.service_name == service_name
                )
            traces = traces_query.all()
            
            # Get anomalous metrics
            metrics_query = db.query(MetricsModel).filter(
                MetricsModel.timestamp >= start_time
            )
            if service_name:
                metrics_query = metrics_query.filter(
                    MetricsModel.service_name == service_name
                )
            metrics = metrics_query.all()
            
            # Use Groq AI to predict root cause
            root_cause_prediction = ai_service.predict_root_cause(
                [log.to_dict() for log in error_logs],
                [event.to_dict() for event in events],
                [trace.to_dict() for trace in traces],
            )
            
            # Calculate correlation score using Groq AI
            correlation_score = ai_service.score_correlation(
                [log.to_dict() for log in error_logs],
                [event.to_dict() for event in events],
                [trace.to_dict() for trace in traces],
            )
            
            correlations = []
            
            # Correlate errors with events
            if error_logs and events:
                error_time_range = (
                    min([log.timestamp for log in error_logs]),
                    max([log.timestamp for log in error_logs]),
                )
                events_in_window = [
                    e
                    for e in events
                    if error_time_range[0]
                    <= e.timestamp
                    <= error_time_range[1] + timedelta(minutes=5)
                ]
                if events_in_window:
                    correlations.append(
                        {
                            "type": "event_error_correlation",
                            "error_count": len(error_logs),
                            "event_count": len(events_in_window),
                            "confidence": min(
                                1.0, len(events_in_window) / len(error_logs)
                            ),
                            "events": [
                                {"type": e.type, "timestamp": e.timestamp.isoformat()}
                                for e in events_in_window[:5]
                            ],
                        }
                    )
            
            # Correlate errors with latency
            if error_logs and traces:
                error_time_range = (
                    min([log.timestamp for log in error_logs]),
                    max([log.timestamp for log in error_logs]),
                )
                slow_traces_in_window = [
                    t
                    for t in traces
                    if error_time_range[0]
                    <= t.timestamp
                    <= error_time_range[1] + timedelta(minutes=5)
                ]
                if slow_traces_in_window:
                    correlations.append(
                        {
                            "type": "latency_error_correlation",
                            "error_count": len(error_logs),
                            "slow_trace_count": len(slow_traces_in_window),
                            "avg_slow_duration": sum(
                                [t.duration for t in slow_traces_in_window]
                            )
                            / len(slow_traces_in_window),
                            "confidence": min(
                                1.0, len(slow_traces_in_window) / len(error_logs)
                            ),
                        }
                    )
            
            return {
                "service_name": service_name or "all",
                "time_range_hours": hours,
                "error_logs_count": len(error_logs),
                "events_count": len(events),
                "slow_traces_count": len(traces),
                "correlations": correlations,
                "ai_prediction": root_cause_prediction,
                "correlation_score": correlation_score,
            }
        except Exception as e:
            logger.error(f"Error getting correlation analysis: {str(e)}")
            raise

    @staticmethod
    def get_dashboard_overview(
        db: Session, hours: int = 1
    ) -> Dict[str, Any]:
        """
        Get comprehensive dashboard overview with all key metrics.
        """
        try:
            services = TelemetryService.get_service_list(db)
            start_time = datetime.utcnow() - timedelta(hours=hours)
            
            # Calculate health for all services
            service_health_list = []
            critical_count = 0
            degraded_count = 0
            
            for service in services:
                health = DashboardService.calculate_service_health(
                    db, service, hours=hours
                )
                service_health_list.append(health)
                
                if health["status"] == "critical":
                    critical_count += 1
                elif health["status"] == "degraded":
                    degraded_count += 1
            
            # Overall statistics
            total_logs = db.query(LogModel).filter(
                LogModel.timestamp >= start_time
            ).count()
            total_events = db.query(EventModel).filter(
                EventModel.timestamp >= start_time
            ).count()
            total_traces = db.query(TracesModel).filter(
                TracesModel.timestamp >= start_time
            ).count()
            
            return {
                "timestamp": datetime.utcnow().isoformat(),
                "time_range_hours": hours,
                "total_services": len(services),
                "healthy_services": len(services) - critical_count - degraded_count,
                "degraded_services": degraded_count,
                "critical_services": critical_count,
                "total_logs": total_logs,
                "total_events": total_events,
                "total_traces": total_traces,
                "service_health": service_health_list,
            }
        except Exception as e:
            logger.error(f"Error getting dashboard overview: {str(e)}")
            raise
    