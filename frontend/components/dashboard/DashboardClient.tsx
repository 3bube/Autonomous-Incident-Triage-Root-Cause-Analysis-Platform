"use client";

import React from "react";
import StatCard from "./StatCard";
import CorrelationEngine from "./CorrelationEngine";
import IncidentVolume from "./IncidentVolume";
import CriticalServices from "./CriticalServices";
import IncidentsTable from "./IncidentsTable";
import { useDashboardOverview } from "@/hooks/queries/useDashboard";
import { Activity, Clock, TrendingDown, Heart } from "lucide-react";

function DashboardClient() {
  const { data: overview, isLoading } = useDashboardOverview(1);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-[#192633] border border-[#233648] rounded-lg px-6 py-4 h-32 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const stats = overview?.data
    ? [
        {
          variant: "detailed" as const,
          label: "Total Services",
          value: overview.data.total_services,
          icon: Activity,
          meta: "Monitored services",
          iconColor: "text-[#2b8cee]",
          trend: {
            value: `${overview.data.healthy_services} healthy`,
            isPositive: true,
          },
        },
        {
          variant: "detailed" as const,
          label: "Critical Services",
          value: overview.data.critical_services,
          icon: Heart,
          meta: "Needs immediate attention",
          iconColor: "text-red-500",
          trend: {
            value: `${overview.data.degraded_services} degraded`,
            isPositive: false,
          },
        },
        {
          variant: "detailed" as const,
          label: "Total Events",
          value: overview.data.total_events,
          icon: TrendingDown,
          meta: "Last hour",
          iconColor: "text-yellow-500",
        },
        {
          variant: "detailed" as const,
          label: "Total Logs",
          value: overview.data.total_logs,
          icon: Clock,
          meta: "Last hour",
          iconColor: "text-green-500",
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            variant={stat.variant}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            meta={stat.meta}
            iconColor={stat.iconColor}
            trend={stat.trend}
          />
        ))}
      </div>

      <CorrelationEngine />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Incidents Table */}
        <div className="lg:col-span-2">
          <IncidentsTable />
        </div>

        {/* Right Column - Charts and Services */}
        <div className="space-y-8">
          <IncidentVolume />
          <CriticalServices />
        </div>
      </div>
    </div>
  );
}

export default DashboardClient;
