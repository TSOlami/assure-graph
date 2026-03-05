"use client";

import { useState } from "react";
import { Framework } from "@/data/frameworks";

interface FrameworkDetailsModalProps {
  framework: Framework;
  onClose: () => void;
}

export default function FrameworkDetailsModal({
  framework,
  onClose,
}: FrameworkDetailsModalProps) {
  const [opportunityDismissed, setOpportunityDismissed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-0-5 to-pink-50 border-b border-brand-1 px-6 pt-5 pb-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-slate-900">
                {framework.name}
              </h2>
              <span className="px-2.5 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                {framework.completionPercent}% Complete
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* AI Auto-Mapping section */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                <path d="M9 1.5L10.5 5.5L14.5 7L10.5 8.5L9 12.5L7.5 8.5L3.5 7L7.5 5.5L9 1.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                <path d="M14 10L14.75 11.75L16.5 12.5L14.75 13.25L14 15L13.25 13.25L11.5 12.5L13.25 11.75L14 10Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-semibold text-purple-700">
                AI Auto-Mapping
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">
                  {framework.aiMapped}
                </div>
                <div className="text-[10px] text-purple-500">Auto-mapped</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">
                  {framework.controlsMapped}
                </div>
                <div className="text-[10px] text-purple-500">
                  Controls Mapped
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">
                  {framework.aiConfidence}%
                </div>
                <div className="text-[10px] text-purple-500">Confidence</div>
              </div>
            </div>

            {!opportunityDismissed && (
              <div className="bg-white border border-blue-100 rounded-lg p-3.5">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                        <path d="M7 1L8.5 4.5L12 5.5L8.5 7L7 10.5L5.5 7L2 5.5L5.5 4.5L7 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        Mapping Opportunity
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-medium text-green-700 bg-green-100 rounded-full">
                        87% Confident
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpportunityDismissed(true)}
                    className="p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed ml-9 mb-2">
                  AssureGraph AI suggests 12 additional requirements in{" "}
                  {framework.name} could be satisfied with existing evidence.
                </p>
                <button className="text-xs font-medium text-brand-5 hover:text-brand-6 transition-colors ml-9">
                  Review Suggestions
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-4 gap-3 mb-5">
            <div className="border border-slate-200 rounded-xl px-3 py-3 text-center">
              <div className="text-lg font-bold text-slate-900">
                {framework.completedRequirements}
              </div>
              <div className="text-[10px] text-slate-500">Completed</div>
            </div>
            <div className="border border-slate-200 rounded-xl px-3 py-3 text-center">
              <div className="text-lg font-bold text-slate-900">
                {framework.totalRequirements}
              </div>
              <div className="text-[10px] text-slate-500">Total</div>
            </div>
            <div className="border border-slate-200 rounded-xl px-3 py-3 text-center">
              <div className="text-lg font-bold text-slate-900">
                {framework.sharedRequirements}
              </div>
              <div className="text-[10px] text-slate-500">Shared</div>
            </div>
            <div className="border border-slate-200 rounded-xl px-3 py-3 text-center">
              <div className="text-lg font-bold text-slate-900">
                {framework.reuseRate}%
              </div>
              <div className="text-[10px] text-slate-500">Reuse Rate</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-5 rounded-lg hover:bg-brand-6 transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="5" height="5" rx="1" stroke="white" strokeWidth="1.3" />
                <rect x="11" y="3" width="5" height="5" rx="1" stroke="white" strokeWidth="1.3" />
                <rect x="2" y="10" width="5" height="5" rx="1" stroke="white" strokeWidth="1.3" />
                <rect x="11" y="10" width="5" height="5" rx="1" stroke="white" strokeWidth="1.3" />
              </svg>
              View Controls
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5H15V13.5C15 14.33 14.33 15 13.5 15H4.5C3.67 15 3 14.33 3 13.5V4.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M3 4.5L6 2.5H12L15 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              View Evidence
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
