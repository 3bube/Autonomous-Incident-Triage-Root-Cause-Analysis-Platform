"use client";

import React from "react";
import { TrendingDown, Activity } from "lucide-react";

interface ModelMetric {
  label: string;
  value: string | number;
  trend?: string;
  trendColor?: string;
}

interface MetricSpikeCorrelatorProps {
  modelName?: string;
  status?: "Active" | "Training" | "Idle";
  version?: string;
  description?: string;
  metrics?: ModelMetric[];
  trainingMessage?: string;
  onViewDetails?: () => void;
  onProvideFeedback?: () => void;
}

export default function MetricSpikeCorrelator({
  modelName = "Metric Spike Correlator",
  status = "Training",
  version = "v1.0-5",
  description = "Multivariate time-series analysis for RCA.",
  metrics = [
    {
      label: "Precision (24h)",
      value: "88.5%",
      trend: "-2.1%",
      trendColor: "text-red-400",
    },
    {
      label: "Recall (24h)",
      value: "92.8%",
      trend: "Stable",
      trendColor: "text-gray-400",
    },
    {
      label: "Mean Time to Detect",
      value: "45s",
      trend: "Δ -5s",
      trendColor: "text-green-400",
    },
  ],
  trainingMessage = "Training in progress: Incorporating 450 new user-labeled incidents from last week.",
  onViewDetails,
  onProvideFeedback,
}: MetricSpikeCorrelatorProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Training":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Idle":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="bg-[#111a22] border border-[#233648] rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-purple-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold text-white">{modelName}</h3>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusStyles(
                  status
                )}`}
              >
                {status}
              </span>
            </div>
            <p className="text-sm text-[#92adc9]">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#58738e]">Model Version</p>
          <p className="text-sm font-medium text-white">{version}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-[#1a2635] rounded-lg p-4 border border-[#233648]"
          >
            <p className="text-xs text-[#92adc9] mb-2">{metric.label}</p>
            <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
            <div className="flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-gray-400" />
              <span className={`text-xs font-medium ${metric.trendColor}`}>
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Training Message */}
      <div className="bg-[#1a2635] rounded-lg p-4 border border-yellow-500/20 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0" />
          <p className="text-sm text-[#92adc9]">
            <span className="text-yellow-400 font-medium">
              Training in progress:
            </span>{" "}
            {trainingMessage}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onViewDetails}
          className="px-4 py-2.5 text-sm font-medium text-[#2b8cee] bg-transparent hover:bg-[#2b8cee]/10 rounded-md transition"
        >
          Details
        </button>
        <button
          onClick={onProvideFeedback}
          className="px-4 py-2.5 text-sm font-medium text-[#92adc9] bg-[#1a2635] border border-[#233648] rounded-md hover:border-[#2b8cee] hover:text-white transition"
        >
          Provide Feedback
        </button>
      </div>
    </div>
  );
}
