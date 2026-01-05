"use client";

import React, { useState } from "react";
import { integrations } from "@/constants";

interface IntegrationTableProps {
  onConfigure?: (integrationId: string) => void;
}

export default function IntegrationTable({
  onConfigure,
}: IntegrationTableProps) {
  const [sortBy, setSortBy] = useState<"name" | "status">("name");

  // Flatten all integrations from all categories
  const allIntegrations = integrations.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      category: section.category,
    }))
  );

  // Sort integrations
  const sortedIntegrations = [...allIntegrations].sort((a, b) => {
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  const statusColors = {
    connected: "text-[#22c55e]",
    disconnected: "text-[#6b7280]",
    synced: "text-[#22c55e]",
  };

  const statusBgColors = {
    connected: "bg-[rgba(34,197,94,0.1)]",
    disconnected: "bg-[rgba(107,114,128,0.1)]",
    synced: "bg-[rgba(34,197,94,0.1)]",
  };

  return (
    <div className="p-6 bg-[#111a22] border border-[#233648] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          All Integrations
        </h2>

        {/* Sort Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("name")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
              sortBy === "name"
                ? "bg-[#233648] text-white border border-[#2b8cee]"
                : "bg-[#1a2635] text-[#92adc9] border border-[#233648] hover:border-[#2b8cee]"
            }`}
          >
            Sort by Name
          </button>
          <button
            onClick={() => setSortBy("status")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
              sortBy === "status"
                ? "bg-[#233648] text-white border border-[#2b8cee]"
                : "bg-[#1a2635] text-[#92adc9] border border-[#233648] hover:border-[#2b8cee]"
            }`}
          >
            Sort by Status
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#233648] bg-[#2b8cee]/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                Integration
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                Last Sync
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedIntegrations.map((integration) => (
              <tr
                key={integration.id}
                className="border-b border-[#233648] hover:bg-[#1f2f3f] transition"
              >
                {/* Integration Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${integration.iconBgColor} p-2 rounded-lg`}
                    >
                      {integration.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {integration.title}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-sm text-[#92adc9]">
                  {integration.category}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded ${
                      statusBgColors[integration.status]
                    } ${statusColors[integration.status]}`}
                  >
                    {integration.status.charAt(0).toUpperCase() +
                      integration.status.slice(1)}
                  </span>
                </td>

                {/* Last Sync */}
                <td className="px-6 py-4 text-sm text-[#58738e]">
                  {integration.lastSync || "N/A"}
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onConfigure?.(integration.id)}
                    className="text-sm font-medium text-[#2b8cee] hover:text-[#3da3ff] transition"
                  >
                    {integration.actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-[#58738e]">
        Showing {sortedIntegrations.length} integrations
      </div>
    </div>
  );
}
