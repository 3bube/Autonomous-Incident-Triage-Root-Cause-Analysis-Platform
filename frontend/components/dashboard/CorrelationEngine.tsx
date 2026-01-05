"use client";

import React from "react";
import { ArrowRight, Sparkles, Bell } from "lucide-react";

interface CorrelationEngineProps {
  rawAlertCount: number;
  incidentCount: number;
  title: string;
  description: string;
  relatedPattern?: string;
}

export default function CorrelationEngine({
  rawAlertCount,
  incidentCount,
  title,
  description,
  relatedPattern,
}: CorrelationEngineProps) {
  return (
    <div
      className="border border-[#233648] rounded-lg p-6"
      style={{
        background:
          "linear-gradient(90deg, rgba(43, 140, 238, 0.1) 0%, #192633 100%)",
      }}
    >
      {/* Header Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-md font-bold text-[#2b8cee] uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> AI Correlation Engine
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section: Title and Description */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-3">
            {rawAlertCount}{" "}
            <span className="text-white">raw alerts condensed into</span>{" "}
            {incidentCount}{" "}
            <span className="text-[#2b8cee]">
              {incidentCount === 1 ? "active incident" : "active incidents"}
            </span>
          </h2>

          <p className="text-md text-[#92adc9] leading-relaxed max-w-lg">
            Our machine learning model has identified a pattern in the incoming
            signal stream
            {relatedPattern && (
              <>
                {" "}
                related to{" "}
                <span className="font-semibold">
                  &quot;{relatedPattern}&quot;
                </span>
              </>
            )}
            . Related alerts have been grouped to reduce paging fatigue.
          </p>
        </div>

        {/* Right Section: Stats with Arrow */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          {/* Raw Alerts Stat */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary border border-[#233648] rounded-lg px-6 py-4 flex flex-col items-center min-w-24">
              <Bell className="w-6 h-6  mb-2" />
              <span className="text-xl font-bold text-white">
                {rawAlertCount.toLocaleString()}
              </span>
              <span className="text-xs text-[#92adc9] mt-1">Raw Alerts</span>
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-6 h-6 text-[#92adc9] hidden md:block" />

          {/* Incident Stat */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#111a22] border border-[#2b8cee] shadow-[0_0_10px_#2b8cee] rounded-lg px-6 py-4 flex flex-col items-center min-w-24">
              <span className="text-[#2b8cee] text-xl font-bold">!</span>
              <span className="text-xl font-bold">{incidentCount}</span>
              <span className="text-xs text-[#92adc9] mt-1">Incident</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
