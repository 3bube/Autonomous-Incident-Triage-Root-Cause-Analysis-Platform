import { useQuery } from "@tanstack/react-query";
import { telemetryService } from "@/services/telemetry.service";

export const useLogs = (
  skip: number = 0,
  limit: number = 100,
  serviceName?: string,
  level?: string
) => {
  return useQuery({
    queryKey: ["telemetry", "logs", skip, limit, serviceName, level],
    queryFn: () => telemetryService.getLogs(skip, limit, serviceName, level),
  });
};

export const useMetrics = (
  skip: number = 0,
  limit: number = 100,
  serviceName?: string,
  metricName?: string
) => {
  return useQuery({
    queryKey: ["telemetry", "metrics", skip, limit, serviceName, metricName],
    queryFn: () =>
      telemetryService.getMetrics(skip, limit, serviceName, metricName),
  });
};

export const useTraces = (
  skip: number = 0,
  limit: number = 100,
  serviceName?: string,
  traceId?: string,
  status?: string
) => {
  return useQuery({
    queryKey: [
      "telemetry",
      "traces",
      skip,
      limit,
      serviceName,
      traceId,
      status,
    ],
    queryFn: () =>
      telemetryService.getTraces(skip, limit, serviceName, traceId, status),
  });
};

export const useEvents = (
  skip: number = 0,
  limit: number = 100,
  serviceName?: string,
  eventType?: string,
  severity?: string
) => {
  return useQuery({
    queryKey: [
      "telemetry",
      "events",
      skip,
      limit,
      serviceName,
      eventType,
      severity,
    ],
    queryFn: () =>
      telemetryService.getEvents(skip, limit, serviceName, eventType, severity),
  });
};

export const useLogStatistics = (serviceName?: string) => {
  return useQuery({
    queryKey: ["telemetry", "log-statistics", serviceName],
    queryFn: () => telemetryService.getLogStatistics(serviceName),
  });
};

export const useLatencyStatistics = (
  serviceName?: string,
  operation?: string
) => {
  return useQuery({
    queryKey: ["telemetry", "latency-statistics", serviceName, operation],
    queryFn: () =>
      telemetryService.getLatencyStatistics(serviceName, operation),
  });
};

export const useMetricStatistics = (
  metricName: string,
  serviceName?: string
) => {
  return useQuery({
    queryKey: ["telemetry", "metric-statistics", metricName, serviceName],
    queryFn: () =>
      telemetryService.getMetricStatistics(metricName, serviceName),
    enabled: !!metricName,
  });
};

export const useEventStatistics = (serviceName?: string) => {
  return useQuery({
    queryKey: ["telemetry", "event-statistics", serviceName],
    queryFn: () => telemetryService.getEventStatistics(serviceName),
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ["telemetry", "services"],
    queryFn: () => telemetryService.getServices(),
  });
};
