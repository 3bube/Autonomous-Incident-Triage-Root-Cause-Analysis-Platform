"use client";
"use no memo";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

type Severity = "P1" | "P2" | "P3" | "P4";
type Status = "Investigating" | "Monitoring" | "Mitigated" | "Resolved";

interface Incident {
  id: string;
  severity: Severity;
  name: string;
  description?: string;
  service: string;
  duration: string;
  status: Status;
}

interface IncidentsTableProps {
  incidents?: Incident[];
  onAnalyze?: (incidentId: string) => void;
}

const getSeverityVariant = (severity: Severity) => {
  const variants = {
    P1: "severity-critical",
    P2: "severity-high",
    P3: "severity-medium",
    P4: "severity-low",
  };
  return variants[severity] as any;
};

const getStatusVariant = (status: Status) => {
  const variants = {
    Investigating: "status-investigating",
    Monitoring: "status-monitoring",
    Mitigated: "status-mitigated",
    Resolved: "status-resolved",
  };
  return variants[status] as any;
};

const defaultIncidents: Incident[] = [
  {
    id: "1",
    severity: "P1",
    name: "Database Latency Spike",
    description: "#INC-2401",
    service: "User-DB",
    duration: "14s 32s",
    status: "Investigating",
  },
  {
    id: "2",
    severity: "P2",
    name: "Checkout API 500 Errors",
    description: "#INC-2399",
    service: "Checkout",
    duration: "42s 18s",
    status: "Monitoring",
  },
  {
    id: "3",
    severity: "P3",
    name: "Image Resizing Slow",
    description: "#INC-2398",
    service: "Media-Svc",
    duration: "2h 15m",
    status: "Mitigated",
  },
];

export default function IncidentsTable({
  incidents = defaultIncidents,
  onAnalyze,
}: IncidentsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | "All">(
    "All"
  );
  const [selectedStatus, setSelectedStatus] = useState<Status | "All">("All");
  const [selectedService, setSelectedService] = useState<string | "All">("All");
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | "All">(
    "All"
  );

  const columns = useMemo<ColumnDef<Incident>[]>(
    () => [
      {
        accessorKey: "severity",
        header: "SEV",
        cell: (info) => (
          <Badge
            className="rounded-sm text-md"
            variant={getSeverityVariant(info.getValue() as Severity)}
          >
            {info.getValue() as string}
          </Badge>
        ),
      },
      {
        accessorKey: "name",
        header: "INCIDENT",
        cell: (info) => (
          <div>
            <p className="text-md font-semibold text-white">
              {info.getValue() as string}
            </p>
            {info.row.original.description && (
              <p className="text-sm text-[#58738e]">
                {info.row.original.description}
              </p>
            )}
          </div>
        ),
      },
      {
        accessorKey: "service",
        header: "SERVICE",
      },
      {
        accessorKey: "duration",
        header: "DURATION",
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: (info) => (
          <Badge
            className="text-md"
            variant={getStatusVariant(info.getValue() as Status)}
          >
            {info.getValue() as string}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "ACTION",
        cell: (info) => (
          <button
            onClick={() => onAnalyze?.(info.row.original.id)}
            className="text-sm font-medium text-[#2b8cee] hover:text-[#3da3ff] transition"
          >
            Analyze
          </button>
        ),
      },
    ],
    [onAnalyze]
  );

  const filteredData = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesSeverity =
        selectedSeverity === "All" || incident.severity === selectedSeverity;
      const matchesStatus =
        selectedStatus === "All" || incident.status === selectedStatus;
      const matchesService =
        selectedService === "All" || incident.service === selectedService;
      const matchesFilter =
        incident.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        incident.service.toLowerCase().includes(globalFilter.toLowerCase());

      return (
        matchesSeverity && matchesStatus && matchesService && matchesFilter
      );
    });
  }, [
    incidents,
    selectedSeverity,
    selectedStatus,
    selectedService,
    globalFilter,
  ]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
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
              setSelectedService(selectedService === "All" ? "User-DB" : "All")
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

          {/* Status Filter */}
          <button
            onClick={() =>
              setSelectedStatus(
                selectedStatus === "All" ? "Investigating" : "All"
              )
            }
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition flex items-center gap-2 ${
              selectedStatus !== "All"
                ? "bg-[#233648] text-white border border-[#2b8cee]"
                : "bg-[#111a22] text-[#92adc9] border border-[#233648] hover:border-[#2b8cee]"
            }`}
          >
            <span>Status: {selectedStatus !== "All" ? "Active" : "All"}</span>
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

          {/* Time Filter */}
          <button
            onClick={() =>
              setSelectedTimeRange(
                selectedTimeRange === "All" ? "Last 24h" : "All"
              )
            }
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition flex items-center gap-2 ${
              selectedTimeRange !== "All"
                ? "bg-[#233648] text-white border border-[#2b8cee]"
                : "bg-[#111a22] text-[#92adc9] border border-[#233648] hover:border-[#2b8cee]"
            }`}
          >
            <span>
              Time: {selectedTimeRange !== "All" ? selectedTimeRange : "All"}
            </span>
            {selectedTimeRange !== "All" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTimeRange("All");
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
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left ${
                      index === 0 ? "rounded-tl-lg" : ""
                    } ${index === headerGroup.headers.length - 1 ? "rounded-tr-lg" : ""}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border border-b-0 border-[#233648] hover:bg-[#1f2f3f] transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-md text-[#92adc9]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-md text-[#92adc9] bg-[#2b8cee]/50 p-4 rounded-b-lg mt-4 -mx-6 -mb-6 px-6">
        <span>Showing {table.getRowModel().rows.length} active incidents</span>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-[#233648] rounded transition">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-[#233648] rounded transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
