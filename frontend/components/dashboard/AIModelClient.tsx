"use client";

import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import { aiModelsData } from "@/constants";
import ActiveModels from "./ActiveModels";

function AIModelClient() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-8">
        {aiModelsData.map((model) => (
          <StatCard
            key={model.label}
            label={model.label}
            value={model.value}
            icon={model.icon}
            iconColor={model.iconColor}
            trend={model.trend}
            meta={model.meta}
            variant={model.variant}
          />
        ))}
      </div>

      <ActiveModels />
    </div>
  );
}

export default AIModelClient;
