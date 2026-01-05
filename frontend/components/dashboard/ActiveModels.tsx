import React from "react";
import LogAnomalyDetector from "./LogAnomalyDetector";
import MetricSpikeCorrelator from "./MetricSpikeCorrelator";
import ModelDriftMonitor from "./ModelDriftMonitor";
import RecentActivity from "./RecentActivity";

function ActiveModels() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - Models List */}
      <div className="col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Active Models</h1>
          <button className="text-sm font-medium text-[#2b8cee] hover:text-[#3da3ff] transition">
            View All
          </button>
        </div>

        {/* Models Container */}
        <div className="space-y-6">
          <LogAnomalyDetector />
          <MetricSpikeCorrelator />
        </div>
      </div>

      {/* Right Column - Drift Monitor & Recent Activity */}
      <div className="space-y-6">
        <ModelDriftMonitor />
        <RecentActivity />
      </div>
    </div>
  );
}

export default ActiveModels;
