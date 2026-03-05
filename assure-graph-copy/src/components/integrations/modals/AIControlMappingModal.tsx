"use client";

import { useState } from "react";
import Image from "next/image";
import { Integration } from "@/data/integrations";

interface MappingEntry {
  integration: Integration;
  controlsMapped: number;
  totalControls: number;
  dataQuality: number;
  aiConfidence: number;
}

interface AIControlMappingModalProps {
  integrations: Integration[];
  onClose: () => void;
}

export default function AIControlMappingModal({ integrations, onClose }: AIControlMappingModalProps) {
  const [infoDismissed, setInfoDismissed] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const connected = integrations.filter((i) => i.status === "connected");

  const mockMappings: MappingEntry[] = connected.map((intg, idx) => ({
    integration: intg,
    controlsMapped: [11, 14, 20, 20][idx % 4],
    totalControls: [12, 15, 23, 23][idx % 4],
    dataQuality: [98, 96, 85, 85][idx % 4],
    aiConfidence: [95, 91, 88, 88][idx % 4],
  }));

  const recommendations = [
    "Connect Azure to auto-map 15+ cloud security controls.",
    "Enable Cloudflare integration for network security evidence.",
    "Fix AWS permission gap to improve mapping",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[540px] mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-base font-semibold text-slate-900">AI Control Mapping</h2>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Info Banner */}
          {!infoDismissed && (
            <div className="flex gap-3 p-4 bg-[#EFF8FF] border border-[#9AD0FF] rounded-xl">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M8 5.5V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  <circle cx="8" cy="10.5" r="0.6" fill="currentColor"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">How AI Mapping Works</p>
                  <button onClick={() => setInfoDismissed(true)} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  AssureGraph AI analyzes your integration data and automatically maps it to relevant controls based on evidence patterns, control descriptions, and framework requirements.
                </p>
                {showMore && (
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    The AI uses semantic matching to identify the most relevant controls for each piece of evidence, achieving high confidence scores across connected integrations.
                  </p>
                )}
                <button onClick={() => setShowMore((v) => !v)} className="flex items-center gap-1 text-sm font-medium text-slate-700 mt-2 hover:text-slate-900">
                  {showMore ? "Show less" : "Show more"}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform ${showMore ? "rotate-180" : ""}`}>
                    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Mapping Summary */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-900">Mapping Summary by Integration</h3>
            {mockMappings.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400">
                No connected integrations yet. Connect an integration to see AI mapping.
              </div>
            ) : (
              <div className="flex flex-col gap-0 border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                {mockMappings.map(({ integration: intg, controlsMapped, totalControls, dataQuality, aiConfidence }) => (
                  <div key={intg.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                      <Image src={intg.logoUrl} alt={intg.name} width={22} height={22} className="object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{intg.name}</p>
                      <p className="text-xs text-slate-500">
                        {controlsMapped}/{totalControls} controls mapped &nbsp;·&nbsp; {dataQuality}% data quality
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-base font-bold text-brand-5">{aiConfidence}%</span>
                      <p className="text-xs text-slate-400">AI confidence</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Recommendations */}
          <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                <path d="M8 1.5L9.5 5L13 6.5L9.5 8L8 11.5L6.5 8L3 6.5L6.5 5L8 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                <path d="M12.5 9.5L13.25 11L14.75 11.75L13.25 12.5L12.5 14L11.75 12.5L10.25 11.75L11.75 11L12.5 9.5Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-semibold text-purple-700">AI Recommendations</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {recommendations.map((rec, i) => (
                <button key={i} className="flex items-start gap-2 text-left group">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-5 mt-0.5 flex-shrink-0">
                    <path d="M5.25 10.5L8.75 7L5.25 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs text-brand-5 hover:text-brand-6 group-hover:underline leading-relaxed">{rec}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-semibold text-white bg-brand-5 rounded-xl hover:bg-brand-6 transition-colors"
          >
            Apply AI Mappings
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Review Individually
          </button>
        </div>
      </div>
    </div>
  );
}
