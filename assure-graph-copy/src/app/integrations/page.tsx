import React from "react";
import AppLayout from "@/components/global/AppLayout";
import IntegrationsContent from "@/components/integrations/IntegrationsContent";

export default function IntegrationsPage() {
  return (
    <AppLayout mainClassName="p-0">
      <IntegrationsContent />
    </AppLayout>
  );
}
