"use client";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PolicyMetric {
  label: string;
  value: number;
  icon?: React.ReactNode;
  highlight?: boolean;
  highlightColor?: string;
}

// ─── Icon components ──────────────────────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.5" />
      <path
        d="M5 8l2 2 4-4"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2L14 13H2L8 2Z"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 6.5V9"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11" r="0.75" fill="#f97316" />
    </svg>
  );
}

function StaleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="4"
        width="12"
        height="9"
        rx="1.5"
        stroke="#9ca3af"
        strokeWidth="1.5"
      />
      <path
        d="M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"
        stroke="#9ca3af"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 8v2M6.5 8h3"
        stroke="#9ca3af"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2L9.2 5.8L13 7L9.2 8.2L8 12L6.8 8.2L3 7L6.8 5.8L8 2Z"
        stroke="#a855f7"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12.5 10.5L13.1 12L14.5 12.5L13.1 13L12.5 14.5L11.9 13L10.5 12.5L11.9 12L12.5 10.5Z"
        stroke="#a855f7"
        strokeWidth="1"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const POLICY_STATS: PolicyMetric[] = [
  {
    label: "Total Policy",
    value: 156,
  },
  {
    label: "Fresh",
    value: 125,
    icon: <CheckCircleIcon />,
  },
  {
    label: "Expiring",
    value: 12,
    icon: <WarningIcon />,
  },
  {
    label: "Staled",
    value: 5,
    icon: <StaleIcon />,
  },
  {
    label: "AI Generated",
    value: 23,
    icon: <SparkleIcon />,
    highlight: true,
    highlightColor: "bg-purple-50 border-purple-200",
  },
];


function MetricCard({ stat }: { stat: PolicyMetric }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between px-4 py-3 rounded-xl border bg-white min-w-0",
        stat.highlight ? stat.highlightColor : "border-gray-200",
      )}
    >
      <p
        className={cn(
          "text-xs font-medium mb-2",
          stat.highlight ? "text-purple-500" : "text-gray-500",
        )}
      >
        {stat.label}
      </p>
      <div className="flex items-center gap-2">
        {stat.icon}
        <span
          className={cn(
            "text-xl font-bold leading-none",
            stat.highlight ? "text-purple-600" : "text-gray-900",
          )}
        >
          {stat.value}
        </span>
      </div>
    </div>
  );
}

export interface PolicyMetricsProps {
  className?: string;
}

export function PolicyMetrics({ className }: PolicyMetricsProps) {
  return (
    <div className={cn("grid grid-cols-5 gap-3 px-6", className)}>
      {POLICY_STATS.map((stat) => (
        <MetricCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
