"use client";

import { useState } from "react";
import { Loader } from "@/components/global/Loader";

interface CustomIntegrationModalProps {
  onClose: () => void;
}

export default function CustomIntegrationModal({ onClose }: CustomIntegrationModalProps) {
  const [form, setForm] = useState({ appName: "", webhookUrl: "", apiKey: "", userId: "" });
  const [showApiKey, setShowApiKey] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isConnecting, setIsConnecting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.appName.trim()) e.appName = "App Name is required";
    if (!form.webhookUrl.trim()) e.webhookUrl = "Webhook URL is required";
    if (!form.apiKey.trim()) e.apiKey = "API Key is required";
    if (!form.userId.trim()) e.userId = "User ID is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConnect = () => {
    if (!validate()) return;
    setIsConnecting(true);
    setTimeout(() => { onClose(); }, 600);
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, isPassword = false) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <input
          type={isPassword && !showApiKey ? "password" : "text"}
          value={form[key]}
          onChange={(e) => { setForm((p) => ({ ...p, [key]: e.target.value })); setErrors((p) => { const n = { ...p }; delete n[key]; return n; }); }}
          placeholder={placeholder}
          autoComplete={isPassword ? "new-password" : "off"}
          className={`w-full px-4 py-3 ${isPassword ? "pr-10" : ""} text-sm border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors ${errors[key] ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"}`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShowApiKey((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showApiKey ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3.75C5.25 3.75 2.25 9 2.25 9C2.25 9 5.25 14.25 9 14.25C12.75 14.25 15.75 9 15.75 9C15.75 9 12.75 3.75 9 3.75Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.3"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 2.25L15.75 15.75M7.35 7.39A2.25 2.25 0 0011.19 11.19M5.16 5.19C3.77 6.19 2.68 7.5 2.25 9C3.04 11.69 5.78 13.5 9 13.5C10.2 13.5 11.33 13.2 12.31 12.65M9 4.5C9.68 4.5 10.34 4.62 10.95 4.84M9.75 6.08A2.25 2.25 0 0111.92 8.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </button>
        )}
      </div>
      {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={!isConnecting ? onClose : undefined} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[540px] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">Custom integration</h2>
          <button onClick={onClose} disabled={isConnecting} className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {isConnecting ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <Loader label="Connecting...do not close tab" />
          </div>
        ) : (
          <div className="px-6 py-8 flex flex-col gap-6">
            {/* Logo header */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200">
                  <span className="text-sm font-bold text-slate-600">AG</span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
                  <path d="M7 16L3 12L7 8M17 8L21 12L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
                    <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4 24C4 19.5817 8.47715 16 14 16C19.5228 16 24 19.5817 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-base font-bold text-slate-900">Add integration</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm leading-relaxed">
                  Complete the form to allow ControlGraph AI integrate with third-party application.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              {field("appName", "App Name", "Enter app name")}
              {field("webhookUrl", "Webhook URL", "https://")}
              {field("apiKey", "API Key", "Enter API key", true)}
              {field("userId", "User ID", "Enter user id")}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="flex-1 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleConnect} className="flex-1 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors">Connect</button>
            </div>

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
