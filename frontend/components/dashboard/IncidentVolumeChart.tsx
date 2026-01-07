"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { analyticsVolumeData } from "@/constants";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.annotation) {
      return (
        <div className="bg-[#18181b] border border-gray-800 p-3 rounded-lg shadow-xl">
          <p className="text-white font-medium text-sm mb-1">Critical Spike</p>
          <p className="text-gray-400 text-xs">High latency detected</p>
        </div>
      );
    }
    return (
      <div className="bg-[#18181b] border border-gray-800 p-2 rounded shadow-xl">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-cyan-400 font-bold text-sm">
          {payload[0].value} Incidents
        </p>
      </div>
    );
  }
  return null;
};

// Custom dot for the "Critical Spike" annotation or general points
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;

  if (payload.annotation) {
    // White dot with halo for the critical spike
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="white" />
        <circle cx={cx} cy={cy} r={10} fill="white" opacity={0.3} />
      </g>
    );
  }

  // Draw white dots for deployment points too, maybe smaller
  if (payload.isDeployment) {
    return <circle cx={cx} cy={cy} r={4} fill="#52525b" stroke="none" />;
  }

  return null;
};

function IncidentVolumeChart() {
  return (
    <div className="bg-[#08090C] border border-white/10 rounded-xl p-6 relative overflow-hidden">
      {/* Background Gradient Effect - Subtle glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -tranislate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Incident Volume vs Deployments
          </h3>
          <p className="text-sm text-gray-500">
            Correlation between release events and system anomalies
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
            <span className="text-xs text-gray-400">Incidents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-0.5 h-3 bg-gray-600" />
            <span className="text-xs text-gray-400">Deployments</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={analyticsVolumeData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#27272a"
              opacity={0.4}
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#52525b", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#52525b", fontSize: 12 }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#3f3f46",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            {/* Reference Lines for Deployments */}
            {analyticsVolumeData.map((entry, index) =>
              entry.isDeployment ? (
                <ReferenceLine
                  key={`ref-${index}`}
                  x={entry.time}
                  stroke="#52525b"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{
                    position: "top",
                    value: "",
                    fill: "#71717a",
                    fontSize: 10,
                  }}
                />
              ) : null
            )}

            <Area
              type="monotone"
              dataKey="incidents"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#colorIncidents)"
              dot={<CustomDot />}
              activeDot={{
                r: 6,
                fill: "#fff",
                stroke: "#22d3ee",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IncidentVolumeChart;
