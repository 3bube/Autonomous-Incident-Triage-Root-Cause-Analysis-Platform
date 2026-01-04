"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  // Layout variant
  variant?: "compact" | "detailed"; // compact = single row, detailed = with progress bar

  // Content
  label: string;
  value: string | number;
  icon: LucideIcon;
  meta?: string;

  // Optional: Trend indicator
  trend?: {
    value: number | string; // e.g., -5, "+12%", "-0.12%"
    isPositive?: boolean; // if not provided, infers from value
  };

  // Optional: Progress bar for detailed variant
  progressValue?: number; // 0-100
  progressColor?: "green" | "yellow" | "red" | "blue";

  // Optional: Icon styling
  iconColor?: string;
  iconBgColor?: string;
}

export default function StatCard({
  variant = "detailed",
  label,
  value,
  icon: Icon,
  meta,
  trend,
  progressValue,
  progressColor = "green",
  iconColor = "text-[#92adc9]",
  iconBgColor = "bg-[#192633]",
}: StatCardProps) {
  // Determine trend color
  const getTrendColor = () => {
    if (!trend) return "";

    if (trend.isPositive !== undefined) {
      return trend.isPositive ? "text-green-400" : "text-red-400";
    }

    // Infer from value string
    const trendStr = String(trend.value);
    if (trendStr.includes("-")) return "text-red-400";
    if (trendStr.includes("+")) return "text-green-400";
    return "text-red-400"; // default to red for unknown
  };

  const getProgressBarColor = () => {
    const colors = {
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
      blue: "bg-[#2b8cee]",
    };
    return colors[progressColor] || colors.green;
  };

  if (variant === "compact") {
    return (
      <div className="bg-[#192633] border border-[#233648] rounded-lg px-4 py-4 flex flex-col gap-3">
        {/* Header with Icon */}
        <div className="flex items-center justify-between">
          <span className="text-lg  text-[#92adc9] uppercase tracking-wider">
            {label}
          </span>
          <div
            className={`${iconBgColor} p-1.5 rounded flex items-center justify-center`}
          >
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
        </div>

        {/* Value and Trend */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">{value}</span>
          {trend && (
            <span className={`text-xs font-medium ${getTrendColor()}`}>
              {trend.value}
            </span>
          )}
        </div>

        <span className="text-muted-foreground">{meta}</span>
      </div>
    );
  }

  // Detailed variant
  return (
    <div className="bg-[#192633] border border-[#233648] rounded-lg px-6 py-4 flex flex-col gap-4">
      {/* Header with Icon and Label */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-[#92adc9]">{label}</h3>
        <div
          className={`${iconBgColor} p-2 rounded flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      {/* Value and Trend */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-white">{value}</span>
        {trend && (
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trend.value}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {progressValue !== undefined && (
        <div className="flex flex-col gap-2">
          <div className="w-full bg-[#111a22] rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full ${getProgressBarColor()} transition-all duration-300`}
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
