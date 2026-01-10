"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { useCriticalServices } from "@/hooks/queries/useDashboard";

interface Service {
  id: string;
  name: string;
  owner?: string;
  status: "critical" | "warning" | "healthy";
  metric: string;
  metricLabel?: string;
}

interface CriticalServicesProps {
  onViewAll?: () => void;
}

const statusConfig = {
  critical: {
    dotColor: "bg-red-500",
    textColor: "text-red-500",
  },
  warning: {
    dotColor: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
  healthy: {
    dotColor: "bg-teal-500",
    textColor: "text-teal-500",
  },
  degraded: {
    dotColor: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
};

export default function CriticalServices({ onViewAll }: CriticalServicesProps) {
  const { data, isLoading } = useCriticalServices(1, 10);

  // Transform API response to component format
  const services: Service[] =
    data?.map((service) => ({
      id: service.service_id.toString(),
      name: service.service_name,
      owner: service.version || "N/A",
      status:
        service.status === "degraded"
          ? "warning"
          : (service.status as "critical" | "warning" | "healthy"),
      metric: service.error_rate?.toFixed(2) || "0",
      metricLabel: "%",
    })) || [];
  return (
    <div className="p-6 bg-[#111a22] border border-[#233648] rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Critical Services</h2>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-[#2b8cee] hover:text-[#3da3ff] transition"
        >
          View All
        </button>
      </div>

      {/* Services List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-[#1a2635] border border-[#233648] rounded-md animate-pulse"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-2 h-2 rounded-full bg-[#233648]" />
                <div className="flex-1">
                  <div className="h-4 bg-[#233648] rounded w-32 mb-1" />
                  <div className="h-3 bg-[#233648] rounded w-20" />
                </div>
              </div>
              <div className="h-4 bg-[#233648] rounded w-12" />
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-8 text-[#92adc9]">
          No critical services found
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-3 bg-[#1a2635] border border-[#233648] rounded-md hover:border-[#2b8cee] transition"
            >
              <div className="flex items-center gap-3 flex-1">
                {/* Status Dot */}
                <div
                  className={`w-2 h-2 rounded-full ${statusConfig[service.status].dotColor}`}
                />

                {/* Service Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {service.name}
                  </p>
                  {service.owner && (
                    <p className="text-xs text-[#58738e]">{service.owner}</p>
                  )}
                </div>
              </div>

              {/* Metric */}
              <div
                className={`text-sm font-semibold ${statusConfig[service.status].textColor}`}
              >
                {service.metric}
                {service.metricLabel && (
                  <span className="text-xs font-normal ml-0.5">
                    {service.metricLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
