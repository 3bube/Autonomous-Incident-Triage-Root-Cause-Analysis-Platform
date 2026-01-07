"use client";

import React from "react";
import { teamLoadData } from "@/constants";

function TeamLoad() {
  return (
    <div className="bg-[#08090C] border border-white/10 rounded-xl p-6 h-full">
      <h3 className="text-lg font-semibold text-white mb-8">Team Load</h3>

      <div className="flex items-end justify-between h-[180px] px-2 gap-4">
        {teamLoadData.map((item) => {
          const isCritical = item.status === "critical";
          const barColor = isCritical ? "bg-rose-500" : "bg-cyan-500";
          const glow = isCritical
            ? "shadow-[0_0_12px_rgba(244,63,94,0.4)]"
            : "shadow-[0_0_12px_rgba(34,211,238,0.2)]"; // Optional glow

          return (
            <div
              key={item.team}
              className="flex flex-col items-center flex-1 h-full justify-end group"
            >
              {/* Tooltip on Hover */}
              {/* Background Track */}
              <div className="w-full h-full bg-[#18181b] rounded-t-sm relative overflow-hidden flex items-end">
                {/* Visual Bar */}
                <div
                  className={`w-full transition-all duration-500 ease-out ${barColor} ${glow}`}
                  style={{ height: `${item.load}%` }}
                />
              </div>

              <span className="text-xs text-gray-500 font-medium mt-3 uppercase tracking-wider">
                {item.team}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeamLoad;
