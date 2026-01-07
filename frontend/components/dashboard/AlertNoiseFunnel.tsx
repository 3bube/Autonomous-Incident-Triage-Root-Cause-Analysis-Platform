"use client";

import React from "react";
import { alertFunnelData } from "@/constants";

function AlertNoiseFunnel() {
  return (
    <div className="bg-[#08090C] border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">
          Alert Noise Funnel
        </h3>
        <p className="text-sm text-gray-500">
          Efficiency of AI correlation engine
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 w-full relative">
        {/* Raw Alerts */}
        <div className="w-full">
          <div className="flex justify-between text-sm mb-2 px-1">
            <span className="text-cyan-400">Raw Alerts</span>
            <span className="text-white font-mono">
              {alertFunnelData.rawAlerts.toLocaleString()}
            </span>
          </div>
          <div className="w-full h-12 bg-[#1f2937]/50 border border-white/5 rounded-lg mx-auto" />
        </div>

        {/* Connector Line */}
        {/* <div className="h-4 w-0.5 bg-gray-800" /> */}

        {/* Correlated Groups */}
        <div className="w-[80%]">
          <div className="flex justify-between text-sm mb-2 px-1">
            <span className="text-cyan-400">Correlated Groups</span>
            <span className="text-white font-mono">
              {alertFunnelData.correlatedGroups}
            </span>
          </div>
          <div className="w-full h-12 bg-cyan-900/20 border border-cyan-500/20 rounded-lg mx-auto" />
        </div>

        {/* Connector Line */}
        {/* <div className="h-4 w-0.5 bg-gray-800" /> */}

        {/* Incidents */}
        <div className="w-[40%] flex flex-col items-center">
          <div className="flex justify-between w-full text-sm mb-2 px-1">
            <span className="text-gray-400 mx-auto mb-1">
              Incidents{" "}
              <span className="text-white font-mono ml-1">
                {alertFunnelData.incidents}
              </span>
            </span>
          </div>
          <div className="w-full h-12 bg-cyan-400 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center justify-center">
            <span className="text-black font-bold text-lg">
              {alertFunnelData.efficiency}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertNoiseFunnel;
