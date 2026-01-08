"""Events generator for deployment and infrastructure events."""

from datetime import datetime, timedelta
from typing import List, Dict, Any
import random
from .base import BaseGenerator


class EventsGenerator(BaseGenerator):
    """Generate deployment and infrastructure events."""
    
    EVENT_TYPES = ["deployment", "config_change", "scaling_change", "maintenance_window", "failover"]
    
    def generate(self, start_time: datetime, duration_seconds: int) -> List[Dict[str, Any]]:
        """Generate random infrastructure events."""
        events = []
        
        # Generate 2-4 random events during the period
        num_events = random.randint(2, 4)
        for _ in range(num_events):
            event_time = start_time + timedelta(seconds=random.randint(0, duration_seconds))
            event_type = random.choice(self.EVENT_TYPES)
            service = random.choice(self.SERVICES)
            
            events.append({
                "timestamp": event_time.isoformat(),
                "type": event_type,
                "service": service,
                "details": f"{event_type} event for {service}",
                "severity": random.choice(["info", "warning", "critical"])
            })
        
        return sorted(events, key=lambda x: x["timestamp"])
    
    def deployment_events(self, start_time: datetime, service: str = None) -> List[Dict[str, Any]]:
        """Generate deployment events."""
        if service is None:
            service = random.choice(self.SERVICES)
        
        events = []
        events.append({
            "timestamp": start_time.isoformat(),
            "type": "deployment",
            "service": service,
            "details": f"Deploying new version to {service}",
            "severity": "info",
            "version": "2.1.0"
        })
        
        events.append({
            "timestamp": (start_time + timedelta(minutes=5)).isoformat(),
            "type": "deployment",
            "service": service,
            "details": f"Deployment completed for {service}",
            "severity": "info",
            "version": "2.1.0"
        })
        
        return events
