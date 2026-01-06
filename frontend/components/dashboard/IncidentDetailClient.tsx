"use client";

import React from "react";
import StatCard from "./StatCard";
import { incidentDetailData } from "@/constants";
import AIRootCauseHypothesis from "./AIRootCauseHypothesis";
import IncidentTimeline from "./IncidentTimeline";

function IncidentDetailClient() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {incidentDetailData.map((stat) => (
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

      <AIRootCauseHypothesis />
      <IncidentTimeline />
    </div>
  );
}

export default IncidentDetailClient;
