"use client";

import { useState } from "react";
import Image from "next/image";
import { Integration } from "@/data/integrations";

interface IntegrationDetailModalProps {
  integration: Integration;
  onClose: () => void;
  onManage: (integration: Integration) => void;
}

export default function IntegrationDetailModal({ integration, onClose, onManage }: IntegrationDetailModalProps) {
  const [suggestionDismissed, setSuggestionDismissed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[540px] mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 flex-shrink-0">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
            <Image src={integration.logoUrl} alt={integration.name} width={22} height={22} className="object-contain" />
          </div>
          <h2 className="text-base font-semibold text-slate-900 flex-1">{integration.name}</h2>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.33 2.5L3.75 7.08L1.67 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Connected
          </span>
          <button
            onClick={() => onManage(integration)}
            className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.67 2.89L7.17 1.86C7.27 1.65 7.48 1.5 7.71 1.5C7.94 1.5 8.15 1.65 8.25 1.86L8.75 2.89C9.02 3.44 9.59 3.79 10.21 3.79C10.38 3.79 10.56 3.76 10.72 3.7L11.8 3.31C12.03 3.23 12.27 3.3 12.43 3.46C12.59 3.63 12.65 3.87 12.58 4.1L12.19 5.18C11.97 5.82 12.08 6.53 12.5 7.07L13.09 7.88C13.25 8.08 13.27 8.35 13.14 8.57C13.02 8.79 12.79 8.9 12.55 8.87L11.38 8.7C10.72 8.61 10.07 8.87 9.66 9.38L9.01 10.22C8.86 10.43 8.62 10.53 8.37 10.49C8.12 10.45 7.9 10.28 7.79 10.05L7.41 9.19C7.18 8.68 6.66 8.35 6.11 8.35C5.97 8.35 5.83 8.38 5.7 8.43L4.43 8.87C4.2 8.95 3.96 8.88 3.8 8.71C3.64 8.55 3.58 8.31 3.65 8.08L4.04 7C4.27 6.36 4.15 5.65 3.74 5.11L3.15 4.3C2.99 4.1 2.97 3.83 3.1 3.61C3.23 3.39 3.46 3.28 3.7 3.32L4.87 3.49C5.53 3.58 6.18 3.32 6.59 2.81L6.67 2.89Z" stroke="currentColor" strokeWidth="1.1"/>
              <circle cx="7.71" cy="5.75" r="1.75" stroke="currentColor" strokeWidth="1.1"/>
            </svg>
            Manage
          </button>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors ml-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Description */}
          <div className="px-6 py-4">
            <p className="text-sm text-slate-600 leading-relaxed">{integration.description}</p>
          </div>

          {/* AI Control Mapping Section */}
          <div className="mx-6 mb-4 p-4 bg-purple-50 border border-purple-100 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                <path d="M8 1.5L9.5 5L13 6.5L9.5 8L8 11.5L6.5 8L3 6.5L6.5 5L8 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                <path d="M12.5 9.5L13.25 11L14.75 11.75L13.25 12.5L12.5 14L11.75 12.5L10.25 11.75L11.75 11L12.5 9.5Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-semibold text-purple-700">AI Control Mapping</span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">11</p>
                <p className="text-xs text-purple-500">Auto-mapped</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-xs text-purple-500">Total Controls</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">94%</p>
                <p className="text-xs text-purple-500">Confidence</p>
              </div>
            </div>

            {/* Mapping Suggestion */}
            {!suggestionDismissed && (
              <div className="p-3 bg-[#EFF8FF] border border-[#9AD0FF] rounded-lg flex gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
                    <path d="M8 1.5L9.5 5L13 6.5L9.5 8L8 11.5L6.5 8L3 6.5L6.5 5L8 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                    <path d="M12.5 9.5L13.25 11L14.75 11.75L13.25 12.5L12.5 14L11.75 12.5L10.25 11.75L11.75 11L12.5 9.5Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-900">Mapping Suggestion</span>
                    <span className="px-2 py-0.5 text-xs font-medium text-brand-5 bg-brand-0-5 border border-brand-2 rounded-full">87% Confident</span>
                    <button onClick={() => setSuggestionDismissed(true)} className="ml-auto text-slate-400 hover:text-slate-600">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    AssureGraph AI suggests 2 additional controls could be mapped to {integration.name} with 85%+ confidence.
                  </p>
                  <button className="text-sm font-medium text-brand-5 hover:text-brand-6 mt-2">Review Suggestions</button>
                </div>
              </div>
            )}
          </div>

          {/* Evidence Types */}
          <div className="px-6 pb-4">
            <p className="text-sm font-medium text-slate-700 mb-2">Evidence Types</p>
            <div className="flex flex-wrap gap-2">
              {["User Access", "Group Membership", "Security Settings"].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 mx-6" />
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            View Controls
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-semibold text-white bg-brand-5 rounded-xl hover:bg-brand-6 transition-colors flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3H14V12C14 12.55 13.55 13 13 13H3C2.45 13 2 12.55 2 12V3Z" stroke="white" strokeWidth="1.3"/>
              <path d="M2 3L8 7.5L14 3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            View Evidence
          </button>
        </div>
      </div>
    </div>
  );
}
