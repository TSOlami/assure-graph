"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tabs = [
  "Compliance Trend",
  "Risk Distribution",
  "Evidence Freshness",
  "Framework Progress",
] as const;
type Tab = (typeof tabs)[number];

const data = [
  { month: "Jan", value: 85 },
  { month: "Feb", value: 35 },
  { month: "Mar", value: 30 },
  { month: "Apr", value: 15 },
  { month: "May", value: 30 },
  { month: "Jun", value: 75 },
  { month: "Jul", value: 50 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-md">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{payload[0].value}%</p>
    </div>
  );
};

export function AIVisualizations() {
  const [activeTab, setActiveTab] = useState<Tab>("Compliance Trend");
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <i
            className="lni lni-bar-chart text-base"
            style={{ color: "#f05a35" }}
          />
          <h2 className="text-sm font-semibold text-gray-900">
            AI-Generated Visualizations
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
            <i className="lni lni-cog" /> Customize
          </button>
          <button className="flex items-center gap-1.5 text-xs text-white bg-gray-900 rounded-lg px-3 py-1.5 hover:bg-gray-800 transition-colors">
            <i className="lni lni-upload" /> Export
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-xs font-medium px-3 py-1.5 rounded-lg border transition-all",
              activeTab === tab
                ? "bg-brand-5 text-white border-brand-5"
                : "text-gray-600 border-gray-200 hover:bg-gray-50",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f05a35" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f05a35" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="linear"
              dataKey="value"
              stroke="#f05a35"
              strokeWidth={2}
              fill="url(#cGrad)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#f05a35",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
