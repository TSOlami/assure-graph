"use client";

import { useState } from "react";
import clsx from "clsx";

export interface AIBannerProps {
  /** Banner title */
  title: string;
  /** Description text (omit when using children for custom content) */
  description?: string;
  /** Custom content (e.g. for modals) - renders instead of description when provided */
  children?: React.ReactNode;
  /** Optional confidence badge, e.g. "95% Confident" */
  confidence?: string;
  /** Primary CTA label, e.g. "View Prediction Details" */
  primaryActionLabel?: string;
  /** Primary CTA click handler */
  onPrimaryAction?: () => void;
  /** Show expand/collapse for secondary content */
  showMoreLabel?: string;
  showLessLabel?: string;
  /** Optional expanded content when "Show more" is clicked */
  expandedContent?: React.ReactNode;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Whether to show dismiss button (default: true when onDismiss provided) */
  dismissible?: boolean;
  /** Visual variant - info (Dashboard blue) is the main design */
  variant?: "info" | "warning" | "error";
  /** Additional className for the root */
  className?: string;
}

const variantStyles = {
  info: {
    container: "bg-[#EFF8FF] border-[#9AD0FF]",
    iconBg: "bg-blue-200",
    iconColor: "#0078E0",
    badge: "text-brand-5 bg-white border-brand-2",
    primaryAction: "text-brand-5 hover:text-brand-6",
  },
  warning: {
    container: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "#D97706",
    badge: "text-amber-700 bg-amber-100 border-amber-300",
    primaryAction: "text-amber-700 hover:text-amber-800",
  },
  error: {
    container: "bg-red-50 border-red-200",
    iconBg: "bg-red-100",
    iconColor: "#DC2626",
    badge: "text-red-700 bg-red-100 border-red-300",
    primaryAction: "text-red-600 hover:text-red-700",
  },
};

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.6" fill="currentColor" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1.5L1.5 14H14.5L8 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="11.25" r="0.6" fill="currentColor" />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 6v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.6" fill="currentColor" />
    </svg>
  );
}

function BulbIcon({ className }: { className?: string }) {
  return (
    <i style={{ color: "#0078E0" }} className={clsx("lni lni-bulb", className)} />
  );
}

export function AIBanner({
  title,
  description,
  children,
  confidence,
  primaryActionLabel,
  onPrimaryAction,
  showMoreLabel,
  showLessLabel = "Show less",
  expandedContent,
  onDismiss,
  dismissible = true,
  variant = "info",
  className,
}: AIBannerProps) {
  const hasCustomContent = !!children;
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  if (dismissed) return null;

  const styles = variantStyles[variant];

  return (
    <div
      className={clsx(
        "relative flex items-start gap-4 px-4 py-3 sm:px-5 sm:py-4 border rounded-xl",
        styles.container,
        className
      )}
    >
      {/* Icon */}
      <div className={clsx("w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5", styles.iconBg)}>
        {variant === "info" ? (
          <BulbIcon className="text-xl" />
        ) : variant === "warning" ? (
          <WarningIcon className="text-amber-600" />
        ) : (
          <ErrorIcon className="text-red-600" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-2 pr-6">
        {/* Title + Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900">{title}</span>
          {confidence && (
            <span className={clsx("inline-flex items-center px-2 py-0.5 text-xs font-medium border rounded-lg", styles.badge)}>
              {confidence}
            </span>
          )}
        </div>

        {/* Description or custom content */}
        {hasCustomContent ? (
          <div className="text-sm text-gray-600">{children}</div>
        ) : (
          description && <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        )}

        {/* Expanded content */}
        {!hasCustomContent && expanded && expandedContent && (
          <div className="text-sm text-gray-600 leading-relaxed">{expandedContent}</div>
        )}

        {/* CTA Buttons */}
        {(primaryActionLabel || (expandedContent && !hasCustomContent)) && (
        <div className="flex items-center gap-4 flex-wrap mt-1">
          {primaryActionLabel && (
            <button
              onClick={onPrimaryAction}
              className={clsx("text-sm font-medium transition-colors", styles.primaryAction)}
            >
              {primaryActionLabel}
            </button>
          )}
          {!hasCustomContent && expandedContent && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              {expanded ? showLessLabel : showMoreLabel || "Show more"}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={clsx("transition-transform", expanded && "rotate-180")}
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
        )}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-black/5 transition-colors shrink-0"
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
