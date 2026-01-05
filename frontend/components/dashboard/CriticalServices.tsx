"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface Service {
  id: string;
  name: string;
  owner?: string;
  status: "critical" | "warning" | "healthy";
  metric: string;
  metricLabel?: string;
}

interface CriticalServicesProps {
  services?: Service[];
  onViewAll?: () => void;
}

const defaultServices: Service[] = [
  {
    id: "1",
    name: "User Database",
    owner: "Primary Database",
    status: "critical",
    metric: "92.49",
    metricLabel: "%",
  },
  {
    id: "2",
    name: "Checkout API",
    owner: "Checkout-Svc",
    status: "warning",
    metric: "98.15",
    metricLabel: "%",
  },
  {
    id: "3",
    name: "Authentication",
    owner: "Global",
    status: "healthy",
    metric: "Link",
    metricLabel: "",
  },
];

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
};

export default function CriticalServices({
  services = defaultServices,
  onViewAll,
}: CriticalServicesProps) {
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
                <p className="text-sm font-medium text-white">{service.name}</p>
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
    </div>
  );
}
