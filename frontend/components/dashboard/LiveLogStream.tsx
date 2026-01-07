"use client";

import React from "react";
import { liveLogs } from "@/constants";

export default function LiveLogStream() {
  return (
    <div className="bg-[#0b0f17] rounded-xl border border-white/5 p-5 mt-6 h-fit shadow-inner">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
          Live Log Stream
        </h4>
      </div>

      <div className="space-y-2 font-mono text-[11px]">
        {liveLogs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-3 group">
            <span className="text-gray-600 shrink-0">{log.timestamp}</span>
            <span className={`${log.color} font-bold shrink-0`}>
              [{log.level}]
            </span>
            <span className="text-gray-400 truncate group-hover:text-gray-300 transition-colors">
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
