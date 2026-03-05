"use client";

import { Framework } from "@/data/frameworks";

interface FrameworkCardProps {
  framework: Framework;
  onClick: (framework: Framework) => void;
}

function FrameworkIcon({ framework }: { framework: Framework }) {
  if (framework.id === "iso-27001") {
    return (
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[9px] font-bold leading-tight text-center">
          ISO
        </span>
      </div>
    );
  }
  if (framework.id === "soc-2") {
    return (
      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[8px] font-bold leading-tight text-center">
          AICPA<br />SOC
        </span>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2L3 6V14L10 18L17 14V6L10 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 8V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 10H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function FrameworkCard({ framework, onClick }: FrameworkCardProps) {
  const trendColor =
    framework.trend.direction === "up" ? "text-green-600" : "text-red-500";
  const trendArrow = framework.trend.direction === "up" ? "↑" : "↓";

  return (
    <div
      onClick={() => onClick(framework)}
      className={`${framework.bgColor} ${framework.borderColor} border rounded-xl p-5 cursor-pointer hover:shadow-md transition-all group`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FrameworkIcon framework={framework} />
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {framework.name}
            </h3>
            <p className="text-xs text-slate-500">
              {framework.completedRequirements}/{framework.totalRequirements}{" "}
              requirements
            </p>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-slate-400 group-hover:text-slate-600 transition-colors"
        >
          <path
            d="M7.5 5L12.5 10L7.5 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex items-center gap-2 mb-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500 flex-shrink-0">
          <path d="M8 1.5L9.5 5.5L13.5 7L9.5 8.5L8 12.5L6.5 8.5L2.5 7L6.5 5.5L8 1.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          <path d="M12.5 9.5L13.25 11.25L15 12L13.25 12.75L12.5 14.5L11.75 12.75L10 12L11.75 11.25L12.5 9.5Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-medium text-green-600">
          {framework.aiMapped} requirements AI-mapped
        </span>
      </div>
      <p className="text-xs text-slate-500 ml-6 mb-3">
        {framework.aiConfidence}% confidence
      </p>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-bold" style={{ color: framework.color }}>
          {framework.completionPercent}%
        </span>
        <div className="flex-1 h-1.5 bg-white/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${framework.progressColor}`}
            style={{ width: `${framework.completionPercent}%` }}
          />
        </div>
        <span className="text-xs text-slate-500">complete</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-white rounded-lg border border-white/80 px-3 py-2.5 text-center">
          <div className="text-lg font-bold text-slate-900">
            {framework.controlsMapped}
          </div>
          <div className="text-[11px] text-slate-500">Controls Mapped</div>
        </div>
        <div className="bg-white rounded-lg border border-white/80 px-3 py-2.5 text-center">
          <div className="text-lg font-bold text-slate-900">
            {framework.sharedRequirements}
          </div>
          <div className="text-[11px] text-slate-500">Shared Requirements</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className={`text-xs font-medium ${trendColor}`}>
            {trendArrow} {framework.trend.direction === "up" ? "+" : "-"}
            {framework.trend.value}
          </span>
          <span className="text-xs text-slate-500">
            {framework.trend.label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
            <path d="M4.67 5.25H9.33M4.67 7.58H7.58M3.5 11.08L5.25 9.33H10.5C11.14 9.33 11.67 8.8 11.67 8.17V3.5C11.67 2.86 11.14 2.33 10.5 2.33H3.5C2.86 2.33 2.33 2.86 2.33 3.5V8.17C2.33 8.8 2.86 9.33 3.5 9.33V11.08Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs text-slate-500">
            {framework.reuseRate}% reuse
          </span>
        </div>
      </div>
    </div>
  );
}
