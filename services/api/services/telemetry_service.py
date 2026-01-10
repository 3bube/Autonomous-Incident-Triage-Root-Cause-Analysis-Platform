"""
Telemetry service for querying raw telemetry data
"""
from sqlalchemy.orm import Session
from sqlalchemy import and_, func, desc
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from models.logs_model import LogModel
from models.metrics_model import MetricsModel
from models.traces_model import TracesModel
from models.events_model import EventModel
from core.config import get_logger
import statistics

logger = get_logger(__name__)


class TelemetryService:
    """Service for querying and aggregating telemetry data"""

    @staticmethod
    def query_logs(
        db: Session,
        service_name: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        level: Optional[str] = None,
        skip: int = 0,
        limit: int = 100,
    ) -> tuple[List[LogModel], int]:
        """
        Query logs with filtering by service, time range, and level.
        
        Returns: (logs list, total count)
        """
        try:
            query = db.query(LogModel)
            
            if service_name:
                query = query.filter(LogModel.service_name == service_name)
            
            if start_time:
                query = query.filter(LogModel.timestamp >= start_time)
            
            if end_time:
                query = query.filter(LogModel.timestamp <= end_time)
            
            if level:
                query = query.filter(LogModel.level == level.upper())
            
            total = query.count()
            
            logs = query.order_by(desc(LogModel.timestamp)).offset(skip).limit(limit).all()
            
            return logs, total
        except Exception as e:
            logger.error(f"Error querying logs: {str(e)}")
            raise

    @staticmethod
    def query_metrics(
        db: Session,
        service_name: Optional[str] = None,
        metric_name: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        skip: int = 0,
        limit: int = 100,
    ) -> tuple[List[MetricsModel], int]:
        """
        Query metrics with filtering by service, metric name, and time range.
        
        Returns: (metrics list, total count)
        """
        try:
            query = db.query(MetricsModel)
            
            if service_name:
                query = query.filter(MetricsModel.service_name == service_name)
            
            if metric_name:
                query = query.filter(MetricsModel.metric_name == metric_name)
            
            if start_time:
                query = query.filter(MetricsModel.timestamp >= start_time)
            
            if end_time:
                query = query.filter(MetricsModel.timestamp <= end_time)
            
            total = query.count()
            
            metrics = (
                query.order_by(desc(MetricsModel.timestamp))
                .offset(skip)
                .limit(limit)
                .all()
            )
            
            return metrics, total
        except Exception as e:
            logger.error(f"Error querying metrics: {str(e)}")
            raise

    @staticmethod
    def query_traces(
        db: Session,
        service_name: Optional[str] = None,
        trace_id: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        status: Optional[str] = None,
        skip: int = 0,
        limit: int = 100,
    ) -> tuple[List[TracesModel], int]:
        """
        Query distributed traces with filtering.
        
        Returns: (traces list, total count)
        """
        try:
            query = db.query(TracesModel)
            
            if service_name:
                query = query.filter(TracesModel.service_name == service_name)
            
            if trace_id:
                query = query.filter(TracesModel.trace_id == trace_id)
            
            if start_time:
                query = query.filter(TracesModel.timestamp >= start_time)
            
            if end_time:
                query = query.filter(TracesModel.timestamp <= end_time)
            
            if status:
                query = query.filter(TracesModel.status == status)
            
            total = query.count()
            
            traces = (
                query.order_by(desc(TracesModel.timestamp))
                .offset(skip)
                .limit(limit)
                .all()
            )
            
            return traces, total
        except Exception as e:
            logger.error(f"Error querying traces: {str(e)}")
            raise

    @staticmethod
    def query_events(
        db: Session,
        service_name: Optional[str] = None,
        event_type: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        severity: Optional[str] = None,
        skip: int = 0,
        limit: int = 100,
    ) -> tuple[List[EventModel], int]:
        """
        Query events with filtering by service, type, severity, and time range.
        
        Returns: (events list, total count)
        """
        try:
            query = db.query(EventModel)
            
            if service_name:
                query = query.filter(EventModel.service_name == service_name)
            
            if event_type:
                query = query.filter(EventModel.type == event_type)
            
            if start_time:
                query = query.filter(EventModel.timestamp >= start_time)
            
            if end_time:
                query = query.filter(EventModel.timestamp <= end_time)
            
            if severity:
                query = query.filter(EventModel.severity == severity)
            
            total = query.count()
            
            events = (
                query.order_by(desc(EventModel.timestamp))
                .offset(skip)
                .limit(limit)
                .all()
            )
            
            return events, total
        except Exception as e:
            logger.error(f"Error querying events: {str(e)}")
            raise

    @staticmethod
    def get_log_statistics(
        db: Session,
        service_name: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
    ) -> Dict[str, Any]:
        """
        Calculate log statistics (error counts, warning counts, etc).
        """
        try:
            query = db.query(LogModel)
            
            if service_name:
                query = query.filter(LogModel.service_name == service_name)
            
            if start_time:
                query = query.filter(LogModel.timestamp >= start_time)
            
            if end_time:
                query = query.filter(LogModel.timestamp <= end_time)
            
            total_logs = query.count()
            
            # Count by level
            level_counts = {}
            for level in ["ERROR", "WARN", "INFO", "DEBUG"]:
                count = query.filter(LogModel.level == level).count()
                level_counts[level.lower()] = count
            
            error_rate = (
                (level_counts.get("error", 0) / total_logs * 100)
                if total_logs > 0
                else 0
            )
            
            return {
                "total_logs": total_logs,
                "error_count": level_counts.get("error", 0),
                "warning_count": level_counts.get("warn", 0),
                "info_count": level_counts.get("info", 0),
                "debug_count": level_counts.get("debug", 0),
                "error_rate": round(error_rate, 2),
            }
        except Exception as e:
            logger.error(f"Error calculating log statistics: {str(e)}")
            raise

    @staticmethod
    def get_latency_statistics(
        db: Session,
        service_name: Optional[str] = None,
        operation: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
    ) -> Dict[str, Any]:
        """
        Calculate latency statistics from traces (p50, p95, p99, avg, max).
        """
        try:
            query = db.query(TracesModel.duration)
            
            if service_name:
                query = query.filter(TracesModel.service_name == service_name)
            
            if operation:
                query = query.filter(TracesModel.operation == operation)
            
            if start_time:
                query = query.filter(TracesModel.timestamp >= start_time)
            
            if end_time:
                query = query.filter(TracesModel.timestamp <= end_time)
            
            durations = [row[0] for row in query.all()]
            
            if not durations:
                return {
                    "count": 0,
                    "avg_latency": 0,
                    "p50_latency": 0,
                    "p95_latency": 0,
                    "p99_latency": 0,
                    "max_latency": 0,
                    "min_latency": 0,
                }
            
            durations.sort()
            
            return {
                "count": len(durations),
                "avg_latency": round(statistics.mean(durations), 2),
                "p50_latency": round(statistics.quantiles(durations, n=100)[49], 2),
                "p95_latency": round(statistics.quantiles(durations, n=100)[94], 2),
                "p99_latency": round(statistics.quantiles(durations, n=100)[98], 2),
                "max_latency": round(max(durations), 2),
                "min_latency": round(min(durations), 2),
            }
        except Exception as e:
            logger.error(f"Error calculating latency statistics: {str(e)}")
            raise

    @staticmethod
    def get_metric_statistics(
        db: Session,
        metric_name: str,
        service_name: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
    ) -> Dict[str, Any]:
        """
        Calculate statistics for a specific metric.
        """
        try:
            query = db.query(MetricsModel.value).filter(
                MetricsModel.metric_name == metric_name
            )
            
            if service_name:
                query = query.filter(MetricsModel.service_name == service_name)
            
            if start_time:
                query = query.filter(MetricsModel.timestamp >= start_time)
            
            if end_time:
                query = query.filter(MetricsModel.timestamp <= end_time)
            
            values = [row[0] for row in query.all()]
            
            if not values:
                return {
                    "count": 0,
                    "avg": 0,
                    "max": 0,
                    "min": 0,
                    "stddev": 0,
                }
            
            return {
                "count": len(values),
                "avg": round(statistics.mean(values), 2),
                "max": round(max(values), 2),
                "min": round(min(values), 2),
                "stddev": round(statistics.stdev(values), 2) if len(values) > 1 else 0,
            }
        except Exception as e:
            logger.error(f"Error calculating metric statistics: {str(e)}")
            raise

    @staticmethod
    def get_event_statistics(
        db: Session,
        service_name: Optional[str] = None,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
    ) -> Dict[str, Any]:
        """
        Calculate event statistics (counts by type and severity).
        """
        try:
            query = db.query(EventModel)
            
            if service_name:
                query = query.filter(EventModel.service_name == service_name)
            
            if start_time:
                query = query.filter(EventModel.timestamp >= start_time)
            
            if end_time:
                query = query.filter(EventModel.timestamp <= end_time)
            
            total_events = query.count()
            
            # Count by type
            type_counts = {}
            for event_type in ["config_change", "deployment", "scaling", "restart"]:
                count = query.filter(EventModel.type == event_type).count()
                type_counts[event_type] = count
            
            # Count by severity
            severity_counts = {}
            for severity in ["critical", "warning", "info"]:
                count = query.filter(EventModel.severity == severity).count()
                severity_counts[severity] = count
            
            return {
                "total_events": total_events,
                "by_type": type_counts,
                "by_severity": severity_counts,
            }
        except Exception as e:
            logger.error(f"Error calculating event statistics: {str(e)}")
            raise

    @staticmethod
    def get_service_list(db: Session) -> List[str]:
        """
        Get list of all unique service names in telemetry.
        """
        try:
            services = set()
            
            log_services = db.query(LogModel.service_name.distinct()).all()
            services.update([s[0] for s in log_services if s[0]])
            
            metric_services = db.query(MetricsModel.service_name.distinct()).all()
            services.update([s[0] for s in metric_services if s[0]])
            
            trace_services = db.query(TracesModel.service_name.distinct()).all()
            services.update([s[0] for s in trace_services if s[0]])
            
            event_services = db.query(EventModel.service_name.distinct()).all()
            services.update([s[0] for s in event_services if s[0]])
            
            return sorted(list(services))
        except Exception as e:
            logger.error(f"Error getting service list: {str(e)}")
            raise
