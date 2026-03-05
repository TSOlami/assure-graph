import React from "react";
import AppLayout from "@/components/global/AppLayout";
import VulnerabilitiesContent from "@/components/vulnerabilities/VulnerabilitiesContent";

export default function VulnerabilitiesPage() {
  return (
    <AppLayout mainClassName="bg-gray-50">
      <VulnerabilitiesContent />
    </AppLayout>
  );
}
