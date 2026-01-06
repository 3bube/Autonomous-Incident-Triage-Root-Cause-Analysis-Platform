"use client";

import React, { useState, useMemo } from "react";
import { MoreVertical, X, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type UserRole = "SRE Lead" | "Admin" | "Viewer" | "Engineer" | "Deactivated";
type UserStatus = "Active" | "Pending" | "Inactive";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
  role: UserRole;
  roleColor: string;
  lastActivity: string;
  status: UserStatus;
}

interface TeamTableProps {
  members?: TeamMember[];
  onEditMember?: (memberId: string) => void;
  onRemoveMember?: (memberId: string) => void;
  onResendInvite?: (memberId: string) => void;
  onExport?: () => void;
}

const defaultMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Chen",
    email: "alex.chen@company.com",
    initials: "AC",
    role: "SRE Lead",
    roleColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    lastActivity: "2 mins ago",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Jones",
    email: "sarah.j@company.com",
    initials: "SJ",
    role: "Admin",
    roleColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    lastActivity: "1 hour ago",
    status: "Active",
  },
  {
    id: "3",
    name: "Michael Ross",
    email: "m.ross@company.com",
    initials: "MR",
    role: "Viewer",
    roleColor: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    lastActivity: "--",
    status: "Pending",
  },
  {
    id: "4",
    name: "David Kim",
    email: "d.kim@company.com",
    initials: "DK",
    role: "Engineer",
    roleColor: "bg-green-500/20 text-green-400 border-green-500/30",
    lastActivity: "2 days ago",
    status: "Active",
  },
  {
    id: "5",
    name: "Emily White",
    email: "emily.w@company.com",
    initials: "EW",
    role: "Deactivated",
    roleColor: "bg-red-500/20 text-red-400 border-red-500/30",
    lastActivity: "3 months ago",
    status: "Inactive",
  },
];

const getStatusColor = (status: UserStatus) => {
  switch (status) {
    case "Active":
      return "bg-green-500";
    case "Pending":
      return "bg-yellow-500";
    case "Inactive":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusText = (status: UserStatus) => {
  switch (status) {
    case "Active":
      return "text-green-400";
    case "Pending":
      return "text-yellow-400";
    case "Inactive":
      return "text-gray-400";
    default:
      return "text-gray-400";
  }
};

export default function TeamTable({
  members = defaultMembers,
  onEditMember,
  onRemoveMember,
  onResendInvite,
  onExport,
}: TeamTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | "All">(
    "All"
  );

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesRole =
        selectedRole === "All" || member.role === selectedRole;
      const matchesStatus =
        selectedStatus === "All" || member.status === selectedStatus;
      const matchesFilter =
        member.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        member.email.toLowerCase().includes(globalFilter.toLowerCase());

      return matchesRole && matchesStatus && matchesFilter;
    });
  }, [members, selectedRole, selectedStatus, globalFilter]);

  const uniqueRoles = Array.from(
    new Set(members.map((m) => m.role))
  ) as UserRole[];

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="flex-1 px-3 py-1.5 text-xs bg-[#111a22] border border-[#233648] rounded-md text-white placeholder-[#58738e] focus:outline-none focus:border-[#2b8cee]"
        />

        <div className="flex flex-wrap gap-2">
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) =>
              setSelectedRole(e.target.value as UserRole | "All")
            }
            className="px-3 py-1.5 text-xs font-medium bg-[#111a22] text-[#92adc9] border border-[#233648] rounded-md hover:border-[#2b8cee] focus:outline-none focus:border-[#2b8cee] cursor-pointer"
          >
            <option value="All">All Roles</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as UserStatus | "All")
            }
            className="px-3 py-1.5 text-xs font-medium bg-[#111a22] text-[#92adc9] border border-[#233648] rounded-md hover:border-[#2b8cee] focus:outline-none focus:border-[#2b8cee] cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* More Filters */}
          <button className="px-3 py-1.5 text-xs font-medium text-[#92adc9] bg-[#111a22] border border-[#233648] rounded-md hover:border-[#2b8cee] hover:text-white transition flex items-center gap-1">
            More Filters
          </button>

          {/* Export */}
          <button
            onClick={onExport}
            className="px-3 py-1.5 text-xs font-medium text-[#92adc9] bg-[#111a22] border border-[#233648] rounded-md hover:border-[#2b8cee] hover:text-white transition flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
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
                User
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Role
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Last Activity
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-left">
                Status
              </th>
              <th className="text-md font-semibold text-[#92adc9] uppercase tracking-wider p-4 text-center rounded-tr-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr
                key={member.id}
                className="border border-b-0 border-[#233648] hover:bg-[#1f2f3f] transition"
              >
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#233648] bg-[#111a22]"
                  />
                </td>

                {/* User */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2b8cee] to-[#1e5ba8] flex items-center justify-center text-sm font-bold text-white">
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-md font-semibold text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-[#58738e]">{member.email}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <Badge
                    className={`text-xs border ${member.roleColor}`}
                    variant="outline"
                  >
                    {member.role}
                  </Badge>
                </td>

                {/* Last Activity */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  {member.lastActivity}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-md text-[#92adc9]">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        member.status
                      )}`}
                    />
                    <span className={getStatusText(member.status)}>
                      {member.status}
                    </span>
                    {member.status === "Pending" && (
                      <button
                        onClick={() => onResendInvite?.(member.id)}
                        className="ml-2 text-xs font-medium text-[#2b8cee] hover:text-[#3da3ff] transition"
                      >
                        Resend
                      </button>
                    )}
                  </div>
                </td>

                {/* Actions Menu */}
                <td className="px-6 py-4 text-md text-[#92adc9] text-center relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === member.id ? null : member.id)
                    }
                    className="p-1 hover:bg-[#233648] rounded transition"
                  >
                    <MoreVertical className="w-4 h-4 text-[#92adc9]" />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === member.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-[#1a2635] border border-[#233648] rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          onEditMember?.(member.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-[#92adc9] hover:bg-[#233648] transition"
                      >
                        Edit Member
                      </button>
                      <button
                        onClick={() => {
                          onRemoveMember?.(member.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-[#233648] transition border-t border-[#233648]"
                      >
                        Remove Member
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
          Showing 1 to {filteredMembers.length} of {members.length} results
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
