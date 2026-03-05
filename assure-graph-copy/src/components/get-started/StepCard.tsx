"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Step } from "@/data/mockdata";
import clsx from "clsx";

interface StepCardProps {
  step: Step;
  stepNumber: number;
}

// Icon mapping for each step
const getStepIcon = (stepNumber: number): string => {
  const iconMap: { [key: number]: string } = {
    1: "lni-user", // Onboarding
    2: "lni-bolt", // Integrate apps
    3: "lni-users", // Add Policy document & Personnel
    4: "lni-check-box", // Assign controls
    5: "lni-user-check", // Personnel Onboarding
  };
  return iconMap[stepNumber] || "lni-circle";
};

export default function StepCard({ step, stepNumber }: StepCardProps) {
  const hasActions = step.actions && step.actions.length > 0;

  return (
    <Card className="relative shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="">
        {/* Step number and status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 uppercase">
              STEP {stepNumber}:
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Status indicators */}
            {step.status === "completed" && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded">
                <i className="lni lni-checkmark-circle text-green-500 text-base"></i>
                <span className="text-xs font-semibold text-green-600">
                  {step.progress}/{step.progress}
                </span>
              </div>
            )}
            {step.status === "in-progress" && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
                <i className="lni lni-circle text-gray-400 text-base"></i>
                <span className="text-xs font-semibold text-gray-600">
                  {step.actions?.filter((a) => a.completed).length || 0}/
                  {step.actions?.length || 0}
                </span>
              </div>
            )}
            {step.status === "not-started" && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
                <i className="lni lni-circle text-gray-400 text-base"></i>
                <span className="text-xs font-semibold text-gray-500">0/1</span>
              </div>
            )}

            {/* Expand/collapse button */}
            {hasActions && (
              <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                <i className="lni lni-chevron-down text-gray-400 text-sm"></i>
              </button>
            )}
          </div>
        </div>

        {/* Title with icon */}
        <div className="flex items-center gap-3">
          <i
            className={clsx(
              "lni",
              getStepIcon(stepNumber),
              "text-gray-700 text-xl",
            )}
          ></i>
          <CardTitle className="text-base font-semibold text-gray-900">
            {step.title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {/* Description */}
        <CardDescription className="text-sm text-gray-600">
          {step.description}
        </CardDescription>

        {/* Completed badge */}
        {step.status === "completed" && step.completionText && (
          <div className="inline-flex px-3 py-1.5 bg-green-50 border border-green-200 rounded-md">
            <span className="text-xs font-semibold text-green-600">
              {step.completionText}
            </span>
          </div>
        )}

        {/* Start Here link */}
        {step.link && (
          <Link
            href={step.link.url}
            className="inline-flex items-center text-sm font-medium text-brand-5 hover:text-brand-6 transition-colors"
          >
            {step.link.text}
            <i className="lni lni-arrow-right ml-1"></i>
          </Link>
        )}

        {/* Stepper for actions */}
        {hasActions && (
          <div className="relative pt-2">
            {step.actions!.map((action, index) => {
              const isLast = index === step.actions!.length - 1;

              return (
                <div
                  key={action.id}
                  className="relative flex gap-3 pb-6 last:pb-0"
                >
                  {/* Vertical line connecting circles */}
                  {!isLast && (
                    <div className="absolute left-2.75 top-6 bottom-0 w-px bg-gray-200"></div>
                  )}

                  {/* Numbered circle */}
                  <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-300 bg-white shrink-0 mt-0.5">
                    {action.completed ? (
                      <i className="lni lni-checkmark text-green-600 text-xs font-bold"></i>
                    ) : (
                      <span className="text-xs font-medium text-gray-500">
                        {action.id}
                      </span>
                    )}
                  </div>

                  {/* Action content */}
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {action.label}
                    </div>
                    {action.description && (
                      <div className="text-xs text-gray-500 leading-relaxed">
                        {action.description}
                      </div>
                    )}

                    {/* Action button (if you want to add one) */}
                    {action.label.toLowerCase().includes("add") && (
                      <button className="mt-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        {action.label}
                      </button>
                    )}
                  </div>

                  {/* Radio button on the right */}
                  <div className="shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
