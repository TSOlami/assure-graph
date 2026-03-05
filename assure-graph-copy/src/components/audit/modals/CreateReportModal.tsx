"use client";

import { useState } from "react";
import clsx from "clsx";

interface CreateReportModalProps {
  onClose: () => void;
}

const dataSources = ["Controls", "Evidence", "Findings", "Risk", "Audits", "Vendors"];

export default function CreateReportModal({ onClose }: CreateReportModalProps) {
  const [reportName, setReportName] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-gray-900">Create Custom Report</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          AssureGraph AI will generate a comprehensive policy based on your requirements.
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Report Name</label>
            <input
              type="text"
              placeholder="E.g Quarterly Compliance Report"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2.5">Data Source</label>
            <div className="flex flex-wrap gap-2">
              {dataSources.map((source) => (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors",
                    selectedSource === source
                      ? "border-brand-5 bg-brand-0-5 text-brand-5"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  )}
                >
                  <span className={clsx(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    selectedSource === source ? "border-brand-5" : "border-gray-300"
                  )}>
                    {selectedSource === source && (
                      <span className="w-2 h-2 rounded-full bg-brand-5" />
                    )}
                  </span>
                  {source}
                </button>
              ))}
            </div>
          </div>

          {/* AI Report Builder */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-2.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                <path d="M10 2L12 7L17 8L12 9L10 14L8 9L3 8L8 7L10 2Z" stroke="#7C3AED" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M15 12L16 14L18 15L16 16L15 18L14 16L12 15L14 14L15 12Z" stroke="#7C3AED" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-purple-700">AI Report Builder</h4>
                <p className="text-xs text-purple-600 mt-1 leading-relaxed">
                  Describe what you need and AI will generate the report configuration automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-2.5 bg-brand-5 text-white rounded-lg text-sm font-medium hover:bg-brand-6 transition-colors flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            Generate with AI
          </button>
        </div>
      </div>
    </div>
  );
}
