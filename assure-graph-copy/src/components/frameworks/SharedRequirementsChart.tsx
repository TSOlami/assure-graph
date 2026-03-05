"use client";

import { FRAMEWORK_PAIRS } from "@/data/frameworks";

export default function SharedRequirementsChart() {
  const maxValue = 100;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex-1">
      <h3 className="text-sm font-semibold text-slate-900 mb-1">
        Shared Requirements by Framework Pair
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        Visual representation of shared requirements across frameworks.
      </p>

      <div className="flex flex-col gap-5">
        {FRAMEWORK_PAIRS.map((pair) => (
          <div key={pair.label} className="flex items-center gap-3">
            <span className="text-xs text-slate-600 w-24 text-right flex-shrink-0">
              {pair.label}
            </span>
            <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
              <div
                className="h-full rounded transition-all"
                style={{
                  width: `${(pair.value / maxValue) * 100}%`,
                  backgroundColor: pair.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 px-28">
        {[0, 20, 40, 60, 80, 100].map((tick) => (
          <span key={tick} className="text-[10px] text-slate-400">
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
}
