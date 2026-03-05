import * as React from "react";

import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export type OnboardingHeaderProps = React.HTMLAttributes<HTMLElement>;

export function OnboardingHeader({
  className,
  children,
  ...props
}: OnboardingHeaderProps) {
  return (
    <header
      className={cn(
        "w-full border-b border-neutral-200 bg-white",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between px-10 py-4">
        <Logo />

        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-medium text-neutral-800 md:inline">
            Need help?
          </span>

          <span
            aria-hidden="true"
            className="hidden h-6 w-px bg-neutral-300 md:inline"
          />

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-5 transition-colors hover:text-brand-6"
          >
            <span>Contact us</span>
            <i
              className="lni lni-arrow-up-right text-xs"
              aria-hidden="true"
            />
          </button>

          {children}
        </div>
      </div>
    </header>
  );
}

