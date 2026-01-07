"use client";

import React from "react";
import { rootCauseStats } from "@/constants";

function RootCauseStats() {
  return (
    <div className="bg-[#08090C] border border-white/10 rounded-xl p-6 h-full">
      <h3 className="text-lg font-semibold text-white mb-6">Top Root Causes</h3>

      <div className="space-y-6">
        {rootCauseStats.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm text-gray-300 font-medium">
                {item.name}
              </span>
              <span className="text-sm text-gray-400 font-mono">
                {item.value}%
              </span>
            </div>

            <div className="h-2 w-full bg-[#18181b] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RootCauseStats;
