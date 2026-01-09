"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

interface IncidentVolumeProps {
  timeRange?: "Last 7 Days" | "Last 30 Days" | "Last 90 Days";
  onTimeRangeChange?: (range: string) => void;
}

const chartData = [
  { day: "Mon", volume: 45, trend: 30 },
  { day: "Tue", volume: 62, trend: 35 },
  { day: "Wed", volume: 58, trend: 42 },
  { day: "Thu", volume: 73, trend: 48 },
  { day: "Fri", volume: 51, trend: 45 },
  { day: "Sat", volume: 48, trend: 42 },
  { day: "Sun", volume: 85, trend: 40 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a2635] border border-[#233648] rounded px-2 py-1 text-xs text-white">
        <p>{payload[0].payload.day}</p>
        <p>Volume: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function IncidentVolume({
  timeRange = "Last 7 Days",
  onTimeRangeChange,
}: IncidentVolumeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(timeRange);

  const handleRangeSelect = (
    range: "Last 7 Days" | "Last 30 Days" | "Last 90 Days"
  ) => {
    setSelectedRange(range);
    setIsOpen(false);
    onTimeRangeChange?.(range);
  };

  return (
    <div className="p-6 bg-[#111a22] border border-[#233648] rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Incident Volume</h2>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#92adc9] bg-[#1a2635] border border-[#233648] rounded-md hover:border-[#2b8cee] transition"
          >
            {selectedRange}
            <ChevronDown className="w-4 h-4" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#1a2635] border border-[#233648] rounded-md shadow-lg z-10">
              {(["Last 7 Days", "Last 30 Days", "Last 90 Days"] as const).map(
                (range) => (
                  <button
                    key={range}
                    onClick={() => handleRangeSelect(range)}
                    className={`w-full text-left px-4 py-2 text-xs transition ${
                      selectedRange === range
                        ? "bg-[#2b8cee] text-white"
                        : "text-[#92adc9] hover:bg-[#233648]"
                    }`}
                  >
                    {range}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#233648"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke="#92adc9"
              style={{ fontSize: "12px" }}
              axisLine={{ stroke: "#233648" }}
              tickLine={{ stroke: "#233648" }}
            />
            <YAxis
              stroke="#92adc9"
              style={{ fontSize: "12px" }}
              axisLine={{ stroke: "#233648" }}
              tickLine={{ stroke: "#233648" }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Bar Chart - Blue bars */}
            <Bar dataKey="volume" fill="#2b5a9f" radius={[4, 4, 0, 0]} />

            {/* Line Chart - Dotted trend line */}
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#fbbf24"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
