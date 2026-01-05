"use client";

import React from "react";
import SuppressionPoliciesTable from "./SuppressionPoliciesTable";
import { suppressionPolicies } from "@/constants";

interface SuppressionPoliciesClientProps {
  onCreatePolicy?: () => void;
  onEditPolicy?: (policyId: string) => void;
  onDeletePolicy?: (policyId: string) => void;
}

export default function SuppressionPoliciesClient({
  onCreatePolicy,
  onEditPolicy,
  onDeletePolicy,
}: SuppressionPoliciesClientProps) {
  const handleCreatePolicy = () => {
    console.log("Create new policy");
    onCreatePolicy?.();
  };

  const handleEditPolicy = (policyId: string) => {
    console.log(`Edit policy: ${policyId}`);
    onEditPolicy?.(policyId);
  };

  const handleDeletePolicy = (policyId: string) => {
    console.log(`Delete policy: ${policyId}`);
    onDeletePolicy?.(policyId);
  };

  return (
    <SuppressionPoliciesTable
      policies={suppressionPolicies}
      onCreatePolicy={handleCreatePolicy}
      onEditPolicy={handleEditPolicy}
      onDeletePolicy={handleDeletePolicy}
    />
  );
}
