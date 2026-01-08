"""Metrics generator for time-series telemetry data."""

from datetime import datetime, timedelta
from typing import List, Dict, Any
import random
import numpy as np
from .base import BaseGenerator


class MetricsGenerator(BaseGenerator):
    """Generate realistic time-series metrics."""
    
    def __init__(self, seed: int = None):
        super().__init__(seed)
        self.baseline_values = {
            "cpu_usage": 45.0,
            "memory_usage": 60.0,
            "disk_usage": 70.0,
            "request_latency": 120.0,
            "request_rate": 1000.0,
            "error_rate": 0.5,
            "connection_pool_active": 50.0,
            "queue_depth": 100.0,
            "cache_hit_ratio": 85.0,
            "db_query_time": 50.0
        }
        self.volatility = {
            "cpu_usage": 5.0,
            "memory_usage": 3.0,
            "disk_usage": 2.0,
            "request_latency": 20.0,
            "request_rate": 100.0,
            "error_rate": 0.2,
            "connection_pool_active": 10.0,
            "queue_depth": 30.0,
            "cache_hit_ratio": 5.0,
            "db_query_time": 10.0
        }
    
    def generate(self, start_time: datetime, duration_seconds: int, 
                 interval_seconds: int = 10) -> List[Dict[str, Any]]:
        """Generate normal metrics."""
        metrics = []
        time_buckets = self.get_time_buckets(start_time, duration_seconds, interval_seconds)
        services = self.get_service_names(count=3)
        metric_names = self.get_metric_names(count=5)
        
        for timestamp in time_buckets:
            for service in services:
                for metric in metric_names:
                    value = self._generate_normal_value(metric)
                    metrics.append({
                        "timestamp": timestamp.isoformat(),
                        "service": service,
                        "metric": metric,
                        "value": value,
                        "unit": self._get_unit(metric)
                    })
        
        return metrics
    
    def generate_anomaly(self, start_time: datetime, duration_seconds: int,
                         interval_seconds: int = 10, severity: float = 2.0) -> List[Dict[str, Any]]:
        """Generate metrics with anomalies."""
        metrics = []
        time_buckets = self.get_time_buckets(start_time, duration_seconds, interval_seconds)
        services = self.get_service_names(count=3)
        metric_names = self.get_metric_names(count=5)
        
        for timestamp in time_buckets:
            for service in services:
                for metric in metric_names:
                    value = self._generate_anomaly_value(metric, severity)
                    metrics.append({
                        "timestamp": timestamp.isoformat(),
                        "service": service,
                        "metric": metric,
                        "value": value,
                        "unit": self._get_unit(metric),
                        "anomaly": True
                    })
        
        return metrics
    
    def _generate_normal_value(self, metric: str) -> float:
        """Generate normal metric value."""
        baseline = self.baseline_values.get(metric, 50.0)
        volatility = self.volatility.get(metric, 5.0)
        value = baseline + np.random.normal(0, volatility)
        return max(0, min(100, value)) if "ratio" in metric or "usage" in metric else max(0, value)
    
    def _generate_anomaly_value(self, metric: str, severity: float) -> float:
        """Generate anomalous metric value."""
        baseline = self.baseline_values.get(metric, 50.0)
        volatility = self.volatility.get(metric, 5.0)
        
        if "error" in metric or "latency" in metric or "queue" in metric:
            # Increase for these metrics
            value = baseline * severity + np.random.normal(0, volatility * severity)
        elif "hit_ratio" in metric:
            # Decrease for cache hit ratio
            value = baseline / severity + np.random.normal(0, volatility)
        else:
            # Increase for others
            value = baseline * severity + np.random.normal(0, volatility)
        
        return max(0, value)
    
    @staticmethod
    def _get_unit(metric: str) -> str:
        """Get unit for metric."""
        if "ratio" in metric or "usage" in metric:
            return "%"
        elif "latency" in metric or "query_time" in metric:
            return "ms"
        elif "rate" in metric:
            return "req/s"
        else:
            return "count"
