import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export const useDashboardOverview = (organizationId: number) => {
  return useQuery({
    queryKey: ["dashboard", "overview", organizationId],
    queryFn: () => dashboardService.getOverview(organizationId),
  });
};

export const useServicesHealth = (
  organizationId: number,
  hours: number = 1
) => {
  return useQuery({
    queryKey: ["dashboard", "services-health", organizationId, hours],
    queryFn: () => dashboardService.getServicesHealth(organizationId, hours),
  });
};

export const useServiceHealth = (
  serviceName: string,
  organizationId: number,
  hours: number = 1
) => {
  return useQuery({
    queryKey: [
      "dashboard",
      "service-health",
      serviceName,
      organizationId,
      hours,
    ],
    queryFn: () =>
      dashboardService.getServiceHealth(serviceName, organizationId, hours),
    enabled: !!serviceName,
  });
};

export const useIncidentVolume = (serviceName?: string, hours: number = 24) => {
  return useQuery({
    queryKey: ["dashboard", "incident-volume", serviceName, hours],
    queryFn: () => dashboardService.getIncidentVolume(serviceName, hours),
  });
};

export const useCriticalServices = (
  organizationId: number,
  hours: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["dashboard", "critical-services", organizationId, hours, limit],
    queryFn: async () => {
      const response = await dashboardService.getCriticalServices(
        organizationId,
        hours,
        limit
      );
      return response.services; // Extract services array from response
    },
  });
};

export const useCorrelationAnalysis = (
  serviceName: string | undefined,
  organizationId: number,
  hours: number = 1
) => {
  return useQuery({
    queryKey: [
      "dashboard",
      "correlation-engine",
      serviceName,
      organizationId,
      hours,
    ],
    queryFn: () =>
      dashboardService.getCorrelationAnalysis(
        serviceName,
        organizationId,
        hours
      ),
  });
};
