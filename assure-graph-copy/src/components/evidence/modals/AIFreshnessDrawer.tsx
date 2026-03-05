"use client";

import { useState } from "react";
import { FRESHNESS_ITEMS } from "@/data/evidence";

interface AIFreshnessDrawerProps {
  onClose: () => void;
}

export default function AIFreshnessDrawer({ onClose }: AIFreshnessDrawerProps) {
  const [infoDismissed, setInfoDismissed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[480px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">AI Freshness Management</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Info banner */}
          {!infoDismissed && (
            <div className="bg-linear-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-xl px-4 py-4 flex gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-blue-600">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M9 5.5V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M9 8v4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">How AI Predicts Freshness</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  AssureGraph AI analyzes audit schedules, framework requirements, evidence history, and control criticality to predict when evidence will expire and prioritize refresh activities.
                </p>
                <button className="text-xs text-gray-700 font-medium mt-2 flex items-center gap-1 hover:text-gray-900 transition-colors">
                  Show more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => setInfoDismissed(true)}
                className="p-1 text-gray-400 hover:text-gray-600 shrink-0 self-start"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-green-700">125</p>
              <p className="text-xs text-green-600">Fresh</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-amber-700">12</p>
              <p className="text-xs text-amber-600">Expiring</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-red-700">5</p>
              <p className="text-xs text-red-600">Stale</p>
            </div>
          </div>

          {/* Evidence requiring attention */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Evidence Requiring Attention</h3>
            <div className="flex flex-col gap-3">
              {FRESHNESS_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center gap-3">
                  {/* PDF icon */}
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                      <path d="M0 2C0 0.9 0.9 0 2 0H12L20 8V22C20 23.1 19.1 24 18 24H2C0.9 24 0 23.1 0 22V2Z" fill="#E5E7EB" />
                      <path d="M12 0L20 8H14C12.9 8 12 7.1 12 6V0Z" fill="#D1D5DB" />
                      <text x="3" y="18" fill="#6B7280" fontSize="6" fontWeight="600" fontFamily="sans-serif">.PDF</text>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Last verified: {item.lastVerified}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${item.status === "Stale" ? "text-red-600" : "text-amber-600"}`}>
                      {item.status === "Stale" ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 2H10V7L6 10L2 7V2Z" stroke="currentColor" strokeWidth="1" fill="none" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1L11 10.5H1L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                        </svg>
                      )}
                      {item.status}
                    </span>
                    <button className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1.5 6C1.5 3.5 3.5 1.5 6 1.5S10.5 3.5 10.5 6 8.5 10.5 6 10.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M1.5 6C1.5 8.5 3.5 10.5 6 10.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
                      </svg>
                      Refresh
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-5 text-white text-sm font-semibold rounded-xl hover:bg-brand-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 4M3 8L7 12M3 8H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Auto-Refresh All
          </button>
          <button className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Schedule Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
