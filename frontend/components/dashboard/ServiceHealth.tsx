"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import { serviceHealthData } from "@/constants";

function ServiceHealth() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500/20 border-red-500/20 text-red-500";
      case "degraded":
        return "bg-yellow-500/20 border-yellow-500/20 text-yellow-500";
      case "healthy":
      default:
        return "bg-emerald-500/20 border-emerald-500/20 text-emerald-500";
    }
  };

  return (
    <div className="bg-[#08090C] border border-white/10 rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Service Health</h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-6 gap-3 mb-6">
        {serviceHealthData.map((item) => (
          <div
            key={item.id}
            className={`aspect-square rounded-md border ${getStatusColor(
              item.status
            )} transition-all hover:brightness-125`}
          />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-gray-400">Healthy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="text-xs text-gray-400">Degraded</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-xs text-gray-400">Critical</span>
        </div>
      </div>
    </div>
  );
}

export default ServiceHealth;
