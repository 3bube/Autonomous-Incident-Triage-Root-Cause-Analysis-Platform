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
import { useIncidentVolume } from "@/hooks/queries/useDashboard";

const timeRangeMap = {
  "Last 7 Days": 168, // 7 days in hours
  "Last 30 Days": 720,
  "Last 90 Days": 2160,
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a2635] border border-[#233648] rounded px-2 py-1 text-xs text-white">
        <p>{payload[0].payload.timestamp}</p>
        <p>Volume: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function IncidentVolume() {
  const [selectedRange, setSelectedRange] =
    useState<keyof typeof timeRangeMap>("Last 7 Days");
  const [isOpen, setIsOpen] = useState(false);

  const hours = timeRangeMap[selectedRange];
  const { data: incidentData, isLoading } = useIncidentVolume(undefined, hours);

  const handleRangeSelect = (range: keyof typeof timeRangeMap) => {
    setSelectedRange(range);
    setIsOpen(false);
  };

  const chartData =
    incidentData?.data?.data_points?.map((point) => ({
      timestamp: new Date(point.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      volume: point.incident_count,
    })) || [];

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
              {(
                Object.keys(timeRangeMap) as Array<keyof typeof timeRangeMap>
              ).map((range) => (
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
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-[#92adc9]">Loading chart...</div>
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-[#92adc9]">No data available</div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#233648"
                vertical={false}
              />
              <XAxis
                dataKey="timestamp"
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
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
