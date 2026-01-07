"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Maximize2,
  ShoppingCart,
  Server,
  Banknote,
  DollarSign,
} from "lucide-react";
import { blastRadiusData } from "@/constants";

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  ShoppingCart: ShoppingCart,
  Server: Server,
  Banknote: Banknote,
};

// Status config
const statusConfig: Record<
  string,
  {
    color: string;
    borderColor: string;
    glow: string;
    dotColor: string;
    bg: string;
  }
> = {
  critical: {
    color: "text-red-500",
    borderColor: "border-red-500",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.5)]",
    dotColor: "bg-red-500",
    bg: "bg-red-500/10",
  },
  degraded: {
    color: "text-yellow-500",
    borderColor: "border-yellow-500",
    glow: "",
    dotColor: "bg-yellow-500",
    bg: "bg-yellow-500/10",
  },
  healthy: {
    color: "text-green-500",
    borderColor: "border-green-500",
    glow: "",
    dotColor: "bg-green-500",
    bg: "bg-green-500/10",
  },
};

export default function BlastRadius() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle Resize for SVG lines
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="bg-[#12141a] rounded-xl border border-white/5 overflow-hidden flex flex-col h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h3 className="text-lg font-bold text-white">Blast Radius</h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Graph Area */}
      <div
        ref={containerRef}
        className="relative flex-1 w-full h-full overflow-hidden"
        style={{
          backgroundColor: "#08090C",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      >
        {/* SVG Layer for Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {blastRadiusData.edges.map((edge, idx) => {
            const sourceNode = blastRadiusData.nodes.find(
              (n) => n.id === edge.source
            );
            const targetNode = blastRadiusData.nodes.find(
              (n) => n.id === edge.target
            );

            if (!sourceNode || !targetNode || dimensions.width === 0)
              return null;

            // Convert percentage to pixels
            const x1 = (sourceNode.x / 100) * dimensions.width;
            const y1 = (sourceNode.y / 100) * dimensions.height;
            const x2 = (targetNode.x / 100) * dimensions.width;
            const y2 = (targetNode.y / 100) * dimensions.height;

            const isCritical = edge.status === "critical";

            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isCritical ? "#ef4444" : "#2a2d36"}
                strokeWidth="2"
                strokeDasharray={isCritical ? "6 4" : "0"}
                strokeOpacity={isCritical ? "0.8" : "0.5"}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        {/* Nodes Layer */}
        {blastRadiusData.nodes.map((node) => {
          const Icon = iconMap[node.icon] || Server;
          const config = statusConfig[node.status] || statusConfig.healthy;
          const isCritical = node.status === "critical";

          return (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {/* Node Circle */}
              <div
                className={`w-16 h-16 rounded-full border-2 bg-[#08090C] flex items-center justify-center transition-all duration-300 relative ${config.borderColor} ${config.glow}`}
              >
                {isCritical && (
                  <div className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse" />
                )}
                <Icon className={`w-7 h-7 relative z-10 ${config.color}`} />
              </div>

              {/* Label */}
              <div
                className={`mt-3 text-[11px] font-bold px-3 py-1 rounded-md transition-all duration-300 relative z-20 ${
                  isCritical
                    ? "bg-black/80 backdrop-blur-sm text-red-500 border border-red-500/20 shadow-xl"
                    : "text-gray-500 opacity-60 group-hover:opacity-100"
                }`}
              >
                {node.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Legend */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center gap-6">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
            <span className="text-xs text-gray-400 capitalize">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
