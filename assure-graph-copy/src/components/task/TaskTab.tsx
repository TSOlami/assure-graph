"use client";

import { cn } from "@/lib/utils";

export type Tabs =
  | "All Task"
  | "To-Do"
  | "In-Progress"
  | "Completed"
  | "Overdue";

interface TaskTabsProps {
  activeTab: Tabs;
  onTabChange: (tab: Tabs) => void;
  counts?: Partial<Record<Tabs, number>>;
}

const tabs: Tabs[] = [
  "All Task",
  "To-Do",
  "In-Progress",
  "Completed",
  "Overdue",
];

export function TaskTab({ activeTab, onTabChange, counts }: TaskTabsProps) {
  return (
    <div className="flex items-center gap-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "relative px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
            "focus:outline-none",
            activeTab === tab
              ? "text-brand-5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-5 after:rounded-t-full"
              : "text-gray-500 hover:text-gray-700",
          )}
        >
          {tab}
          {counts?.[tab] !== undefined && (
            <span
              className={cn(
                "ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded-full",
                activeTab === tab
                  ? "bg-brand-1 text-brand-5"
                  : "bg-gray-100 text-gray-500",
              )}
            >
              {counts[tab]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
