import React from "react";
import AppLayout from "@/components/global/AppLayout";
import MonitoringContent from "@/components/monitoring/MonitoringContent";

export default function MonitoringPage() {
  return (
    <AppLayout mainClassName="bg-gray-50">
      <MonitoringContent />
    </AppLayout>
  );
}
