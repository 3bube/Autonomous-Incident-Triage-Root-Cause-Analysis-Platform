"""Base generator class for telemetry data."""

from abc import ABC, abstractmethod
from datetime import datetime, timedelta
from typing import List, Dict, Any
import random
import string


class BaseGenerator(ABC):
    """Abstract base class for telemetry generators."""
    
    SERVICES = [
        "api-gateway",
        "auth-service",
        "user-service",
        "order-service",
        "payment-service",
        "inventory-service",
        "notification-service",
        "analytics-service",
        "cache-service",
        "database-service"
    ]
    
    METRICS = [
        "cpu_usage", "memory_usage", "disk_usage",
        "request_latency", "request_rate", "error_rate",
        "connection_pool_active", "queue_depth",
        "cache_hit_ratio", "db_query_time"
    ]
    
    LOG_LEVELS = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
    
    def __init__(self, seed: int = None):
        """Initialize generator with optional seed."""
        if seed:
            random.seed(seed)
    
    @abstractmethod
    def generate(self, num_records: int) -> List[Dict[str, Any]]:
        """Generate telemetry data."""
        pass
    
    def get_time_buckets(self, start_time: datetime, duration_seconds: int, 
                         interval_seconds: int) -> List[datetime]:
        """Generate time buckets for telemetry."""
        buckets = []
        current = start_time
        end_time = start_time + timedelta(seconds=duration_seconds)
        
        while current <= end_time:
            buckets.append(current)
            current += timedelta(seconds=interval_seconds)
        
        return buckets
    
    def get_service_names(self, count: int = None) -> List[str]:
        """Get service names."""
        if count is None:
            return self.SERVICES
        return random.sample(self.SERVICES, min(count, len(self.SERVICES)))
    
    def get_metric_names(self, count: int = None) -> List[str]:
        """Get metric names."""
        if count is None:
            return self.METRICS
        return random.sample(self.METRICS, min(count, len(self.METRICS)))
    
    def get_log_levels(self) -> List[str]:
        """Get available log levels."""
        return self.LOG_LEVELS
    
    @staticmethod
    def generate_trace_id() -> str:
        """Generate a unique trace ID."""
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=16))
    
    @staticmethod
    def generate_span_id() -> str:
        """Generate a unique span ID."""
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
