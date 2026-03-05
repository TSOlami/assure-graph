"use client";

import { EVIDENCE_REUSE } from "@/data/frameworks";

export default function EvidenceReuseChart() {
  const circumference = 2 * Math.PI * 60;
  const reusedOffset = circumference * (1 - EVIDENCE_REUSE.reused / 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex-1">
      <h3 className="text-sm font-semibold text-slate-900 mb-1">
        Cross-Framework Evidence Reuse
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        See how evidence collected for one framework automatically satisfies
        requirements in others.
      </p>

      <div className="flex items-center justify-center gap-8">
        <div className="relative w-44 h-44">
          <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="16"
            />
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="#22c55e"
              strokeWidth="16"
              strokeDasharray={circumference}
              strokeDashoffset={reusedOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">
              {EVIDENCE_REUSE.reused}%
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div>
              <span className="text-sm text-slate-600">Reused Evidence</span>
              <div className="text-lg font-bold text-slate-900">
                {EVIDENCE_REUSE.reused}%
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div>
              <span className="text-sm text-slate-600">
                New Evidence Required
              </span>
              <div className="text-lg font-bold text-slate-900">
                {EVIDENCE_REUSE.newRequired}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
