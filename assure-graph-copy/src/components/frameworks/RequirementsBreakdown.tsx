"use client";

import { FRAMEWORKS } from "@/data/frameworks";

function FrameworkIcon({ frameworkId }: { frameworkId: string }) {
  if (frameworkId === "iso-27001") {
    return (
      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[7px] font-bold">ISO</span>
      </div>
    );
  }
  if (frameworkId === "soc-2") {
    return (
      <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[6px] font-bold leading-tight text-center">
          SOC
        </span>
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2L3 6V14L10 18L17 14V6L10 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function RequirementsBreakdown() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-5">
        Requirements Breakdown by Framework
      </h3>

      <div className="flex flex-col gap-5">
        {FRAMEWORKS.map((fw) => (
          <div key={fw.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FrameworkIcon frameworkId={fw.id} />
                <span className="text-sm font-medium text-slate-900">
                  {fw.name}
                </span>
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                    <path d="M7 1L8.5 4.5L12 5.5L8.5 7L7 10.5L5.5 7L2 5.5L5.5 4.5L7 1Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs font-medium text-green-600">
                    {fw.aiMapped} AI-mapped
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">
                  {fw.completedRequirements} of {fw.totalRequirements}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: fw.color }}
                >
                  {fw.completionPercent}%
                </span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${fw.progressColor}`}
                style={{ width: `${fw.completionPercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
