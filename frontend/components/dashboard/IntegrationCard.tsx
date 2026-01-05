"use client";

import React from "react";
import { Button } from "../ui/button";

type IntegrationStatus = "connected" | "disconnected" | "synced";

interface IntegrationCardProps {
  icon: React.ReactNode;
  iconBgColor?: string;
  title: string;
  description: string;
  status: IntegrationStatus;
  lastSync?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const statusConfig = {
  connected: {
    bgColor: "bg-[rgba(34,197,94,0.1)]",
    textColor: "text-[#22c55e]",
    borderColor: "border-[rgba(34,197,94,0.2)]",
    label: "Connected",
  },
  disconnected: {
    bgColor: "bg-[rgba(107,114,128,0.1)]",
    textColor: "text-[#6b7280]",
    borderColor: "border-[rgba(107,114,128,0.2)]",
    label: "Disconnected",
  },
  synced: {
    bgColor: "bg-[rgba(34,197,94,0.1)]",
    textColor: "text-[#22c55e]",
    borderColor: "border-[rgba(34,197,94,0.2)]",
    label: "Synced",
  },
};

export default function IntegrationCard({
  icon,
  iconBgColor = "bg-[#2563eb]",
  title,
  description,
  status,
  lastSync,
  actionLabel = "Configure",
  onAction,
}: IntegrationCardProps) {
  const statusStyle = statusConfig[status];

  return (
    <div
      className={`p-5 bg-[#1a2635] border border-[#233648] rounded-lg hover:border-[#2b8cee] transition`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left Section - Icon and Content */}
        <div className="flex flex-col items-start gap-4 flex-1 ">
          {/* Icon */}

          <div className="flex  w-full items-center justify-between">
            <div className={`${iconBgColor} p-3 rounded-lg shrink-0`}>
              {icon}
            </div>
            {/* Right Section - Action Button */}
            <span
              className={`inline-flex px-2 py-0.5 text-md font-medium rounded-sm ${statusStyle.bgColor} ${statusStyle.textColor} border ${statusStyle.borderColor}`}
            >
              {statusStyle.label}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 ">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>

            <p className="text-md text-[#92adc9] mb-2">{description}</p>
          </div>

          <div className="border-t border-[#233648] pt-3 w-full flex items-center justify-between">
            {lastSync && (
              <p className="text-sm text-[#58738e]">Last sync: {lastSync}</p>
            )}

            <Button variant="ghost" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
