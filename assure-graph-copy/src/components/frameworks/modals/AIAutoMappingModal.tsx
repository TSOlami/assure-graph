"use client";

import { useState } from "react";
import {
  MAPPING_SUGGESTIONS,
  CROSS_FRAMEWORK_STATS,
  MappingSuggestion,
} from "@/data/frameworks";

interface AIAutoMappingModalProps {
  onClose: () => void;
}

function SuggestionCard({ suggestion }: { suggestion: MappingSuggestion }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
              <path d="M9 1.5L10.5 5.5L14.5 7L10.5 8.5L9 12.5L7.5 8.5L3.5 7L7.5 5.5L9 1.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              <path d="M14 10L14.75 11.75L16.5 12.5L14.75 13.25L14 15L13.25 13.25L11.5 12.5L13.25 11.75L14 10Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-sm font-semibold text-slate-900">
                {suggestion.code} - {suggestion.title}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded">
                {suggestion.frameworkBadge}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-1.5">
              Suggested evidence: {suggestion.suggestedEvidence}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                  <path d="M7 1L8.5 4.5L12 5.5L8.5 7L7 10.5L5.5 7L2 5.5L5.5 4.5L7 1Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-medium text-purple-600">
                  {suggestion.confidence}% Confidence
                </span>
              </div>
              {suggestion.autoApply && (
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs font-medium text-green-600">
                    Auto-apply available
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0 ml-3">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-500">
            <path d="M7 2.33V5.25M7 2.33L5.25 4.08M7 2.33L8.75 4.08" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.33 8.75H4.08M2.33 8.75L4.08 7M2.33 8.75L4.08 10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.67 8.75H9.92M11.67 8.75L9.92 7M11.67 8.75L9.92 10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Map
        </button>
      </div>
    </div>
  );
}

export default function AIAutoMappingModal({ onClose }: AIAutoMappingModalProps) {
  const [infoDismissed, setInfoDismissed] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col overflow-hidden animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">
            AI Framework Auto-Mapping
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!infoDismissed && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 mb-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="8" cy="10.5" r="0.5" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    How AI Mapping Works
                  </span>
                </div>
                <button
                  onClick={() => setInfoDismissed(true)}
                  className="p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed ml-10">
                AssureGraph AI analyzes your evidence and automatically maps it
                to framework requirements based on semantic matching, control
                descriptions, and historical patterns.
              </p>
              {showMore && (
                <p className="text-xs text-slate-600 leading-relaxed ml-10 mt-2">
                  The AI engine continuously learns from your mapping decisions
                  to improve future suggestions and increase confidence scores
                  over time.
                </p>
              )}
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors ml-10 mt-2"
              >
                {showMore ? "Show less" : "Show more"}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`transition-transform ${showMore ? "rotate-180" : ""}`}
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}

          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            AI Mapping Suggestions
          </h3>

          <div className="flex flex-col gap-3">
            {MAPPING_SUGGESTIONS.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200">
          <div className="bg-purple-50 px-6 py-4">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                <path d="M9 1C5.13 1 2 4.13 2 8C2 11.87 5.13 15 9 15C10.93 15 12.68 14.22 13.95 12.95L16 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8C12 6 10.5 4.5 9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-semibold text-purple-700">
                Cross-Framework Benefits
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">
                  {CROSS_FRAMEWORK_STATS.sharedRequirements}
                </div>
                <div className="text-[10px] text-purple-500">
                  Shared Requirements
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">
                  {CROSS_FRAMEWORK_STATS.evidenceReuse}%
                </div>
                <div className="text-[10px] text-purple-500">
                  Evidence Reuse
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-700">
                  {CROSS_FRAMEWORK_STATS.hoursSaved}
                </div>
                <div className="text-[10px] text-purple-500">Hours Saved</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-4 bg-white">
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-5 rounded-lg hover:bg-brand-6 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8.5L6 11.5L13 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Apply All Suggestions
            </button>
            <button className="flex-1 px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              Review Individually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
