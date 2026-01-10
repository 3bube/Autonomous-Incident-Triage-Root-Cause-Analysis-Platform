import { apiClient } from "@/lib/axios/api-client";

class TelemetryService {
  private endpoints = {
    logs: "/telemetry/logs",
    metrics: "/telemetry/metrics",
    traces: "/telemetry/traces",
    events: "/telemetry/events",
    logStatistics: "/telemetry/logs/statistics",
    latencyStatistics: "/telemetry/latency/statistics",
    metricStatistics: "/telemetry/metrics/statistics",
    eventStatistics: "/telemetry/events/statistics",
    services: "/telemetry/services",
  };

  async getLogs(
    skip: number = 0,
    limit: number = 100,
    serviceName?: string,
    level?: string
  ) {
    return await apiClient.get(this.endpoints.logs, {
      params: { skip, limit, service_name: serviceName, level },
    });
  }

  async getMetrics(
    skip: number = 0,
    limit: number = 100,
    serviceName?: string,
    metricName?: string
  ) {
    return await apiClient.get(this.endpoints.metrics, {
      params: {
        skip,
        limit,
        service_name: serviceName,
        metric_name: metricName,
      },
    });
  }

  async getTraces(
    skip: number = 0,
    limit: number = 100,
    serviceName?: string,
    traceId?: string,
    status?: string
  ) {
    return await apiClient.get(this.endpoints.traces, {
      params: {
        skip,
        limit,
        service_name: serviceName,
        trace_id: traceId,
        status,
      },
    });
  }

  async getEvents(
    skip: number = 0,
    limit: number = 100,
    serviceName?: string,
    eventType?: string,
    severity?: string
  ) {
    return await apiClient.get(this.endpoints.events, {
      params: {
        skip,
        limit,
        service_name: serviceName,
        event_type: eventType,
        severity,
      },
    });
  }

  async getLogStatistics(serviceName?: string) {
    return await apiClient.get(this.endpoints.logStatistics, {
      params: { service_name: serviceName },
    });
  }

  async getLatencyStatistics(serviceName?: string, operation?: string) {
    return await apiClient.get(this.endpoints.latencyStatistics, {
      params: { service_name: serviceName, operation },
    });
  }

  async getMetricStatistics(metricName: string, serviceName?: string) {
    return await apiClient.get(this.endpoints.metricStatistics, {
      params: { metric_name: metricName, service_name: serviceName },
    });
  }

  async getEventStatistics(serviceName?: string) {
    return await apiClient.get(this.endpoints.eventStatistics, {
      params: { service_name: serviceName },
    });
  }

  async getServices() {
    return await apiClient.get(this.endpoints.services);
  }
}

export const telemetryService = new TelemetryService();
