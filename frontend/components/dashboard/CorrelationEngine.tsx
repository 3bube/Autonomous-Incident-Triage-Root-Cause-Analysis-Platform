"use client";

import React from "react";
import { ArrowRight, Sparkles, Bell, Brain } from "lucide-react";
import { useCorrelationAnalysis } from "@/hooks/queries/useDashboard";

export default function CorrelationEngine() {
  const { data: correlation, isLoading } = useCorrelationAnalysis(undefined, 1);

  if (isLoading) {
    return (
      <div
        className="border border-[#233648] rounded-lg p-6 animate-pulse"
        style={{
          background:
            "linear-gradient(90deg, rgba(43, 140, 238, 0.1) 0%, #192633 100%)",
        }}
      >
        <div className="h-32 bg-[#1a2635] rounded" />
      </div>
    );
  }

  const data = correlation?.data;
  const totalAlerts = data?.error_logs_count || 0;
  const activeIncidents = data?.correlations?.length || 0;
  const aiPrediction = data?.ai_prediction;
  const correlationScore = data?.correlation_score || 0;

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
            {totalAlerts}{" "}
            <span className="text-white">signals analyzed into</span>{" "}
            {activeIncidents}{" "}
            <span className="text-[#2b8cee]">
              {activeIncidents === 1 ? "correlation" : "correlations"}
            </span>
          </h2>

          <p className="text-md text-[#92adc9] leading-relaxed max-w-lg mb-4">
            {aiPrediction?.root_cause ? (
              <>
                <span className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-[#2b8cee]" />
                  <span className="font-semibold text-[#2b8cee]">
                    AI Prediction ({(aiPrediction.confidence * 100).toFixed(0)}%
                    confidence):
                  </span>
                </span>
                <span className="block ml-6">{aiPrediction.reasoning}</span>
              </>
            ) : (
              "Our machine learning model is analyzing patterns in the signal stream. Related alerts are grouped to reduce paging fatigue."
            )}
          </p>

          {correlationScore > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#92adc9]">
                Correlation Strength:
              </span>
              <div className="flex-1 max-w-xs bg-[#1a2635] rounded-full h-2">
                <div
                  className="bg-[#2b8cee] h-2 rounded-full transition-all"
                  style={{ width: `${correlationScore * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-[#2b8cee]">
                {(correlationScore * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>

        {/* Right Section: Stats with Arrow */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          {/* Raw Alerts Stat */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary border border-[#233648] rounded-lg px-6 py-4 flex flex-col items-center min-w-24">
              <Bell className="w-6 h-6  mb-2" />
              <span className="text-xl font-bold text-white">
                {totalAlerts.toLocaleString()}
              </span>
              <span className="text-xs text-[#92adc9] mt-1">Error Logs</span>
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-6 h-6 text-[#92adc9] hidden md:block" />

          {/* Incident Stat */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#111a22] border border-[#2b8cee] shadow-[0_0_10px_#2b8cee] rounded-lg px-6 py-4 flex flex-col items-center min-w-24">
              <span className="text-[#2b8cee] text-xl font-bold">!</span>
              <span className="text-xl font-bold">{activeIncidents}</span>
              <span className="text-xs text-[#92adc9] mt-1">Correlations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
