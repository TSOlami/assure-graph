"use client";

import { useState } from "react";

interface AIBannerProps {
  onViewMappingDetails?: () => void;
}

export default function AIBanner({ onViewMappingDetails }: AIBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [showMore, setShowMore] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#EFF8FF] border border-[#9AD0FF] rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2L7 10L10 18L13 10L10 2Z" stroke="#7c3aed" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M2 10L10 7L18 10L10 13L2 10Z" stroke="#7c3aed" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-slate-900">
                AI Cross-Framework Mapping
              </h3>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full border bg-[#FDEEEB] border-[#F9BDAE] text-[#F05A35]">
                92% Confident
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              AssureGraph AI has identified 584 shared requirements across your
              frameworks. Evidence collected for one framework automatically
              satisfies requirements in others.
            </p>
            {showMore && (
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                This cross-framework mapping reduces duplicate evidence
                collection by 78% and saves an estimated 201 hours of
                compliance work per quarter.
              </p>
            )}
            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={onViewMappingDetails}
                className="text-sm font-medium text-brand-5 hover:text-brand-6 transition-colors"
              >
                View Mapping Details
              </button>
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                {showMore ? "Show less" : "Show more"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform ${showMore ? "rotate-180" : ""}`}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-400 hover:text-slate-600 transition-colors shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
