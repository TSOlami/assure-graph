import React from "react";
import AppLayout from "@/components/global/AppLayout";
import FrameworksContent from "@/components/frameworks/FrameworksContent";

export default function FrameworksPage() {
  return (
    <AppLayout mainClassName="p-0">
      <FrameworksContent />
    </AppLayout>
  );
}
