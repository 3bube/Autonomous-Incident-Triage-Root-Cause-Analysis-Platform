"use client";

import React from "react";
import { TrendingUp, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface ModelMetric {
  label: string;
  value: string | number;
  trend?: string;
  trendColor?: string;
}

interface LogAnomalyDetectorProps {
  modelName?: string;
  status?: "Active" | "Inactive";
  version?: string;
  description?: string;
  metrics?: ModelMetric[];
  accuracyTrendData?: Array<{ day: string; accuracy: number }>;
  currentAccuracy?: number;
  onViewLogs?: () => void;
  onExplanationReport?: () => void;
  onProvideFeedback?: () => void;
}

const defaultAccuracyData = [
  { day: "Day 1", accuracy: 94 },
  { day: "Day 2", accuracy: 93 },
  { day: "Day 3", accuracy: 95 },
  { day: "Day 4", accuracy: 94 },
  { day: "Day 5", accuracy: 95 },
  { day: "Day 6", accuracy: 95 },
  { day: "Day 7", accuracy: 96 },
];

export default function LogAnomalyDetector({
  modelName = "Log Anomaly Detector",
  status = "Active",
  version = "v2.4.1-beta",
  description = "Unsupervised isolation forest for unstructured log streams.",
  metrics = [
    {
      label: "Precision (24h)",
      value: "94.2%",
      trend: "+1.2%",
      trendColor: "text-green-400",
    },
    {
      label: "Recall (24h)",
      value: "99.1%",
      trend: "+0.5%",
      trendColor: "text-green-400",
    },
    {
      label: "F1 Score",
      value: "0.96",
      trend: "Stable",
      trendColor: "text-gray-400",
    },
  ],
  accuracyTrendData = defaultAccuracyData,
  currentAccuracy = 96.5,
  onViewLogs,
  onExplanationReport,
  onProvideFeedback,
}: LogAnomalyDetectorProps) {
  return (
    <div className="bg-[#111a22] border border-[#233648] rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-[#2b8cee]/20 rounded-lg">
            <Zap className="w-6 h-6 text-[#2b8cee]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold text-white">{modelName}</h3>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  status === "Active"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
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
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              <span className={`text-xs font-medium ${metric.trendColor}`}>
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Accuracy Trend */}
      <div className="bg-[#1a2635] rounded-lg p-4 border border-[#233648] mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-[#92adc9]">
            Accuracy Trend (Last 7 Days)
          </h4>
          <span className="text-sm font-medium text-white">
            Current: {currentAccuracy}%
          </span>
        </div>

        {/* Custom rendered bars to highlight last one */}
        <div className="flex justify-between items-end h-16 gap-1">
          {accuracyTrendData.map((data, index) => (
            <div
              key={index}
              className={`flex-1 rounded-t-sm transition ${
                index === accuracyTrendData.length - 1
                  ? "bg-[#2b8cee] h-12"
                  : "bg-[#233648] h-8"
              }`}
              style={{
                height: `${(data.accuracy - 80) * 6}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onViewLogs}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-[#92adc9] bg-[#1a2635] border border-[#233648] rounded-md hover:border-[#2b8cee] hover:text-white transition"
        >
          View Logs
        </button>
        <button
          onClick={onExplanationReport}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-[#92adc9] bg-[#1a2635] border border-[#233648] rounded-md hover:border-[#2b8cee] hover:text-white transition"
        >
          Explanation Report
        </button>
        <button
          onClick={onProvideFeedback}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-[#2b8cee] bg-[#1a2635] border border-[#2b8cee] rounded-md hover:bg-[#2b8cee]/10 transition"
        >
          Provide Feedback
        </button>
      </div>
    </div>
  );
}
