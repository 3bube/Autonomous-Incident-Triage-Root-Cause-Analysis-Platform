"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { incidentTimelineData } from "@/constants";

const chartConfig = {
  value: {
    label: "Requests",
  },
};

const DeployLabel = (props: any) => {
  const { viewBox } = props;
  const { x, y } = viewBox;

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x="-60" y="-35" width="120" height="40">
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap shadow-lg shadow-blue-500/20 z-20 relative">
            Deploy v2.4.1
          </div>
          <div className="w-0.5 h-6 bg-blue-500/50 -mt-1"></div>
        </div>
      </foreignObject>
      <circle cx="0" cy="0" r="3" fill="#3b82f6" />
    </g>
  );
};

const LatencyLabel = (props: any) => {
  const { viewBox } = props;
  const { x, y, height } = viewBox; // height is reference line height usually

  // Position slightly above the bar or at a fixed height
  // Since ReferenceLine without y is full height, we can position relative to top
  return (
    <g transform={`translate(${x}, ${y + 60})`}>
      <foreignObject x="-40" y="-10" width="100" height="40">
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-[10px] px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap text-center">
          Latency &gt; 1s
        </div>
      </foreignObject>
      <line
        x1="0"
        y1="15"
        x2="0"
        y2="100"
        stroke="#ef4444"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.5"
      />
    </g>
  );
};

function IncidentTimeline() {
  return (
    <div className="bg-[#12141a] rounded-xl border border-white/5 p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-white">Incident Timeline</h3>
        <div className="flex bg-black rounded-lg p-1 border border-white/10">
          <button className="px-3 py-1 text-xs font-medium bg-[#1a1d24] text-white rounded shadow-sm border border-white/5">
            1h
          </button>
          <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-white transition-colors">
            6h
          </button>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-64 w-full">
        <BarChart
          data={incidentTimelineData}
          margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis
            dataKey="time"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 10, fontFamily: "monospace" }}
            interval={2}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={40}>
            {incidentTimelineData.map((entry, index) => {
              let fill = "rgba(255,255,255,0.1)"; // normal
              if (entry.status === "warning") fill = "#eab308"; // yellow-500
              if (entry.status === "critical") fill = "#ef4444"; // red-500
              if (entry.status === "normal") fill = "rgba(16, 185, 129, 0.3)"; // emerald-500 30%

              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Bar>

          {/* Deploy Marker */}
          <ReferenceLine
            x="13:59"
            stroke="#3b82f6"
            strokeDasharray="3 3"
            strokeOpacity={0.5}
            label={<DeployLabel />}
            isFront
          />

          {/* Latency Annotation */}
          <ReferenceLine
            x="14:05"
            stroke="transparent"
            label={<LatencyLabel />}
            isFront
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default IncidentTimeline;
