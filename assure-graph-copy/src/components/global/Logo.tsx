import type { HTMLAttributes } from "react";
import { ChevronUp } from "lucide-react";

type LogoVariant = "default" | "dark" | "landing";

type LogoProps = HTMLAttributes<HTMLDivElement> & {
  variant?: LogoVariant;
};

export function Logo({ className = "", variant = "default", ...props }: LogoProps) {
  const isDark = variant === "dark";
  const isLanding = variant === "landing";

  if (isLanding) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 ${className}`}
        aria-label="assuregraph"
        {...props}
      >
        <span className="font-logo text-xl font-medium leading-none tracking-tight text-[#212B36]">
          assuregraph
        </span>
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-5">
          <ChevronUp className="h-3 w-3 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-logo text-xl font-medium leading-none tracking-tight text-[#212B36]">
          /
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="AssureGraph"
      {...props}
    >
      <span
        className={`font-logo text-2xl leading-none tracking-tight ${
          isDark ? "text-white" : "text-brand-5"
        }`}
      >
        AssureGraph
      </span>
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-5">
        <ChevronUp className="h-3 w-3 text-white" strokeWidth={2.5} />
      </div>
    </div>
  );
}

