"use client";

import { useState } from "react";

export default function AIBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative flex items-start gap-4 px-4 py-3 bg-[#EFF8FF] border border-[#9AD0FF] rounded-lg">
      {/* Close Button */}
        <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 p-1 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-blue-100 transition-colors"
        aria-label="Dismiss"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L4 12M4 4L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 pr-6">
        {/* Title Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-slate-900">
            AI Auto Mapping Active
          </span>
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-brand-5 bg-white border border-brand-2 rounded-lg">
            92% Confident
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-700 leading-relaxed">
          AssureGraph AI has automatically mapped 52 controls across your
          connected integrations with 92% average confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2 flex-wrap mt-1">
          <button className="text-sm font-medium text-brand-5 hover:text-brand-6 transition-colors">
            View Prediction Details
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm font-medium text-slate-800 hover:text-slate-900 transition-colors"
          >
            {expanded ? "Show less" : "Show more"}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
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
  );
}
