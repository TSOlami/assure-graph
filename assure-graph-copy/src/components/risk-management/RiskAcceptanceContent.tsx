"use client";

import { useState } from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { XmarkOutlined } from "@lineiconshq/free-icons";

export default function RiskAcceptanceContent() {
  const [alertDismissed, setAlertDismissed] = useState(false);

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Risk Acceptance</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New Acceptance
        </button>
      </div>

      {/* AI Banner */}
      {!alertDismissed && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-600">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.6" fill="currentColor" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-900">
                AI Risk Acceptance Analysis
              </span>
              <span className="text-[10px] font-medium text-green-700 bg-green-100 border border-green-300 rounded px-1.5 py-0.5">
                87% Confident
              </span>
            </div>
            <p className="text-sm text-gray-600">
              AssureGraph AI analyzes your risk tolerance, appetite, and organizational context to provide recommendations on whether risks should be accepted, mitigated, or transferred.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                View AI Recommendation
              </button>
            </div>
          </div>
          <button
            onClick={() => setAlertDismissed(true)}
            className="p-1 text-gray-400 hover:text-gray-600 shrink-0"
          >
            <Lineicons icon={XmarkOutlined} size={16} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
