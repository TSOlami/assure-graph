"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import PolicyBanner from "./PolicyBanner";
import { PolicyMetrics } from "./PolicyMetrics";
import { PolicyTable } from "./PolicyTable";
import { useRouter } from "next/navigation";

export default function PolicyClient() {
  const router = useRouter();
  const navigateToUploadPolicy = () => {
    router.push("/policy/add-policy");
  };
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-6 px-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Policy Center
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={navigateToUploadPolicy}
            variant="outline"
            className="gap-1.5 border border-gray-200 hover:bg-gray-100 text-gray-800 rounded-lg"
          >
            <i style={{ color: "#1e2939" }} className="lni lni-upload"></i>
            Upload Policy
          </Button>
          <Button className="gap-1.5 bg-brand-5 hover:bg-brand-4 text-white rounded-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 10L13.25 11.75L15 12.5L13.25 13.25L12.5 15L11.75 13.25L10 12.5L11.75 11.75L12.5 10Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
            AI Generated Policy
          </Button>
        </div>
      </div>

      <div className="border-b border-gray-200 pb-3">
        <PolicyMetrics />
      </div>
      <div className="px-6 py-3">
        <PolicyBanner />
      </div>
      <div className="px-6 py-3">
        <PolicyTable />
      </div>
    </div>
  );
}
