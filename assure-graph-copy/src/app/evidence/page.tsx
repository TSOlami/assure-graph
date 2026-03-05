import React from "react";
import AppLayout from "@/components/global/AppLayout";
import EvidenceContent from "@/components/evidence/EvidenceContent";

export default function EvidencePage() {
  return (
    <AppLayout mainClassName="bg-gray-50">
      <EvidenceContent />
    </AppLayout>
  );
}
