"use client";

import React from "react";
import { integrations } from "@/constants";
import IntegrationCard from "./IntegrationCard";

interface IntegrationPanelProps {
  onConfigureIntegration?: (integrationId: string) => void;
}

export default function IntegrationPanel({
  onConfigureIntegration,
}: IntegrationPanelProps) {
  return (
    <div className="space-y-8">
      {integrations.map((section) => (
        <div key={section.category} className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-semibold text-white">
              {section.category}
            </h2>
            {section.category === "Observability Sources" && (
              <a
                href="#"
                className="text-xs font-medium text-[#2b8cee] hover:text-[#3da3ff] transition"
              >
                View Documentation
              </a>
            )}
          </div>

          {/* Integration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((item) => (
              <IntegrationCard
                key={item.id}
                icon={item.icon}
                iconBgColor={item.iconBgColor}
                title={item.title}
                description={item.description}
                status={item.status}
                lastSync={item.lastSync}
                actionLabel={item.actionLabel}
                onAction={() => onConfigureIntegration?.(item.id)}
              />
            ))}
          </div>

          {/* Divider between sections */}
          {section.category !==
            integrations[integrations.length - 1].category && (
            <div className="h-px bg-[#233648] mt-8" />
          )}
        </div>
      ))}
    </div>
  );
}
