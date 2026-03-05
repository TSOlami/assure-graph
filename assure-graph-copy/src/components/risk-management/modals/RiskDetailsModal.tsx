"use client";

import { Risk } from "@/data/risks";
import clsx from "clsx";

interface RiskDetailsModalProps {
  risk: Risk;
  onClose: () => void;
}

export default function RiskDetailsModal({ risk, onClose }: RiskDetailsModalProps) {
  const riskScoreColor =
    risk.score >= 15
      ? "text-red-600 bg-red-50 border-red-200"
      : risk.score >= 10
        ? "text-orange-600 bg-orange-50 border-orange-200"
        : risk.score >= 5
          ? "text-amber-600 bg-amber-50 border-amber-200"
          : "text-green-600 bg-green-50 border-green-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Risk Details</h2>
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
          {/* Risk title */}
          <h3 className="text-base font-semibold text-gray-900 leading-snug">
            {risk.id}: {risk.name}
          </h3>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Description</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{risk.description}</p>
          </div>

          {/* Score cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-gray-200 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{risk.likelihood}</p>
              <p className="text-xs text-gray-500 mt-0.5">Likelihood (1-5)</p>
            </div>
            <div className="border border-gray-200 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{risk.impact}</p>
              <p className="text-xs text-gray-500 mt-0.5">Impact (1-5)</p>
            </div>
            <div className={clsx("border rounded-xl px-4 py-3 text-center", riskScoreColor)}>
              <p className="text-2xl font-bold">{risk.score}</p>
              <p className="text-xs mt-0.5 opacity-80">Risk Score</p>
            </div>
          </div>

          {/* AI Auto-Mapping */}
          <div className="bg-linear-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl px-4 py-3.5">
            <div className="flex items-center gap-2 mb-1">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 1L10.5 5.5L15 4L12.5 8L17 9L12.5 10L15 14L10.5 12.5L9 17L7.5 12.5L3 14L5.5 10L1 9L5.5 8L3 4L7.5 5.5L9 1Z"
                  fill="url(#ai-risk-grad)"
                />
                <defs>
                  <linearGradient id="ai-risk-grad" x1="1" y1="1" x2="17" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A855F7" />
                    <stop offset="1" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-semibold text-purple-700">AI Auto-Mapping</span>
            </div>
            <p className="text-sm text-gray-700">
              Recommended treatment: <span className="font-semibold text-purple-700">{risk.aiTreatment}</span>
            </p>
            <p className="text-sm text-gray-500">Confidence: {risk.aiConfidence}%</p>
          </div>

          {/* Linked Controls */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2.5">Linked Controls</h4>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                {risk.controlsCount} controls mapped
              </div>
              <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-1">
                View Controls
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-red-500">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors">
              Mitigate Risk
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              Accept Risk
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
