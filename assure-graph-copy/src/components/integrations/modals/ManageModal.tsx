"use client";

import { useState } from "react";
import Image from "next/image";
import { Integration } from "@/data/integrations";

interface ManageModalProps {
  integration: Integration;
  onClose: () => void;
  onDisconnect: (integration: Integration) => void;
}

export default function ManageModal({ integration, onClose, onDisconnect }: ManageModalProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[540px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">Manage integration</h2>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-0">
          {/* Logos + Title */}
          <div className="flex flex-col items-center gap-3 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                <Image src={integration.logoUrl} alt={integration.name} width={36} height={36} className="object-contain" />
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
                <path d="M7 16L3 12L7 8M17 8L21 12L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200 flex-shrink-0">
                <span className="text-sm font-bold text-slate-600">AG</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">{integration.name} connected</h3>
              <p className="text-sm text-slate-500 mt-1">ControlGraph AI is authorized to sync your {integration.name} account.</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 -mx-6 mb-5" />

          {/* Connection Info */}
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Connection status:</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sync
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Last sync:</span>
              <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-full">
                {integration.lastSync ?? "Never"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Date connected:</span>
              <span className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded-full">
                {integration.connectedAt ?? "12 Dec' 25 10:38am"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 -mx-6 mb-5" />

          {/* Credentials */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-slate-500">API Key</label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  defaultValue="••••••"
                  readOnly
                  autoComplete="new-password"
                  className="w-full px-4 py-3 pr-10 text-sm border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showApiKey ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3.75C5.25 3.75 2.25 9 2.25 9C2.25 9 5.25 14.25 9 14.25C12.75 14.25 15.75 9 15.75 9C15.75 9 12.75 3.75 9 3.75Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.3"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 2.25L15.75 15.75M7.35 7.39A2.25 2.25 0 0011.19 11.19M5.16 5.19C3.77 6.19 2.68 7.5 2.25 9C3.04 11.69 5.78 13.5 9 13.5C10.2 13.5 11.33 13.2 12.31 12.65M9 4.5C9.68 4.5 10.34 4.62 10.95 4.84M9.75 6.08A2.25 2.25 0 0111.92 8.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-slate-500">User ID</label>
              <input
                type="text"
                defaultValue="5148956720"
                readOnly
                autoComplete="off"
                className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onDisconnect(integration)}
              className="flex-1 py-3 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.94 3.88L10.82 5.76M2.5 13.5L5.5 12.5L13 5L11 3L3.5 10.5L2.5 13.5Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.12 5.18L5.06 10.24" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
