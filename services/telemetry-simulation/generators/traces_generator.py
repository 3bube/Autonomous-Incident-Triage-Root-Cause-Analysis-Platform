"""Traces generator for distributed tracing."""

from datetime import datetime, timedelta
from typing import List, Dict, Any
import random
from .base import BaseGenerator


class TracesGenerator(BaseGenerator):
    """Generate distributed tracing spans."""
    
    def generate(self, start_time: datetime, duration_seconds: int,
                 interval_seconds: int = 10) -> List[Dict[str, Any]]:
        """Generate normal traces."""
        traces = []
        time_buckets = self.get_time_buckets(start_time, duration_seconds, interval_seconds)
        services = self.get_service_names(count=2)
        
        for timestamp in time_buckets:
            trace_id = self.generate_trace_id()
            for i, service in enumerate(services):
                span_id = self.generate_span_id()
                parent_span = None if i == 0 else self.generate_span_id()
                
                traces.append({
                    "timestamp": timestamp.isoformat(),
                    "trace_id": trace_id,
                    "span_id": span_id,
                    "parent_span_id": parent_span,
                    "service": service,
                    "operation": f"{service}.request",
                    "duration_ms": random.randint(10, 100),
                    "status": "success"
                })
        
        return traces
    
    def slow_traces(self, start_time: datetime, duration_seconds: int,
                    interval_seconds: int = 10) -> List[Dict[str, Any]]:
        """Generate slow/anomalous traces."""
        traces = []
        time_buckets = self.get_time_buckets(start_time, duration_seconds, interval_seconds)
        services = self.get_service_names(count=2)
        
        for timestamp in time_buckets:
            trace_id = self.generate_trace_id()
            for i, service in enumerate(services):
                span_id = self.generate_span_id()
                parent_span = None if i == 0 else self.generate_span_id()
                
                # Simulate slow traces
                duration = random.randint(500, 2000) if random.random() > 0.7 else random.randint(100, 300)
                
                traces.append({
                    "timestamp": timestamp.isoformat(),
                    "trace_id": trace_id,
                    "span_id": span_id,
                    "parent_span_id": parent_span,
                    "service": service,
                    "operation": f"{service}.request",
                    "duration_ms": duration,
                    "status": "success" if duration < 500 else "slow"
                })
        
        return traces
