import * as React from "react";

import { cn } from "@/lib/utils";

export type TimelineStep = {
  id: string;
  index: number;
  title: string;
  description: string;
};

export interface OnboardingTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStep[];
  activeStepIndex: number;
}

export function OnboardingTimeline({
  steps,
  activeStepIndex,
  className,
  ...props
}: OnboardingTimelineProps) {
  return (
    <aside
      className={cn(
        "pt-2",
        className,
      )}
      {...props}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-[24px] font-semibold text-neutral-900">
            Welcome Onboard!
          </h2>
          <p className="text-base leading-relaxed text-neutral-600">
            Please complete your onboarding in 4 steps to enjoy all the features
            available to your company.
          </p>
        </div>

        <ol className="mt-4 space-y-4">
          {steps.map((step, index) => {
            const isActive = index === activeStepIndex;
            const isCompleted = index < activeStepIndex;

            return (
              <li key={step.id} className="relative flex gap-3">
                {/* Vertical connector */}
                {index !== steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-6 h-full w-px bg-neutral-200"
                  />
                )}

                <div className="relative z-10 mt-0.5">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium",
                      isActive || isCompleted
                        ? "border-brand-5 bg-brand-5 text-white"
                        : "border-neutral-300 bg-neutral-50 text-neutral-700",
                    )}
                  >
                    {isCompleted ? "✓" : step.index}
                  </div>
                </div>

                <div className="space-y-1">
                  <p
                    className={cn(
                      "text-[15px] font-medium",
                      isActive
                        ? "text-neutral-900"
                        : "text-neutral-700",
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-500">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}

