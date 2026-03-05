"use client";

import { useState } from "react";
import { MAPPING_SUGGESTIONS } from "@/data/evidence";

interface AIEvidenceMappingDrawerProps {
  onClose: () => void;
}

export default function AIEvidenceMappingDrawer({ onClose }: AIEvidenceMappingDrawerProps) {
  const [infoDismissed, setInfoDismissed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[480px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">AI Evidence Mapping</h2>
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
            <div className="bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl px-4 py-4 flex gap-3">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="3" fill="#FCD34D" />
                  <circle cx="9" cy="9" r="6" stroke="#22C55E" strokeWidth="1" fill="none" />
                  <path d="M9 2V4M9 14V16M2 9H4M14 9H16" stroke="#22C55E" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">AI Mapping Opportunities</h3>
                  <span className="text-[10px] font-medium text-green-700 bg-green-100 border border-green-300 rounded px-1.5 py-0.5">
                    89% Confident
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  AssureGraph AI has identified 23 evidence items that could be mapped to additional frameworks, potentially saving 45 hours of manual work.
                </p>
                <button className="text-xs text-brand-5 font-medium mt-2 hover:text-brand-6 transition-colors">
                  Review All
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
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-blue-700">142</p>
              <p className="text-xs text-blue-600">AI Mapped</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-green-700">3.2x</p>
              <p className="text-xs text-green-600">Avg. Reuse</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-orange-700">45h</p>
              <p className="text-xs text-orange-600">Time Saved</p>
            </div>
          </div>

          {/* Mapping suggestions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">AI Mapping Suggestions</h3>
            <div className="flex flex-col gap-3">
              {MAPPING_SUGGESTIONS.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center gap-3">
                  {/* Sparkle icon */}
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L11.5 7.5L17 6L13 10L17 14L11.5 12.5L10 18L8.5 12.5L3 14L7 10L3 6L8.5 7.5L10 2Z" fill="#F59E0B" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Suggested for: {item.framework}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{item.confidence}%</p>
                      <p className="text-[10px] text-gray-500">Confidence</p>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-500">
                        <path d="M5 1.5C5 1.5 3 3 3 6C3 9 5 10.5 5 10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                        <path d="M7 1.5C7 1.5 9 3 9 6C9 9 7 10.5 7 10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                        <path d="M1.5 4.5H10.5M1.5 7.5H10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                      Map
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
            Apply All Suggestions
          </button>
          <button className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Review Individually
          </button>
        </div>
      </div>
    </div>
  );
}
