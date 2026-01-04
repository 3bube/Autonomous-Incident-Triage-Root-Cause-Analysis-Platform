"use client";
import { navItems } from "@/constants";

function Sidebar() {
  return (
    <aside className="bg-[#111a22] border-r border-[#2d3b4e] w-64 flex flex-col h-full">
      <div className="flex flex-col gap-6 p-4">
        {/* Settings Header */}
        <div className="px-2">
          <h1 className="text-lg font-semibold text-white leading-6">
            Settings
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1">Configuration Hub</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.isActive
                  ? "bg-[rgba(43,140,238,0.1)] border border-[rgba(43,140,238,0.2)] text-[#2b8cee]"
                  : "text-[#94a3b8] hover:bg-[#1f2f3f] hover:text-white"
              }`}
            >
              <div
                className={`flex-shrink-0 ${
                  item.isActive ? "text-[#2b8cee]" : "text-[#94a3b8]"
                }`}
              >
                {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-[#2d3b4e]" />

        {/* System Status */}
        <div className="px-2 py-3">
          <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-3">
            System Status
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#22c55e] rounded-full flex-shrink-0" />
            <span className="text-sm text-[#4ade80] font-medium">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
