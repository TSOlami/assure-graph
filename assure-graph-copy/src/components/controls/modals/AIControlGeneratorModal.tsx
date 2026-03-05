"use client";

import { useState } from "react";
import {
  BUSINESS_TYPES,
  SUBSCRIBED_FRAMEWORKS,
  INDUSTRY_REGULATIONS,
} from "@/data/controls";
import { AIBanner } from "@/components/ui/AIBanner";

interface AIControlGeneratorModalProps {
  onClose: () => void;
  onGenerate: () => void;
}

export default function AIControlGeneratorModal({
  onClose,
  onGenerate,
}: AIControlGeneratorModalProps) {
  const [businessType, setBusinessType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<Set<string>>(new Set());
  const [selectedRegulations, setSelectedRegulations] = useState<Set<string>>(new Set());

  const toggleFramework = (fw: string) => {
    setSelectedFrameworks((prev) => {
      const next = new Set(prev);
      if (next.has(fw)) next.delete(fw);
      else next.add(fw);
      return next;
    });
  };

  const toggleRegulation = (reg: string) => {
    setSelectedRegulations((prev) => {
      const next = new Set(prev);
      if (next.has(reg)) next.delete(reg);
      else next.add(reg);
      return next;
    });
  };

  const aiWillGenerate = [
    "Control ID, descriptions, and frequency",
    "Auto-mapping to risks in Risk Register",
    "Linking to relevant policy documents",
    "Framework/standard mappings",
    "Evidence requirements",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">AI Control Generator</h2>
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
          {/* Description */}
          <p className="text-sm text-gray-600">
            AssureGraph AI will generate controls based on your business type and subscribed frameworks.
          </p>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Business Type</label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors text-left"
              >
                <span className={businessType ? "text-gray-900" : "text-gray-400"}>
                  {businessType || "Select business type"}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                  {BUSINESS_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setBusinessType(type);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subscribed Frameworks */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Subscribed Frameworks</label>
            <div className="flex flex-wrap gap-2">
              {SUBSCRIBED_FRAMEWORKS.map((fw) => (
                <button
                  key={fw}
                  onClick={() => toggleFramework(fw)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-full transition-colors ${
                    selectedFrameworks.has(fw)
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedFrameworks.has(fw) ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }`}
                  >
                    {selectedFrameworks.has(fw) && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {fw}
                </button>
              ))}
            </div>
          </div>

          {/* Industry Regulations */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Industry Regulations</label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRY_REGULATIONS.map((reg) => (
                <button
                  key={reg}
                  onClick={() => toggleRegulation(reg)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-full transition-colors ${
                    selectedRegulations.has(reg)
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedRegulations.has(reg) ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }`}
                  >
                    {selectedRegulations.has(reg) && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* AI Will Generate */}
          <AIBanner
            title="AI will generate:"
            dismissible={false}
            className="py-3.5"
          >
            <div className="space-y-2 mt-2">
              {aiWillGenerate.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-brand-5 mt-0.5 shrink-0">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </AIBanner>

          {/* Footer buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onGenerate}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L9.2 4.8L13 3.5L11 6.5L15 8L11 9.5L13 12.5L9.2 11.2L8 15L6.8 11.2L3 12.5L5 9.5L1 8L5 6.5L3 3.5L6.8 4.8L8 1Z" fill="white" />
              </svg>
              Generate Controls
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
