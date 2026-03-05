"use client";

import { useState } from "react";

interface CreateAuditModalProps {
  onClose: () => void;
}

export default function CreateAuditModal({ onClose }: CreateAuditModalProps) {
  const [name, setName] = useState("");
  const [framework, setFramework] = useState("");
  const [auditor, setAuditor] = useState("Internal");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-gray-900">Create Audit</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Set up a new audit. AssureGraph AI will auto-map evidence to controls.
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Audit Name</label>
            <input
              type="text"
              placeholder="e.g ISO 27001 Surveillance Audit"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Framework</label>
              <div className="relative">
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 bg-white"
                >
                  <option value="">Select framework</option>
                  <option value="soc2">SOC 2</option>
                  <option value="iso27001">ISO 27001</option>
                  <option value="gdpr">GDPR</option>
                  <option value="hipaa">HIPAA</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Auditor</label>
              <div className="relative">
                <select
                  value={auditor}
                  onChange={(e) => setAuditor(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 bg-white"
                >
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5"
              />
            </div>
          </div>

          {/* AI Auto-Mapping info */}
          <div className="bg-[#EFF8FF] border border-[#9AD0FF] rounded-lg p-4">
            <div className="flex items-start gap-2.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                <path d="M10 2L12 7L17 8L12 9L10 14L8 9L3 8L8 7L10 2Z" stroke="#3B82F6" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M15 12L16 14L18 15L16 16L15 18L14 16L12 15L14 14L15 12Z" stroke="#3B82F6" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-blue-700">AI Auto-Mapping</h4>
                <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                  AssureGraph AI will automatically map evidence to controls based on control descriptions, not just titles. This ensures comprehensive coverage.
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
            Create &amp; Auto-Map
          </button>
        </div>
      </div>
    </div>
  );
}
