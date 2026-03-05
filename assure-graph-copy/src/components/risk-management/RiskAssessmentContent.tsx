"use client";

import { useState } from "react";
import { AIBanner } from "@/components/ui/AIBanner";

export default function RiskAssessmentContent() {
  const [alertDismissed, setAlertDismissed] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Risk Assessment</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Run AI Risk Assessment
        </button>
      </div>

      {/* AI Banner */}
      {!alertDismissed && (
        <AIBanner
          title="AI Risk Assessment Available"
          description="AssureGraph AI can automatically assess risks using qualitative and quantitative factors, industry benchmarks, and your organization's risk tolerance."
          confidence="91% Confident"
          primaryActionLabel="Start AI Assessment"
          onDismiss={() => setAlertDismissed(true)}
        />
      )}
    </div>
  );
}
