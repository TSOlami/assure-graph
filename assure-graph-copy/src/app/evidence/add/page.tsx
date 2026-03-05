import React from "react";
import AppLayout from "@/components/global/AppLayout";
import UploadEvidenceContent from "@/components/evidence/UploadEvidenceContent";

export default function AddEvidencePage() {
  return (
    <AppLayout mainClassName="bg-gray-50">
      <UploadEvidenceContent />
    </AppLayout>
  );
}
