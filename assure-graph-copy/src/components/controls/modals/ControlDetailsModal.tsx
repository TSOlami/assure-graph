"use client";

import type { JSX } from "react";
import { Control } from "@/data/controls";

interface ControlDetailsModalProps {
  control: Control;
  onClose: () => void;
}

function ResultBadge({ result }: { result: string }) {
  const styles: Record<string, string> = {
    Passing: "text-green-600",
    Failing: "text-red-600",
    "Needs attention": "text-amber-600",
  };

  const icons: Record<string, JSX.Element> = {
    Passing: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 7L6 9L10 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Failing: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 5L9 9M9 5L5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    "Needs attention": (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M7 5.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="7" cy="10" r="0.5" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <span className={`inline-flex items-center gap-1 text-sm font-semibold ${styles[result] || "text-gray-600"}`}>
      {icons[result]}
      {result}
    </span>
  );
}

export default function ControlDetailsModal({ control, onClose }: ControlDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Control Details</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Control title */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 leading-snug">
              {control.id}: {control.name}
            </h3>
          </div>

          {/* Status badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <ResultBadge result={control.result} />
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 7h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M7 4v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Applicable
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-700 border border-gray-200 rounded-full px-2.5 py-0.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-500">
                <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.75 2.75l1.5 1.5M9.75 9.75l1.5 1.5M11.25 2.75l-1.5 1.5M4.25 9.75l-1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {control.frequency}
            </span>
          </div>

          {/* AI Explanation */}
          <div className="bg-linear-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl px-4 py-3.5">
            <div className="flex items-center gap-2 mb-1.5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1L10.5 5.5L15 4L12.5 8L17 9L12.5 10L15 14L10.5 12.5L9 17L7.5 12.5L3 14L5.5 10L1 9L5.5 8L3 4L7.5 5.5L9 1Z" fill="url(#ai-grad)" />
                <defs>
                  <linearGradient id="ai-grad" x1="1" y1="1" x2="17" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A855F7" />
                    <stop offset="1" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-semibold text-purple-700">AI Explanation</span>
            </div>
            <p className="text-sm text-gray-600">
              {control.aiInfo || `${control.name} is currently ${control.result.toLowerCase()}.`}
            </p>
          </div>

          {/* Cross-Module Traceability */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Cross-Module Traceability</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-gray-200 rounded-xl px-3 py-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-amber-500">
                    <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M7 5.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="7" cy="10" r="0.5" fill="currentColor" />
                  </svg>
                  <span className="text-xs font-medium text-gray-600">Risks</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{control.risksCount}</p>
                <p className="text-xs text-gray-500 mt-0.5">Linked risks</p>
              </div>
              <div className="border border-gray-200 rounded-xl px-3 py-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-blue-500">
                    <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 4h4M5 6.5h4M5 9h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs font-medium text-gray-600">Policies</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{control.policiesCount}</p>
                <p className="text-xs text-gray-500 mt-0.5">Linked policies</p>
              </div>
              <div className="border border-gray-200 rounded-xl px-3 py-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-green-500">
                    <path d="M2 4h10v7a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 012 11V4z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M4.5 1.5v2.5M9.5 1.5v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs font-medium text-gray-600">Evidence</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500 mt-0.5">Evidence items</p>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-linear-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl px-4 py-3.5">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1L10.5 5.5L15 4L12.5 8L17 9L12.5 10L15 14L10.5 12.5L9 17L7.5 12.5L3 14L5.5 10L1 9L5.5 8L3 4L7.5 5.5L9 1Z" fill="url(#ai-sug)" />
                <defs>
                  <linearGradient id="ai-sug" x1="1" y1="1" x2="17" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F97316" />
                    <stop offset="1" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-semibold text-orange-700">AI Suggestions</span>
            </div>
            <div className="space-y-2">
              {[
                "Schedule evidence refresh for next week",
                "Link to new Data Protection Policy (AI detected match)",
                "Consider increasing frequency to Weekly",
              ].map((suggestion, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-orange-400 mt-0.5 shrink-0">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-orange-700">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button className="px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors">
              Refresh Evidence
            </button>
            <button className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              View Evidence
            </button>
            <button className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              Open Exception
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
