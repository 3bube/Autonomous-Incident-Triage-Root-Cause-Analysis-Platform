"use client";

import React from "react";
import StatCard from "./StatCard";
import {
  AlertTriangle,
  Clock,
  TrendingDown,
  Heart,
  Activity,
  Zap,
  HardDrive,
} from "lucide-react";

// Single stat data array with both compact and detailed cards
const statData = [
  {
    variant: "compact" as const,
    label: "Active Incidents",
    value: 3,
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    trend: { value: "↑ 1", isPositive: false },
    meta: "vs. last 24 hours",
  },
  {
    variant: "compact" as const,
    label: "MTTR (AVG)",
    value: "45m",
    icon: Clock,
    iconColor: "text-blue-400",
    trend: { value: "↓ 5m", isPositive: true },
    meta: "Mean time to resolution",
  },
  {
    variant: "compact" as const,
    label: "Noise Reduction",
    value: "99.2%",
    icon: TrendingDown,
    iconColor: "text-green-500",
    trend: { value: "+2.1%", isPositive: true },
    meta: "AI Signal-to-Noise Ratio",
  },
  {
    variant: "detailed" as const,
    label: "System Health",
    value: "98%",
    progressValue: 98,
    progressColor: "green" as const,
    icon: Heart,
    iconColor: "text-green-500",
    trend: { value: "+0.5%", isPositive: true },
  },
];

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
    </div>
  );
}

export default DashboardClient;
