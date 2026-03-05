"use client";

import { ReactNode } from "react";
import clsx from "clsx";

export interface StatCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  variant?: "default" | "accent" | "dark";
  accentColor?: "green" | "blue" | "amber" | "red";
  className?: string;
}

const accentStyles = {
  green: "bg-green-50 border-green-200 text-green-700 [&_.stat-label]:text-green-600",
  blue: "bg-blue-50 border-blue-200 text-blue-700 [&_.stat-label]:text-blue-600",
  amber: "bg-amber-50 border-amber-200 text-amber-700 [&_.stat-label]:text-amber-600",
  red: "bg-red-50 border-red-200 text-red-700 [&_.stat-label]:text-red-600",
};

export function StatCard({
  value,
  label,
  icon,
  variant = "default",
  accentColor = "green",
  className,
}: StatCardProps) {
  const isAccent = variant === "accent";
  const isDark = variant === "dark";
  return (
    <div
      className={clsx(
        "rounded-xl border px-4 py-3.5 flex flex-col gap-1",
        isDark
          ? "bg-gray-900 border-gray-800"
          : isAccent
            ? accentStyles[accentColor]
            : "bg-white border-gray-200",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className={clsx("text-2xl font-bold", isDark ? "text-white" : isAccent ? "" : "text-gray-900")}>{value}</span>
      </div>
      <p className={clsx("text-xs stat-label", isDark ? "text-gray-400" : isAccent ? "" : "text-gray-500")}>
        {label}
      </p>
    </div>
  );
}
