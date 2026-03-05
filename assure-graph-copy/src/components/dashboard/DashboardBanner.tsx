"use client";

import { AIBanner } from "@/components/ui/AIBanner";

export default function DashboardBanner() {
  return (
    <AIBanner
      title="AI Generated Dashboard Insights"
      description="Based in your current compliance posture, AssureGraph AI predicts you'll reach 85% readiness by Jun 15th if current progress continues."
      confidence="95% Confident"
      primaryActionLabel="View Prediction Details"
      expandedContent="This analysis is based on historical patterns, current audit progress, and compliance benchmarks across your organization's frameworks."
    />
  );
}
