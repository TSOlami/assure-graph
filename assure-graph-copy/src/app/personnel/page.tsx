import React from "react";
import AppLayout from "@/components/global/AppLayout";
import PersonnelContent from "@/components/personnel/PersonnelContent";

export default function PersonnelPage() {
  return (
    <AppLayout mainClassName="bg-gray-50">
      <PersonnelContent />
    </AppLayout>
  );
}
