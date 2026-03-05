import React from "react";
import StepCard from "@/components/get-started/StepCard";
import { mockSteps } from "@/data/mockdata";

export default function GetStarted() {
  const completedSteps = mockSteps.filter(
    (step) => step.status === "completed",
  ).length;
  const totalSteps = mockSteps.length;
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Get Started</h1>
        <p className="text-sm text-gray-600">
          Let's help you stay on the path of compliance. Get started by
          completing these steps.
        </p>
      </div>

      {/* Completion Status */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="w-232.5 bg-brand-0-5 rounded-full h-2">
          <div
            className="bg-brand-5 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          {/* <span className="text-sm font-medium text-gray-700">
            {completedSteps} of {totalSteps} completed
          </span> */}
          <span className="text-sm text-gray-900">
            {completionPercentage}% completed
          </span>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSteps.map((step, index) => (
          <StepCard key={step.id} step={step} stepNumber={index + 1} />
        ))}
      </div>
    </div>
  );
}
