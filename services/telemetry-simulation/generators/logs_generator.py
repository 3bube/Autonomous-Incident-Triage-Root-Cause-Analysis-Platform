"""Logs generator for telemetry data."""

from datetime import datetime, timedelta
from typing import List, Dict, Any
import random
from .base import BaseGenerator


class LogsGenerator(BaseGenerator):
    """Generate realistic application logs."""
    
    ERROR_MESSAGES = {
        "database": [
            "Database connection timeout",
            "Query execution failed",
            "Connection pool exhausted",
            "Transaction deadlock detected"
        ],
        "timeout": [
            "Request timeout after 30s",
            "Service unavailable",
            "Socket timeout"
        ],
        "cascade": [
            "Downstream service failure",
            "Circuit breaker opened",
            "Retry limit exceeded"
        ],
        "deployment": [
            "Health check failed",
            "Service startup failed",
            "Configuration error"
        ]
    }
    
    def generate(self, start_time: datetime, duration_seconds: int,
                 interval_seconds: int = 10, error_rate: float = 0.1) -> List[Dict[str, Any]]:
        """Generate normal logs."""
        logs = []
        time_buckets = self.get_time_buckets(start_time, duration_seconds, interval_seconds)
        services = self.get_service_names(count=2)
        
        for timestamp in time_buckets:
            for service in services:
                # Mix of log levels
                if random.random() < error_rate:
                    level = "ERROR"
                    message = f"{service} encountered an error"
                else:
                    level = random.choice(["INFO", "DEBUG"])
                    message = f"{service} processed request"
                
                logs.append({
                    "timestamp": timestamp.isoformat(),
                    "service": service,
                    "level": level,
                    "message": message,
                    "trace_id": self.generate_trace_id()
                })
        
        return logs
    
    def error_logs(self, start_time: datetime, duration_seconds: int,
                   interval_seconds: int = 10, error_type: str = "database") -> List[Dict[str, Any]]:
        """Generate error logs for incidents."""
        logs = []
        time_buckets = self.get_time_buckets(start_time, duration_seconds, interval_seconds)
        services = self.get_service_names(count=1)
        
        messages = self.ERROR_MESSAGES.get(error_type, self.ERROR_MESSAGES["database"])
        
        for timestamp in time_buckets:
            for service in services:
                logs.append({
                    "timestamp": timestamp.isoformat(),
                    "service": service,
                    "level": "ERROR",
                    "message": random.choice(messages),
                    "trace_id": self.generate_trace_id(),
                    "error_type": error_type
                })
        
        return logs
