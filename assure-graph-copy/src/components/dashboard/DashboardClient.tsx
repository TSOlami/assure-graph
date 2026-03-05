import React from "react";
import StepCard from "@/components/get-started/StepCard";
import { mockSteps } from "@/data/mockdata";
import DashboardBanner from "./DashboardBanner";
import { DashboardMetrics } from "./DashboardMetrics";
import { AIVisualizations } from "./AIVisualizations";
import { AuditReadiness } from "./AuditReadiness";
import { AIRecommendations } from "./AIRecommendations";
import { UpcomingDeadlines } from "./UpcomingDeadlines";
import { RecentActivity } from "./RecentActivity";


export default function DashboardClient() {
  const completedSteps = mockSteps.filter(
    (step) => step.status === "completed",
  ).length;
  const totalSteps = mockSteps.length;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-600">
            Real-time compliance intelligence and insights.
          </p>
        </div>
      </div>

      {/* Completion Status */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="w-full bg-brand-0-5 rounded-full h-2">
          <div
            className="bg-brand-5 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      <div className="">
        <DashboardBanner />
      </div>
      <div className="">
        <DashboardMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        {/* Left */}
        <div className="space-y-4">
          <AIVisualizations />
          <AuditReadiness />
        </div>
        {/* Right */}
        <div className="space-y-4">
          <AIRecommendations />
          <UpcomingDeadlines />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
