"use client";

import { useState } from "react";
import { FRAMEWORKS, Framework } from "@/data/frameworks";
import AIBanner from "./AIBanner";
import FrameworkCard from "./FrameworkCard";
import EvidenceReuseChart from "./EvidenceReuseChart";
import SharedRequirementsChart from "./SharedRequirementsChart";
import RequirementsBreakdown from "./RequirementsBreakdown";
import FrameworkDetailsModal from "./modals/FrameworkDetailsModal";
import AIAutoMappingModal from "./modals/AIAutoMappingModal";

type ModalState =
  | { type: "framework-details"; framework: Framework }
  | { type: "ai-mapping" }
  | null;

export default function FrameworksContent() {
  const [modal, setModal] = useState<ModalState>(null);

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Frameworks
            </h1>
            <p className="text-sm text-gray-600">
              One piece of evidence. Multiple frameworks satisfied.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setModal({ type: "ai-mapping" })}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-brand-5 bg-transparent border border-transparent hover:bg-brand-0-5/60 rounded-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M12.5 10L13.25 11.75L15 12.5L13.25 13.25L12.5 15L11.75 13.25L10 12.5L11.75 11.75L12.5 10Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              AI Auto-Mapping
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4L8 2L14 4V9C14 12 11 14 8 15C5 14 2 12 2 9V4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M8 7V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M6 8H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Refresh All
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 bg-[#F5F5F7]">
        {/* AI Banner */}
        <AIBanner
          onViewMappingDetails={() => setModal({ type: "ai-mapping" })}
        />

        {/* Framework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {FRAMEWORKS.map((framework) => (
            <FrameworkCard
              key={framework.id}
              framework={framework}
              onClick={(fw) =>
                setModal({ type: "framework-details", framework: fw })
              }
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <EvidenceReuseChart />
          <SharedRequirementsChart />
        </div>

        {/* Requirements Breakdown */}
        <RequirementsBreakdown />
      </div>

      {/* Modals */}
      {modal?.type === "framework-details" && (
        <FrameworkDetailsModal
          framework={modal.framework}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "ai-mapping" && (
        <AIAutoMappingModal onClose={() => setModal(null)} />
      )}
    </div>
  );
}
