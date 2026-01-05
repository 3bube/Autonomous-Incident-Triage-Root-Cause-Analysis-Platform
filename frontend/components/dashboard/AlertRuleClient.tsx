"use client";

import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import AlertRulesTable from "@/components/dashboard/AlertRulesTable";
import { alertRulesData } from "@/constants";

function AlertRuleClient() {
  const handleToggleRule = (ruleId: string, status: boolean) => {
    console.log(`Rule ${ruleId} toggled to ${status}`);
  };

  const handleEditRule = (ruleId: string) => {
    console.log(`Edit rule ${ruleId}`);
  };

  const handleDeleteRule = (ruleId: string) => {
    console.log(`Delete rule ${ruleId}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-8">
        {alertRulesData.map((rule) => (
          <StatCard
            key={rule.label}
            label={rule.label}
            value={rule.value}
            icon={rule.icon}
            iconColor={rule.iconColor}
            trend={rule.trend}
            meta={rule.meta}
            variant={rule.variant}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Active Rules</h2>
        <AlertRulesTable
          onToggleRule={handleToggleRule}
          onEditRule={handleEditRule}
          onDeleteRule={handleDeleteRule}
        />
      </div>
    </div>
  );
}

export default AlertRuleClient;
