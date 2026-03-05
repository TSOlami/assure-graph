"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader } from "@/components/global/Loader";
import { Integration } from "@/data/integrations";

interface ConnectModalProps {
  integration: Integration;
  onClose: () => void;
  onConnect: (integration: Integration) => void;
}

export default function ConnectModal({ integration, onClose, onConnect }: ConnectModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [userId, setUserId] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [errors, setErrors] = useState<{ apiKey?: string; userId?: string }>({});
  const [isConnecting, setIsConnecting] = useState(false);

  const validate = () => {
    const newErrors: { apiKey?: string; userId?: string } = {};
    if (!apiKey.trim()) newErrors.apiKey = "API Key is required";
    if (!userId.trim()) newErrors.userId = "User ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConnect = () => {
    if (!validate()) return;
    setIsConnecting(true);
    setTimeout(() => {
      onConnect(integration);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={!isConnecting ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[540px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">
            Integrate with {integration.name}
          </h2>
          <button
            onClick={onClose}
            disabled={isConnecting}
            className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        {isConnecting ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <Loader label="Connecting...do not close tab" />
          </div>
        ) : (
          <div className="px-6 py-8 flex flex-col gap-6">
            {/* Logos */}
            <div className="flex flex-col items-center gap-4">
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
                <h3 className="text-base font-bold text-slate-900">Connect {integration.name}</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm leading-relaxed">
                  Login to your {integration.name} account to connect to ControlGraph AI and sync users, groups, and policy data.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">API Key</label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => { setApiKey(e.target.value); setErrors((p) => ({ ...p, apiKey: undefined })); }}
                    placeholder="Enter API key"
                    autoComplete="new-password"
                    className={`w-full px-4 py-3 pr-10 text-sm border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors ${errors.apiKey ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"}`}
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
                {errors.apiKey && <p className="text-xs text-red-500">{errors.apiKey}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => { setUserId(e.target.value); setErrors((p) => ({ ...p, userId: undefined })); }}
                  placeholder="Enter user id"
                  autoComplete="off"
                  className={`w-full px-4 py-3 text-sm border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors ${errors.userId ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"}`}
                />
                {errors.userId && <p className="text-xs text-red-500">{errors.userId}</p>}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                className="flex-1 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Connect
              </button>
            </div>

            {/* Privacy */}
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              By connecting, you authorize ControlGraph AI to use your information in accordance with it&apos;s{" "}
              <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
