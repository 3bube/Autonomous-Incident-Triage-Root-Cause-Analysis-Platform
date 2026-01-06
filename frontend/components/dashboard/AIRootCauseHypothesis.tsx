import React from "react";
import { Sparkles } from "lucide-react";
import HypothesesCard from "./HypothesesCard";
import { rootCauseHypothesis } from "@/constants";

export default function AIRootCauseHypothesis() {
  return (
    <div className="w-full mt-6">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center text-2xl font-bold text-white mb-4 gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            AI Root Cause Hypothesis
          </h1>

          <span>Updated 1m ago</span>
        </div>

        <HypothesesCard rootCauseHypothesis={rootCauseHypothesis} />
      </div>
    </div>
  );
}
