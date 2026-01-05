"use client";

import React from "react";
import StatCard from "./StatCard";
import CorrelationEngine from "./CorrelationEngine";
import IncidentVolume from "./IncidentVolume";
import CriticalServices from "./CriticalServices";
import { statData } from "@/constants";
import IncidentsTable from "./IncidentsTable";

function DashboardClient() {
  return (
    <div className="space-y-8">
      {/* Stats Grid - Mixed compact and detailed */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statData.map((stat, index) => (
          <StatCard
            key={index}
            variant={stat.variant}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            meta={stat.meta}
            iconColor={stat.iconColor}
            trend={stat.trend}
            progressValue={stat.progressValue}
            progressColor={stat.progressColor}
          />
        ))}
      </div>

      <CorrelationEngine
        rawAlertCount={1247}
        incidentCount={1}
        title="Alert Correlation"
        description=""
        relatedPattern="Service-Mesh-Latency"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Incidents Table */}
        <div className="lg:col-span-2">
          <IncidentsTable />
        </div>

        {/* Right Column - Charts and Services */}
        <div className="space-y-8">
          <IncidentVolume timeRange="Last 7 Days" />
          <CriticalServices />
        </div>
      </div>
    </div>
  );
}

export default DashboardClient;
