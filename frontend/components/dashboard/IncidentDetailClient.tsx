"use client";

import React from "react";
import StatCard from "./StatCard";
import { incidentDetailData } from "@/constants";
import AIRootCauseHypothesis from "./AIRootCauseHypothesis";
import IncidentTimeline from "./IncidentTimeline";
import BlastRadius from "./BlastRadius";
import HumanVerification from "./HumanVerification";
import LiveLogStream from "./LiveLogStream";

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

      <div className="flex space-x-4 mt-6 lg:space-x-6">
        <div>
          <AIRootCauseHypothesis />

          <IncidentTimeline />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <BlastRadius />
          <HumanVerification />
          <LiveLogStream />
        </div>
      </div>
    </div>
  );
}

export default IncidentDetailClient;
