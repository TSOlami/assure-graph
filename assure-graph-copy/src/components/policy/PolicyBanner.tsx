"use client";

import { useState } from "react";

export default function PolicyBanner() {
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
      <div className="flex-1 flex flex-col gap-2 max-w-4xl">
        {/* Title Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <i
            style={{ color: "#0078E0" }}
            className="lni lni-bulb bg-blue-200 rounded-sm p-2.5"
          ></i>
          <span className="text-sm font-medium text-slate-900">
            AI Policy Generation Available
          </span>
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-brand-5 bg-white border border-brand-2 rounded-lg">
            97% Confident
          </span>
        </div>

        {/* Description */}
        <p className="text-sm pl-11 text-slate-700 leading-relaxed">
          Based on your industry (Technology) and subscribed frameworks (ISO
          27001, SOC 2), AssureGraph AI can generate a comprehensive Incident
          Response Policy.
        </p>

        {/* CTA Buttons */}
        <div className="flex pl-11 items-center gap-3 flex-wrap mt-1">
          <button className="text-sm font-medium text-brand-5 hover:text-brand-6 transition-colors">
            Generate Now
          </button>
        </div>
      </div>
    </div>
  );
}
