"use client";

import { useState } from "react";
import clsx from "clsx";
import { EvidenceItem, FRESHNESS_STYLES } from "@/data/evidence";

interface EvidenceDetailsDrawerProps {
  evidence: EvidenceItem;
  onClose: () => void;
}

type TabKey = "traceability" | "aiMapping" | "history";

export default function EvidenceDetailsDrawer({ evidence, onClose }: EvidenceDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("traceability");
  const freshnessStyle = FRESHNESS_STYLES[evidence.freshness];

  const tabs: { key: TabKey; label: string }[] = [
    { key: "traceability", label: "Traceability" },
    { key: "aiMapping", label: "AI Mapping" },
    { key: "history", label: "History" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[480px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-900">Evidence</span>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-500">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="8" cy="8" r="2" fill="currentColor" />
              </svg>
              Preview
            </button>
            <button className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4H12V13C12 13.6 11.6 14 11 14H5C4.4 14 4 13.6 4 13V4Z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2.5 4H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M6 2H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M7 7V11M9 7V11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Delete
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Document name */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{evidence.documentName}</h3>
            <div className="flex items-center gap-2">
              <span className={clsx("inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full", freshnessStyle.bg, freshnessStyle.text)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                  <path d="M3.5 6L5.2 7.7L8.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {evidence.freshness}
              </span>
              <span className="text-xs font-medium text-purple-600">{evidence.collectionType}</span>
            </div>
          </div>

          {/* AI Data Quality */}
          <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L9.5 5.5L14 4L11.5 8L14 12L9.5 10.5L8 15L6.5 10.5L2 12L4.5 8L2 4L6.5 5.5L8 1Z" fill="#A855F7" />
              </svg>
              <span className="text-sm font-medium text-purple-700">AI Data Quality</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-purple-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: `${evidence.aiQuality + 7}%` }} />
              </div>
              <span className="text-sm font-semibold text-purple-700">{evidence.aiQuality + 7}%</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={clsx(
                    "pb-2.5 text-sm font-medium border-b-2 transition-colors",
                    activeTab === tab.key
                      ? "text-brand-5 border-brand-5"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          {activeTab === "traceability" && (
            <div className="flex flex-col gap-5">
              {/* Traceability chain */}
              <div className="flex items-center gap-3">
                <div className="border border-blue-200 bg-blue-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-blue-700 font-medium">{evidence.documentName}</p>
                </div>
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="text-gray-400 shrink-0">
                  <path d="M1 8H16M16 8L12 4M16 8L12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="border border-gray-200 rounded-lg px-3 py-2">
                  <p className="text-lg font-bold text-gray-900">{evidence.relatedControls?.length || 2}</p>
                  <p className="text-xs text-gray-500">Controls</p>
                </div>
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="text-gray-400 shrink-0">
                  <path d="M1 8H16M16 8L12 4M16 8L12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="border border-gray-200 rounded-lg px-3 py-2">
                  <p className="text-lg font-bold text-gray-900">{evidence.applicableFrameworks?.length || 4}</p>
                  <p className="text-xs text-gray-500">Frameworks</p>
                </div>
              </div>

              {/* Related Controls */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Related Controls</h4>
                <div className="flex flex-wrap gap-2">
                  {(evidence.relatedControls || ["DCF-49", "DCF-48", "DCF-69"]).map((ctrl) => (
                    <span key={ctrl} className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-1">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1L5 9M1 5H9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                      {ctrl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Satisfies Requirements */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Satisfies Requirements in</h4>
                <div className="flex flex-wrap gap-2">
                  {(evidence.satisfiesRequirements || ["ISO 27001:2022", "SOC 2"]).map((req) => (
                    <span key={req} className="text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded px-2.5 py-1">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Mapping Suggestion Card */}
              <div className="bg-gray-900 rounded-xl px-4 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L9.5 5.5L14 4L11.5 8L14 12L9.5 10.5L8 15L6.5 10.5L2 12L4.5 8L2 4L6.5 5.5L8 1Z" fill="#F59E0B" />
                  </svg>
                  <span className="text-sm font-semibold text-white">AI Mapping Suggestions</span>
                </div>
                <p className="text-xs text-gray-300 mb-2">This evidence could also satisfy requirements in:</p>
                <span className="inline-flex items-center text-xs font-medium text-white bg-gray-700 rounded px-2 py-0.5 mb-2">
                  NIST
                </span>
                <p className="text-xs text-green-400 mb-3">AI Confidence: 91%</p>
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                  Review Suggestion
                </button>
              </div>

              {/* Freshness & Validation History */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Freshness & Validation History</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-500">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Verified {evidence.lastVerified || "2 days ago"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M8 4.5V8.5L10.5 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Auto-refresh daily
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "aiMapping" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-500">AI mapping analysis for this evidence document.</p>
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <p className="text-sm font-medium text-green-700">This evidence is mapped to {evidence.reuse} frameworks</p>
                <p className="text-xs text-green-600 mt-1">AI suggests additional mappings are possible.</p>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 py-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">Evidence verified</p>
                  <p className="text-xs text-gray-400">{evidence.lastVerified || "2 days ago"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">Document uploaded</p>
                  <p className="text-xs text-gray-400">15 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">AI analysis complete</p>
                  <p className="text-xs text-gray-400">15 days ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-5 text-white text-sm font-semibold rounded-xl hover:bg-brand-6 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8C2 4.7 4.7 2 8 2S14 4.7 14 8 11.3 14 8 14" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M2 8C2 11.3 4.7 14 8 14" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2" />
            </svg>
            Refresh Evidence
          </button>
          <button className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Substitute
          </button>
        </div>
      </div>
    </div>
  );
}
