"use client";

import React from "react";
import IntegrationPanel from "@/components/dashboard/IntegrationPanel";
import SuppressionPoliciesClient from "@/components/dashboard/SuppressionPoliciesClient";

function IntegrationClient() {
  const handleConfigureIntegration = (integrationId: string) => {
    console.log(`Configure integration: ${integrationId}`);
    // Handle integration configuration logic here
  };

  return (
    <div className="space-y-8">
      <IntegrationPanel onConfigureIntegration={handleConfigureIntegration} />
      <SuppressionPoliciesClient />
    </div>
  );
}

export default IntegrationClient;
