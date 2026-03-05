"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface AIPrioritizedTask {
  rank: number;
  title: string;
  subtitle: string;
  score: number;
}

export interface AIPrioritizerModalProps {
  open: boolean;
  onClose: () => void;
  onApply?: (tasks: AIPrioritizedTask[]) => void;
}

const AI_TASKS: AIPrioritizedTask[] = [
  {
    rank: 1,
    title: "Review MFA configuration evidence",
    subtitle: "Critical for upcoming SOC 2 audit in 5 days",
    score: 95,
  },
  {
    rank: 2,
    title: "Document exception for legacy system",
    subtitle: "Exception expired 3 days ago – immediate action required",
    score: 92,
  },
  {
    rank: 3,
    title: "Review MFA configuration evidence",
    subtitle: "Critical for upcoming SOC 2 audit in 5 days",
    score: 67,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 90) return "#ef4444";
  if (score >= 70) return "#f97316";
  return "#22c55e";
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AIPrioritizerModal({ open, onClose, onApply }: AIPrioritizerModalProps) {
  const [infoDismissed, setInfoDismissed] = useState(false);
  const [showMore, setShowMore]           = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[360px] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3.5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z"
                stroke="#374151" strokeWidth="1.2" strokeLinejoin="round"
              />
              <path
                d="M12.5 10L13.25 11.75L15 12.5L13.25 13.25L12.5 15L11.75 13.25L10 12.5L11.75 11.75L12.5 10Z"
                stroke="#374151" strokeWidth="1" strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-sm font-semibold text-gray-900">AI Prioritizer</h2>
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className="lni lni-close text-sm" style={{ color: "#6b7280" }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

          {/* Info banner */}
          {!infoDismissed && (
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-3.5 flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <i className="lni lni-information text-sm" style={{ color: "#3b82f6" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 mb-0.5">
                  How AI Prioritization Works
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  AssureGraph AI analyzes audit schedules, control criticality, risk levels, and evidence
                  freshness to prioritize tasks automatically.
                </p>
                {showMore && (
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    Tasks are ranked using a composite score that weighs upcoming deadlines,
                    regulatory impact, and historical exception patterns.
                  </p>
                )}
                <button
                  onClick={() => setShowMore((v) => !v)}
                  className="mt-1.5 text-xs font-medium text-blue-600 flex items-center gap-1 hover:text-blue-700 transition-colors"
                >
                  {showMore ? "Show less" : "Show more"}
                  <i
                    className={cn("lni lni-chevron-down text-xs transition-transform", showMore ? "rotate-180" : "")}
                    style={{ color: "#3b82f6" }}
                  />
                </button>
              </div>
              <button
                onClick={() => setInfoDismissed(true)}
                className="shrink-0 h-5 w-5 flex items-center justify-center rounded hover:bg-blue-100 transition-colors"
              >
                <i className="lni lni-close text-xs" style={{ color: "#9ca3af" }} />
              </button>
            </div>
          )}

          {/* Prioritized task list */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-3">AI Prioritized Tasks</p>
            <div className="space-y-2.5">
              {AI_TASKS.map((t) => (
                <div
                  key={t.rank}
                  className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-gray-50 transition-colors"
                >
                  {/* Rank */}
                  <div className="w-6 h-6 rounded-full border border-gray-200 bg-white flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[11px] font-semibold text-gray-600">{t.rank}</span>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 leading-snug">{t.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{t.subtitle}</p>
                  </div>

                  {/* Score */}
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold" style={{ color: scoreColor(t.score) }}>
                      {t.score}%
                    </p>
                    <p className="text-[10px] text-gray-400">AI Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onApply?.(AI_TASKS); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#f05a35" }}
          >
            Apply AI Priorities
          </button>
        </div>
      </div>
    </div>
  );
}