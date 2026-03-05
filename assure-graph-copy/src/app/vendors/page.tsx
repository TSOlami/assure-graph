import React from "react";
import AppLayout from "@/components/global/AppLayout";
import VendorsContent from "@/components/vendors/VendorsContent";

export default function VendorsPage() {
  return (
    <AppLayout mainClassName="bg-gray-50">
      <VendorsContent />
    </AppLayout>
  );
}
