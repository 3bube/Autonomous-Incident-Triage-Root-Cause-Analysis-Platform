"use client";

import React from "react";
import { Activity } from "lucide-react";

interface ModelDriftMonitorProps {
  title?: string;
  driftLevel?: "Low" | "Medium" | "High" | "Critical";
  driftPercentage?: number;
  statusText?: string;
  description?: string;
  nextEvaluation?: string;
}

export default function ModelDriftMonitor({
  title = "Model Drift Monitor",
  driftLevel = "Low",
  driftPercentage = 15,
  statusText = "All detected",
  description = "Models are performing within expected parameters",
  nextEvaluation = "Next scheduled evaluation in 4 hours.",
}: ModelDriftMonitorProps) {
  const getDriftColor = (level: string) => {
    switch (level) {
      case "Low":
        return "#2b8cee";
      case "Medium":
        return "#fbbf24";
      case "High":
        return "#f97316";
      case "Critical":
        return "#ef4444";
      default:
        return "#2b8cee";
    }
  };

  const getDriftBgColor = (level: string) => {
    switch (level) {
      case "Low":
        return "#1e40af";
      case "Medium":
        return "#92400e";
      case "High":
        return "#7c2d12";
      case "Critical":
        return "#7f1d1d";
      default:
        return "#1e40af";
    }
  };

  const circumference = Math.PI * 45;
  const strokeDashoffset =
    circumference - (driftPercentage / 100) * circumference;

  return (
    <div className="bg-[#111a22] border border-[#233648] rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-[#2b8cee]" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      {/* Half Circle Gauge */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative w-40 h-24 flex items-center justify-center">
          <svg
            className="w-full h-full absolute"
            viewBox="0 0 120 60"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background semicircle */}
            <path
              d="M 15 60 A 45 45 0 0 1 105 60"
              fill="none"
              stroke="#233648"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Progress semicircle */}
            <path
              d="M 15 60 A 45 45 0 0 1 105 60"
              fill="none"
              stroke={getDriftColor(driftLevel)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
            />
          </svg>

          {/* Center content */}
          <div className="absolute flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-white">{driftLevel}</p>
            <p className="text-xs text-[#92adc9]">{statusText}</p>
          </div>
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center mb-4">
        <p className="text-sm text-[#92adc9] mb-2">{description}</p>
        <p className="text-xs text-[#58738e]">{nextEvaluation}</p>
      </div>
    </div>
  );
}
