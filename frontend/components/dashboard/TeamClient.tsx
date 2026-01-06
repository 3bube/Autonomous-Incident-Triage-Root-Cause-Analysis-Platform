"use client";

import StatCard from "./StatCard";
import { teamData } from "@/constants";
import TeamTable from "./TeamTable";

function TeamClient() {
  return (
    <div className="mt-6">
      <div
        className="grid gri
      d-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {teamData.map((member, index) => (
          <StatCard
            key={index}
            variant={member.variant}
            label={member.label}
            value={member.value}
            icon={member.icon}
            meta={member.meta}
            iconColor={member.iconColor}
            trend={member.trend}
          />
        ))}
      </div>

      <TeamTable />
    </div>
  );
}

export default TeamClient;
