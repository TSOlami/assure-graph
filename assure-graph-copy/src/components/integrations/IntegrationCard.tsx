"use client";

import Image from "next/image";
import clsx from "clsx";
import { Integration } from "@/data/integrations";

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (integration: Integration) => void;
  onManage: (integration: Integration) => void;
  onViewDetail: (integration: Integration) => void;
}

export default function IntegrationCard({
  integration,
  onConnect,
  onManage,
  onViewDetail,
}: IntegrationCardProps) {
  const isConnected = integration.status === "connected";

  if (isConnected) {
    return (
      <div
        className="flex flex-col border border-slate-200 rounded-lg bg-white overflow-hidden cursor-pointer hover:shadow-sm transition-shadow"
        onClick={() => onViewDetail(integration)}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
            <Image
              src={integration.logoUrl}
              alt={integration.name}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.33 2.5L3.75 7.08L1.67 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Connected
          </span>
        </div>

        {/* App Name & Description */}
        <div className="px-4 pb-3 flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-slate-900">{integration.name}</h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{integration.description}</p>
        </div>

        {/* AI Auto-Mapping Section */}
        <div className="mx-4 mb-3 p-3 bg-purple-50 border border-purple-100 rounded-lg flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
              <path d="M7 1.5L8.25 4.58L11.5 5.83L8.25 7.08L7 10.17L5.75 7.08L2.5 5.83L5.75 4.58L7 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
              <path d="M10.5 8.5L11.17 10.08L12.75 10.75L11.17 11.42L10.5 13L9.83 11.42L8.25 10.75L9.83 10.08L10.5 8.5Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs font-semibold text-purple-700">AI Auto-Mapping</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-purple-600 font-medium">17/18 controls</span>
            <span className="text-purple-600 font-medium">96% confidence</span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-1">
            <div className="bg-brand-5 h-1 rounded-full" style={{ width: "94%" }} />
          </div>
        </div>

        {/* Evidence Types */}
        <div className="px-4 pb-3">
          <p className="text-xs text-slate-500 mb-1.5 font-medium">Evidence Types Pulled:</p>
          <div className="flex flex-wrap gap-1">
            {["User Access", "Group Membership", "Security Settings"].map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs text-slate-600 bg-slate-100 border border-slate-200 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2"/><path d="M8.5 2.5L2.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              23 controls affected
            </span>
            <span className="flex items-center gap-1 text-green-600">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.33 2.5L3.75 7.08L1.67 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Data Quality: 85%
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 mx-0" />

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
              <path d="M11.375 2.17V4.875H8.67" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.625 10.83V8.125H4.33" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.68 4.875C2.94 4.13 3.4 3.47 4.01 2.97C4.61 2.47 5.35 2.15 6.13 2.05C6.91 1.94 7.71 2.05 8.43 2.38C9.14 2.7 9.75 3.22 10.21 3.88L11.375 4.875" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.625 8.125L2.79 9.12C3.25 9.78 3.86 10.3 4.57 10.62C5.29 10.95 6.09 11.06 6.87 10.95C7.65 10.85 8.39 10.53 8.99 10.03C9.6 9.53 10.06 8.87 10.32 8.125" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Last sync: {integration.lastSync ?? "Never"}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onManage(integration); }}
            className="flex items-center gap-1.5 text-xs font-medium text-brand-5 hover:text-brand-6 transition-colors"
          >
            Manage
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.42 2.17L5.96 1.08C6.07 0.86 6.28 0.71 6.5 0.71C6.72 0.71 6.93 0.86 7.04 1.08L7.58 2.17C7.86 2.73 8.45 3.08 9.08 3.08C9.27 3.08 9.45 3.04 9.63 2.97L10.76 2.57C10.99 2.49 11.24 2.56 11.41 2.73C11.57 2.9 11.63 3.15 11.56 3.38L11.16 4.51C10.93 5.16 11.05 5.88 11.48 6.42L12.1 7.26C12.26 7.46 12.28 7.74 12.15 7.96C12.02 8.18 11.78 8.29 11.54 8.25L10.34 8.08C9.68 7.98 9.02 8.25 8.6 8.77L7.93 9.62C7.77 9.83 7.52 9.94 7.26 9.9C7 9.87 6.77 9.7 6.66 9.46L6.27 8.59C6.03 8.07 5.51 7.74 4.95 7.74C4.81 7.74 4.66 7.77 4.52 7.82L3.24 8.27C3.01 8.35 2.76 8.28 2.59 8.11C2.43 7.94 2.37 7.69 2.44 7.46L2.84 6.33C3.07 5.68 2.95 4.96 2.52 4.42L1.9 3.58C1.74 3.38 1.72 3.1 1.85 2.88C1.98 2.66 2.22 2.55 2.46 2.59L3.66 2.76C4.32 2.86 4.98 2.59 5.4 2.07L5.42 2.17Z" stroke="currentColor" strokeWidth="0.9"/>
              <circle cx="6.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="0.9"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col border border-slate-200 rounded-lg bg-white overflow-hidden hover:shadow-sm transition-shadow">
      {/* Card Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Logo + Status badge */}
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
            <Image
              src={integration.logoUrl}
              alt={integration.name}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className={clsx(
            "inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-lg border",
            "bg-slate-100 border-slate-300 text-slate-600"
          )}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5.5 3.5V5.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="5.5" cy="7.5" r="0.5" fill="currentColor"/>
            </svg>
            Not Connected
          </span>
        </div>

        {/* Name + Description */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-medium text-slate-900">{integration.name}</h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{integration.description}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200" />

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
            <path d="M11.375 2.17V4.875H8.67" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.625 10.83V8.125H4.33" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.68 4.875C2.94 4.13 3.4 3.47 4.01 2.97C4.61 2.47 5.35 2.15 6.13 2.05C6.91 1.94 7.71 2.05 8.43 2.38C9.14 2.7 9.75 3.22 10.21 3.88L11.375 4.875" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.625 8.125L2.79 9.12C3.25 9.78 3.86 10.3 4.57 10.62C5.29 10.95 6.09 11.06 6.87 10.95C7.65 10.85 8.39 10.53 8.99 10.03C9.6 9.53 10.06 8.87 10.32 8.125" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Last sync: Never
        </div>
        <button
          onClick={() => onConnect(integration)}
          className="px-3 py-1.5 text-xs font-medium text-brand-5 border border-brand-3 bg-white rounded-lg hover:bg-brand-0-5 transition-colors"
        >
          Connect
        </button>
      </div>
    </div>
  );
}
