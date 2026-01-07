"use client";

import React from "react";
import StatCard from "./StatCard";
import IncidentVolumeChart from "./IncidentVolumeChart";
import ServiceHealth from "./ServiceHealth";
import RootCauseStats from "./RootCauseStats";
import AlertNoiseFunnel from "./AlertNoiseFunnel";
import TeamLoad from "./TeamLoad";
import { analyticsStatData } from "@/constants";

function AnalyticsClient() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStatData.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            trend={stat.trend}
            meta={stat.meta}
            variant={stat.variant}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncidentVolumeChart />
        </div>
        <div className="lg:col-span-1">
          <AlertNoiseFunnel />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ServiceHealth />
        <RootCauseStats />
        <TeamLoad />
      </div>
    </div>
  );
}

export default AnalyticsClient;
