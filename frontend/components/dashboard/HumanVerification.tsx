"use client";

import React from "react";
import { Check, X, PlusSquare } from "lucide-react";

export default function HumanVerification() {
  return (
    <div className="bg-[#1a202c]/50 backdrop-blur-sm rounded-xl border border-white/5 p-6 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-2">Human Verification</h3>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        Does the "Bad Deployment" hypothesis look correct based on your
        findings?
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all font-semibold">
          <Check className="w-4 h-4" />
          Confirm
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all font-semibold">
          <X className="w-4 h-4" />
          Reject
        </button>
      </div>

      <button className="flex items-center justify-center gap-2 w-full text-gray-500 hover:text-gray-300 transition-colors text-sm py-2">
        <PlusSquare className="w-4 h-4" />
        Add Context
      </button>
    </div>
  );
}
