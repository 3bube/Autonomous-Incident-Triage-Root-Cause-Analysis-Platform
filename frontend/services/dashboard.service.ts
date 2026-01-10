import { apiClient } from "@/lib/axios/api-client";

class DashboardService {
  private endpoints = {
    overview: (organizationId: number) =>
      `/dashboard/overview/${organizationId}`,
    servicesHealth: `/dashboard/services/health`,
    serviceHealth: (serviceName: string) =>
      `/dashboard/services/${serviceName}/health`,
    incidentVolume: `/dashboard/incident-volume`,
    criticalServices: `/dashboard/services/critical`,
    correlationEngine: `/dashboard/correlation`,
  };

  async getOverview(organizationId: number) {
    return await apiClient.get(this.endpoints.overview(organizationId));
  }

  async getServicesHealth(organizationId: number, hours: number = 1) {
    return await apiClient.get(this.endpoints.servicesHealth, {
      params: { organization_id: organizationId, hours },
    });
  }

  async getServiceHealth(
    serviceName: string,
    organizationId: number,
    hours: number = 1
  ) {
    return await apiClient.get(this.endpoints.serviceHealth(serviceName), {
      params: { organization_id: organizationId, hours },
    });
  }

  async getIncidentVolume(serviceName?: string, hours: number = 24) {
    return await apiClient.get(this.endpoints.incidentVolume, {
      params: { service_name: serviceName, hours },
    });
  }

  async getCriticalServices(
    organizationId: number,
    hours: number = 1,
    limit: number = 10
  ) {
    return await apiClient.get(this.endpoints.criticalServices, {
      params: { organization_id: organizationId, hours, limit },
    });
  }

  async getCorrelationAnalysis(
    serviceName: string | undefined,
    organizationId: number,
    hours: number = 1
  ) {
    return await apiClient.get(this.endpoints.correlationEngine, {
      params: {
        service_name: serviceName,
        organization_id: organizationId,
        hours,
      },
    });
  }
}

export const dashboardService = new DashboardService();
