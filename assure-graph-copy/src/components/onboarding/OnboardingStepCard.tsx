import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface OnboardingStepCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  showBack?: boolean;
  isLastStep?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
}

export function OnboardingStepCard({
  icon,
  title,
  description,
  children,
  className,
  showBack = false,
  isLastStep = false,
  onBack,
  onNext,
  nextLabel,
  ...props
}: OnboardingStepCardProps) {
  const resolvedNextLabel = nextLabel ?? (isLastStep ? "Finish" : "Next");

  return (
    <section
      className={cn(
        "flex w-full max-w-[640px] flex-col rounded-2xl bg-white p-8 shadow-[0_8px_40px_-10px_rgba(0,0,0,0.08)]",
        className,
      )}
      {...props}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {icon && <span aria-hidden="true">{icon}</span>}
          <h2 className="text-[18px] font-medium text-[#1C2024]">
            {title}
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-[#60646C]">
          {description}
        </p>
      </div>

      <div className="mt-6 flex-1 space-y-4">{children}</div>

      <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4">
        {showBack ? (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="min-w-[120px] border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50"
          >
            <i className="lni lni-arrow-left text-sm" aria-hidden="true" />
            <span>Back</span>
          </Button>
        ) : (
          <div />
        )}

        <Button
          type="button"
          onClick={onNext}
          className="min-w-[120px] bg-brand-5 text-white hover:bg-brand-4"
        >
          <span>{resolvedNextLabel}</span>
          {!isLastStep && (
            <i
              className="lni lni-arrow-right text-sm"
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </section>
  );
}

