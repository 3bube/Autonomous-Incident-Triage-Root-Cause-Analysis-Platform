"use client";

import React, { useState } from "react";
import { Globe, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";

interface SuppressionPolicy {
  id: string;
  icon: React.ReactNode;
  iconBgColor: string;
  name: string;
  description: string;
  condition: string;
  impact: string;
  status: "active" | "inactive";
}

interface SuppressionPoliciesTableProps {
  policies?: SuppressionPolicy[];
  onCreatePolicy?: () => void;
  onEditPolicy?: (policyId: string) => void;
  onDeletePolicy?: (policyId: string) => void;
}

export default function SuppressionPoliciesTable({
  policies = [],
  onCreatePolicy,
  onEditPolicy,
  onDeletePolicy,
}: SuppressionPoliciesTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">
            Active Suppression Policies
          </h2>
          <p className="text-xs text-[#58738e]">
            Rules that automatically suppress alerts based on AI correlation or
            maintenance windows.
          </p>
        </div>
        <Button onClick={onCreatePolicy}>
          <Globe className="w-4 h-4" />
          Create Policy
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-6 -mb-6 rounded-lg">
        <table className="w-full">
          <thead className="border-b border-[#233648] bg-[#2b8cee]/50">
            <tr className="hover:bg-transparent">
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left rounded-tl-lg">
                Policy Name
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Condition
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Impact
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Status
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left rounded-tr-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr
                key={policy.id}
                className="border border-b-0 border-[#233648] hover:bg-[#1f2f3f] transition"
              >
                {/* Policy Name */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${policy.iconBgColor} p-2 rounded-lg flex-shrink-0`}
                    >
                      {policy.icon}
                    </div>
                    <div>
                      <p className="text-md font-semibold text-white">
                        {policy.name}
                      </p>
                      <p className="text-sm text-[#58738e]">
                        {policy.description}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Condition */}
                <td className="px-6 py-4 text-md text-[#92adc9] font-mono">
                  {policy.condition}
                </td>

                {/* Impact */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  {policy.impact}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded ${
                      policy.status === "active"
                        ? "bg-[rgba(34,197,94,0.1)] text-[#22c55e]"
                        : "bg-[rgba(107,114,128,0.1)] text-[#6b7280]"
                    }`}
                  >
                    {policy.status.charAt(0).toUpperCase() +
                      policy.status.slice(1)}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-md text-[#92adc9] relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === policy.id ? null : policy.id)
                    }
                    className="p-1 hover:bg-[#233648] rounded transition"
                  >
                    <MoreVertical className="w-4 h-4 text-[#92adc9]" />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === policy.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#1a2635] border border-[#233648] rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          onEditPolicy?.(policy.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-[#92adc9] hover:bg-[#233648] transition"
                      >
                        Edit Policy
                      </button>
                      <button
                        onClick={() => {
                          onDeletePolicy?.(policy.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-[#233648] transition border-t border-[#233648]"
                      >
                        Delete Policy
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-md text-[#92adc9] bg-[#2b8cee]/50 p-4 rounded-b-lg mt-4 -mx-6 -mb-6 px-6">
        <span>
          {policies.length > 0
            ? `Showing ${policies.length} policies`
            : "No policies"}
        </span>
      </div>
    </div>
  );
}
