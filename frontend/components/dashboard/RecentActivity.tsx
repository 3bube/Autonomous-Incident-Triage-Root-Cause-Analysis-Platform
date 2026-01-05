"use client";

import React from "react";
import { History } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
  status?: "completed" | "success" | "pending" | "disabled";
}

interface RecentActivityProps {
  activities?: Activity[];
  onViewFullHistory?: () => void;
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    title: "Auto-retraining completed",
    description: "Long incubation model training",
    timestamp: "2h ago",
    status: "completed",
  },
  {
    id: "2",
    title: "Human feedback received",
    description: "Alerts with high + 3409 as",
    timestamp: "2h 34m ago",
    status: "success",
  },
  {
    id: "3",
    title: "Data ingestion batch",
    description: "Ingested 50k logs from us-east-1",
    timestamp: "3h ago",
    status: "pending",
  },
  {
    id: "4",
    title: "Drift Check",
    description: "Routine scheduled check completed",
    timestamp: "5 days ago",
    status: "disabled",
  },
];

const getStatusColor = (status?: string) => {
  switch (status) {
    case "completed":
      return "bg-blue-500";
    case "success":
      return "bg-cyan-400";
    case "pending":
      return "bg-gray-500";
    case "disabled":
      return "bg-[#233648]";
    default:
      return "bg-gray-500";
  }
};

export default function RecentActivity({
  activities = defaultActivities,
  onViewFullHistory,
}: RecentActivityProps) {
  return (
    <div className="bg-[#111a22] border border-[#233648] rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-[#2b8cee]" />
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4">
            {/* Timeline Dot and Line */}
            <div className="flex flex-col items-center">
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full ${getStatusColor(
                  activity.status
                )} flex-shrink-0`}
              />
              {/* Line */}
              {index !== activities.length - 1 && (
                <div className="w-0.5 h-12 bg-[#233648] mt-2" />
              )}
            </div>

            {/* Activity Content */}
            <div className="flex-1 pt-0.5">
              <h4 className="text-sm font-medium text-white mb-1">
                {activity.title}
              </h4>
              <p className="text-xs text-[#92adc9] mb-2">
                {activity.description}
              </p>
              <p className="text-xs text-[#58738e]">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View Full History Link */}
      <button
        onClick={onViewFullHistory}
        className="w-full mt-6 py-2.5 text-sm font-medium text-[#2b8cee] bg-[#1a2635] border border-[#233648] rounded-md hover:border-[#2b8cee] hover:bg-[#2b8cee]/10 transition"
      >
        View Full History
      </button>
    </div>
  );
}
