import React from "react";
import { CheckCircle2 } from "lucide-react";

interface HypothesesCardProps {
  rootCauseHypothesis: {
    confidence: number;
    title: string;
    description: string;
    reasons: {
      text: string;
      highlight?: string;
    }[];
  };
}

const ConfidenceCircle = ({ percentage }: { percentage: number }) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-gray-800"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-blue-500 transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-xs font-bold text-white">
        {percentage}%
      </span>
    </div>
  );
};

function HypothesesCard({ rootCauseHypothesis }: HypothesesCardProps) {
  return (
    <div className="bg-primary/50 rounded-xl border border-white/5 overflow-hidden w-full mt-6">
      {/* Top Part */}
      <div className="p-5 flex flex-col md:flex-row items-start md:items-center gap-5">
        <ConfidenceCircle percentage={rootCauseHypothesis.confidence} />

        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">
            {rootCauseHypothesis.title}
          </h3>
          <p className="text-gray-400 text-sm">
            {rootCauseHypothesis.description}
          </p>
        </div>

        <div className="self-start md:self-center">
          <button className="bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-2 px-4 rounded-md border border-white/10 transition-colors">
            View Logs
          </button>
        </div>
      </div>

      {/* Bottom Part (Why we think this) */}
      <div className="bg-[#0B0D12] px-6 py-5 border-t border-white/5">
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
          Why we think this
        </h4>
        <div className="space-y-3">
          {rootCauseHypothesis.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <p className="text-gray-300 text-sm">
                {reason.highlight ? (
                  <>
                    {reason.text.split(reason.highlight)[0]}
                    <code className="bg-[#2D1B20] text-[#F87171] px-1.5 py-0.5 rounded text-xs font-mono border border-red-500/10 mx-1">
                      {reason.highlight}
                    </code>
                    {reason.text.split(reason.highlight)[1]}
                  </>
                ) : (
                  reason.text
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HypothesesCard;
