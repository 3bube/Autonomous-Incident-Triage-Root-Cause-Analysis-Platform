"""
AI service for ML-powered analysis using LangChain + Groq
"""
from typing import Dict, Any, List, Optional
from core.config import get_logger
import json
import os
from core.config import settings

try:
    from langchain_groq import ChatGroq
    from langchain_core.messages import HumanMessage
except ImportError:
    ChatGroq = None
    HumanMessage = None

logger = get_logger(__name__)


class AIService:
    """Service for AI/ML-powered analysis using LangChain + Groq"""

    def __init__(self):
        api_key = settings.GROQ_API_KEY or os.getenv("GROQ_API_KEY")
        if not api_key:
            logger.warning("GROQ_API_KEY not set, AI features will be limited")
            self.llm = None
        else:
            try:
                self.llm = ChatGroq(
                    model="openai/gpt-oss-120b",
                    temperature=0.3,
                    groq_api_key=api_key,
                )
            except Exception as e:
                logger.error(f"Failed to initialize ChatGroq: {str(e)}")
                self.llm = None

    def predict_root_cause(
        self,
        error_logs: List[Dict[str, Any]],
        events: List[Dict[str, Any]],
        traces: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        """
        Use Groq AI via LangChain to predict root cause based on telemetry data.
        
        Returns predicted root cause with confidence score.
        """
        try:
            if not error_logs and not events and not traces:
                return {
                    "root_cause": None,
                    "confidence": 0.0,
                    "reasoning": "No telemetry data to analyze",
                }

            if not self.llm:
                logger.warning("Groq LLM not available")
                return {
                    "root_cause": None,
                    "confidence": 0.0,
                    "reasoning": "AI service not configured",
                }

            # Prepare telemetry summary
            telemetry_summary = self._prepare_telemetry_summary(
                error_logs, events, traces
            )

            # Create prompt for Groq
            prompt = f"""Analyze the following incident telemetry data and predict the root cause.

TELEMETRY DATA:
{telemetry_summary}

Based on this data, provide a JSON response with:
1. root_cause: the predicted root cause (one of: deployment_failure, config_error, resource_exhaustion, cascading_failure, network_issue, database_bottleneck, memory_leak, external_service_failure, traffic_spike, code_bug)
2. confidence: confidence score between 0 and 1
3. reasoning: brief explanation for the prediction

Respond ONLY with valid JSON, no markdown formatting."""

            # Call Groq via LangChain
            message = self.llm.invoke([HumanMessage(content=prompt)])
            response_text = message.content

            # Clean up response if needed
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.startswith("```"):
                response_text = response_text[3:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()

            prediction = json.loads(response_text)

            return {
                "root_cause": prediction.get("root_cause"),
                "confidence": min(1.0, max(0.0, prediction.get("confidence", 0.5))),
                "reasoning": prediction.get("reasoning", ""),
            }
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse Groq response: {str(e)}")
            return {
                "root_cause": None,
                "confidence": 0.0,
                "reasoning": "Failed to parse AI response",
            }
        except Exception as e:
            logger.error(f"Error predicting root cause with Groq: {str(e)}")
            return {
                "root_cause": None,
                "confidence": 0.0,
                "reasoning": f"Analysis failed: {str(e)}",
            }

    def _prepare_telemetry_summary(
        self,
        error_logs: List[Dict[str, Any]],
        events: List[Dict[str, Any]],
        traces: List[Dict[str, Any]],
    ) -> str:
        """Prepare a summary of telemetry data for Groq analysis."""
        summary = f"""
Error Logs ({len(error_logs)} total):
"""
        if error_logs:
            for log in error_logs[:5]:
                summary += f"  - [{log.get('level')}] {log.get('message', '')}\n"
            if len(error_logs) > 5:
                summary += f"  ... and {len(error_logs) - 5} more\n"

        summary += f"""
Events ({len(events)} total):
"""
        if events:
            for event in events[:5]:
                summary += f"  - [{event.get('type')}] {event.get('description', '')} (severity: {event.get('severity')})\n"
            if len(events) > 5:
                summary += f"  ... and {len(events) - 5} more\n"

        summary += f"""
Slow Traces ({len(traces)} total, >2000ms):
"""
        if traces:
            for trace in traces[:5]:
                summary += f"  - {trace.get('operation')} - {trace.get('duration')}ms\n"
            if len(traces) > 5:
                summary += f"  ... and {len(traces) - 5} more\n"

        return summary

    def score_correlation(
        self,
        error_logs: List[Dict[str, Any]],
        events: List[Dict[str, Any]],
        traces: List[Dict[str, Any]],
    ) -> float:
        """
        Score the strength of correlation using Groq analysis.
        
        Returns correlation score between 0 and 1.
        """
        try:
            if not error_logs and not events and not traces:
                return 0.0

            if not self.llm:
                return 0.0

            prompt = f"""Given this incident telemetry:
- Error logs: {len(error_logs)}
- Infrastructure events: {len(events)}
- Slow traces: {len(traces)}

Rate the correlation strength between these signals on a scale of 0-1, where:
0 = no correlation (independent issues)
1 = strong correlation (clearly related incident)

Respond with ONLY a single decimal number between 0 and 1."""

            message = self.llm.invoke([HumanMessage(content=prompt)])
            score = float(message.content.strip())
            return min(1.0, max(0.0, score))
        except Exception as e:
            logger.error(f"Error scoring correlation: {str(e)}")
            return 0.5

    def classify_incident_severity(
        self,
        error_rate: float,
        error_count: int,
        affected_services: int,
    ) -> Dict[str, Any]:
        """
        Classify incident severity using Groq AI.
        
        Returns severity level and justification.
        """
        try:
            if not self.llm:
                # Fallback to heuristic
                if error_rate > 30 or error_count > 100:
                    return {
                        "severity": "critical",
                        "confidence": 0.7,
                        "factors": {
                            "error_rate": error_rate,
                            "error_count": error_count,
                            "affected_services": affected_services,
                        },
                    }
                return {
                    "severity": "medium",
                    "confidence": 0.5,
                    "factors": {
                        "error_rate": error_rate,
                        "error_count": error_count,
                        "affected_services": affected_services,
                    },
                }

            prompt = f"""Classify the severity of an incident with these metrics:
- Error rate: {error_rate}%
- Error count: {error_count}
- Affected services: {affected_services}

Classify as: critical, high, medium, or low

Respond with ONLY the severity level."""

            message = self.llm.invoke([HumanMessage(content=prompt)])
            severity = message.content.strip().lower()
            confidence = 0.85

            return {
                "severity": severity,
                "confidence": confidence,
                "factors": {
                    "error_rate": error_rate,
                    "error_count": error_count,
                    "affected_services": affected_services,
                },
            }
        except Exception as e:
            logger.error(f"Error classifying incident: {str(e)}")
            return {
                "severity": "unknown",
                "confidence": 0.0,
                "factors": {},
            }


# Create singleton instance
ai_service = AIService()
