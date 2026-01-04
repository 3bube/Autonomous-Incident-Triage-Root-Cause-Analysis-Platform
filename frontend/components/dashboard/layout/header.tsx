"use client";

import React from "react";
import { Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-[#111a22] border-b border-[#233648] flex items-center gap-210 px-6 py-3 h-16">
      {/* Left Section: Logo and Branding */}
      <div className="flex items-center gap-8">
        {/* Logo Container */}
        <div className="flex items-center gap-3">
          <div className="bg-[rgba(43,140,238,0.2)] rounded w-8 h-8 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#2b8cee]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-white tracking-[-0.27px]">
            SRE Command
          </h1>
        </div>

        {/* Search Bar */}
        <div className="bg-[#192633] border border-[#233648] rounded-lg flex items-center w-80 h-10">
          <div className="pl-3 text-[#92adc9]">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search incidents, services..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-[#92adc9] focus:outline-none"
          />
          <div className="pr-2 text-xs text-[#58738e] font-medium">⌘K</div>
        </div>
      </div>

      {/* Right Section: Navigation and Actions */}
      <div className="flex items-center gap-6">
        {/* Vertical Divider */}
        <div className="w-px h-6 bg-[#233648]"></div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#192633] border border-[#233648] hover:bg-[#1f2f3f] transition">
            <Bell className="w-5 h-5 text-[#92adc9]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#192633] border border-[#233648] hover:bg-[#1f2f3f] transition">
            <Settings className="w-5 h-5 text-[#92adc9]" />
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full border border-[#233648] bg-linear-to-br from-[#2b8cee] to-[#192633] flex items-center justify-center ml-2">
            <span className="text-sm font-semibold text-white">U</span>
          </div>
        </div>
      </div>
    </div>
  );
}
