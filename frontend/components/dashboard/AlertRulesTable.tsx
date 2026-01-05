"use client";

import React, { useState, useMemo } from "react";
import { MoreVertical, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Severity = "P1" | "P2" | "P3" | "P4";
type RuleType = "Performance" | "Error" | "Threshold" | "Health" | "Security";

interface AlertRule {
  id: string;
  name: string;
  ruleId: string;
  status: boolean;
  severity: Severity;
  type: RuleType;
  service: string;
  serviceColor: string;
  conditions: string;
  action: string;
  actionIcon?: React.ReactNode;
  actionColor?: string;
  lastTriggered: string;
}

interface AlertRulesTableProps {
  rules?: AlertRule[];
  onToggleRule?: (ruleId: string, status: boolean) => void;
  onEditRule?: (ruleId: string) => void;
  onDeleteRule?: (ruleId: string) => void;
}

const defaultRules: AlertRule[] = [
  {
    id: "1",
    name: "High Latency - Payment Gateway",
    ruleId: "rule-9283-pay",
    status: true,
    severity: "P1",
    type: "Performance",
    service: "Payment Svc",
    serviceColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    conditions: "latency_ms > 500",
    action: "PagerDuty",
    actionColor: "text-red-400",
    lastTriggered: "2m ago",
  },
  {
    id: "2",
    name: "Routine Maintenance - DB Backup",
    ruleId: "rule-1842-db",
    status: true,
    severity: "P3",
    type: "Health",
    service: "Database",
    serviceColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    conditions: "log.msg contains 'backup_start'",
    action: "Suppress",
    lastTriggered: "1h ago",
  },
  {
    id: "3",
    name: "Disk Space Warning",
    ruleId: "rule-3321-fe",
    status: false,
    severity: "P2",
    type: "Threshold",
    service: "Frontend",
    serviceColor: "bg-green-500/20 text-green-400 border-green-500/30",
    conditions: "disk_free < 10%",
    action: "#dev-ops",
    actionColor: "text-green-400",
    lastTriggered: "3d ago",
  },
  {
    id: "4",
    name: "API Rate Limit Exceeded",
    ruleId: "rule-7712-api",
    status: true,
    severity: "P2",
    type: "Performance",
    service: "API Gateway",
    serviceColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    conditions: "req_per_sec > 1000",
    action: "oncall@sre.com",
    lastTriggered: "5m ago",
  },
  {
    id: "5",
    name: "Pod CrashLoopBackOff",
    ruleId: "rule-5511-k8s",
    status: true,
    severity: "P1",
    type: "Error",
    service: "Kubernetes",
    serviceColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    conditions: "restart_count > 5",
    action: "PagerDuty",
    actionColor: "text-red-400",
    lastTriggered: "12m ago",
  },
];

export default function AlertRulesTable({
  rules = defaultRules,
  onToggleRule,
  onEditRule,
  onDeleteRule,
}: AlertRulesTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedService, setSelectedService] = useState<string | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<
    "Active" | "Inactive" | "All"
  >("All");
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | "All">(
    "All"
  );
  const [selectedType, setSelectedType] = useState<RuleType | "All">("All");

  const filteredRules = useMemo(() => {
    return rules.filter((rule) => {
      const matchesService =
        selectedService === "All" || rule.service === selectedService;
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Active" && rule.status) ||
        (selectedStatus === "Inactive" && !rule.status);
      const matchesSeverity =
        selectedSeverity === "All" || rule.severity === selectedSeverity;
      const matchesType = selectedType === "All" || rule.type === selectedType;
      const matchesFilter =
        rule.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        rule.service.toLowerCase().includes(globalFilter.toLowerCase()) ||
        rule.conditions.toLowerCase().includes(globalFilter.toLowerCase());

      return (
        matchesService &&
        matchesStatus &&
        matchesSeverity &&
        matchesType &&
        matchesFilter
      );
    });
  }, [
    rules,
    selectedService,
    selectedStatus,
    selectedSeverity,
    selectedType,
    globalFilter,
  ]);

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {/* Status Filter */}
          <button
            onClick={() =>
              setSelectedStatus(selectedStatus === "All" ? "Active" : "All")
            }
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition flex items-center gap-2 ${
              selectedStatus !== "All"
                ? "bg-[#233648] text-white border border-[#2b8cee]"
                : "bg-[#111a22] text-[#92adc9] border border-[#233648] hover:border-[#2b8cee]"
            }`}
          >
            <span>
              Status: {selectedStatus !== "All" ? selectedStatus : "All"}
            </span>
            {selectedStatus !== "All" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStatus("All");
                }}
                className="p-0.5 hover:bg-[#2b8cee]/20 rounded transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </div>
            )}
          </button>

          {/* Severity Filter */}
          <button
            onClick={() =>
              setSelectedSeverity(selectedSeverity === "All" ? "P1" : "All")
            }
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition flex items-center gap-2 ${
              selectedSeverity !== "All"
                ? "bg-[#233648] text-white border border-[#2b8cee]"
                : "bg-[#111a22] text-[#92adc9] border border-[#233648] hover:border-[#2b8cee]"
            }`}
          >
            <span>Severity: {selectedSeverity}</span>
            {selectedSeverity !== "All" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSeverity("All");
                }}
                className="p-0.5 hover:bg-[#2b8cee]/20 rounded transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </div>
            )}
          </button>

          {/* Service Filter */}
          <button
            onClick={() =>
              setSelectedService(
                selectedService === "All" ? "Payment Svc" : "All"
              )
            }
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition flex items-center gap-2 ${
              selectedService !== "All"
                ? "bg-[#233648] text-white border border-[#2b8cee]"
                : "bg-[#111a22] text-[#92adc9] border border-[#233648] hover:border-[#2b8cee]"
            }`}
          >
            <span>Service: {selectedService}</span>
            {selectedService !== "All" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService("All");
                }}
                className="p-0.5 hover:bg-[#2b8cee]/20 rounded transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </div>
            )}
          </button>

          {/* Type Filter */}
          <button
            onClick={() =>
              setSelectedType(selectedType === "All" ? "Performance" : "All")
            }
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition flex items-center gap-2 ${
              selectedType !== "All"
                ? "bg-[#233648] text-white border border-[#2b8cee]"
                : "bg-[#111a22] text-[#92adc9] border border-[#233648] hover:border-[#2b8cee]"
            }`}
          >
            <span>Type: {selectedType}</span>
            {selectedType !== "All" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedType("All");
                }}
                className="p-0.5 hover:bg-[#2b8cee]/20 rounded transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </div>
            )}
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Filter in..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="ml-auto px-3 py-1.5 text-xs bg-[#111a22] border border-[#233648] rounded-md text-white placeholder-[#58738e] focus:outline-none focus:border-[#2b8cee]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-6 -mb-6 rounded-lg">
        <table className="w-full">
          <thead className="border-b border-[#233648] bg-[#2b8cee]/50">
            <tr className="hover:bg-transparent">
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left rounded-tl-lg w-12">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#233648] bg-[#111a22]"
                />
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Status
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Rule Name / ID
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Service
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Conditions
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Action
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Last Triggered
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-center rounded-tr-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRules.map((rule) => (
              <tr
                key={rule.id}
                className="border border-b-0 border-[#233648] hover:bg-[#1f2f3f] transition"
              >
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#233648] bg-[#111a22]"
                  />
                </td>

                {/* Status Toggle */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <button
                    onClick={() => onToggleRule?.(rule.id, !rule.status)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      rule.status ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        rule.status ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>

                {/* Rule Name */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <div>
                    <p className="text-md font-semibold text-white">
                      {rule.name}
                    </p>
                    <p className="text-sm text-[#58738e]">{rule.ruleId}</p>
                  </div>
                </td>

                {/* Service */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <Badge
                    className={`text-xs border ${rule.serviceColor}`}
                    variant="outline"
                  >
                    {rule.service}
                  </Badge>
                </td>

                {/* Conditions */}
                <td className="px-6 py-4 text-md text-[#92adc9] font-mono text-sm">
                  <span
                    className={`text-${rule.serviceColor} bg-primary/40 px-2 py-1 rounded`}
                  >
                    {rule.conditions}
                  </span>
                </td>

                {/* Action */}
                <td
                  className={`px-6 py-4 text-md font-medium ${rule.actionColor || "text-[#92adc9]"}`}
                >
                  {rule.action}
                </td>

                {/* Last Triggered */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  {rule.lastTriggered}
                </td>

                {/* Actions Menu */}
                <td className="px-6 py-4 text-md text-[#92adc9] text-center relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === rule.id ? null : rule.id)
                    }
                    className="p-1 hover:bg-[#233648] rounded transition"
                  >
                    <MoreVertical className="w-4 h-4 text-[#92adc9]" />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === rule.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#1a2635] border border-[#233648] rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          onEditRule?.(rule.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-[#92adc9] hover:bg-[#233648] transition"
                      >
                        Edit Rule
                      </button>
                      <button
                        onClick={() => {
                          onDeleteRule?.(rule.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-[#233648] transition border-t border-[#233648]"
                      >
                        Delete Rule
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
          Showing 1 to {filteredRules.length} of {rules.length} results
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium text-[#92adc9] bg-[#111a22] border border-[#233648] rounded-md hover:border-[#2b8cee] transition">
            Previous
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-[#92adc9] bg-[#111a22] border border-[#233648] rounded-md hover:border-[#2b8cee] transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
