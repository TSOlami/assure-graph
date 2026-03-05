"use client";

import { Integration } from "@/data/integrations";

interface DisconnectModalProps {
  integration: Integration;
  onClose: () => void;
  onConfirm: (integration: Integration) => void;
}

export default function DisconnectModal({ integration, onClose, onConfirm }: DisconnectModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[540px] mx-4 overflow-hidden">
        {/* Close button only */}
        <div className="flex justify-end px-6 pt-4">
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-8 flex flex-col gap-4">
          {/* Broken link icon */}
          <div className="flex items-center justify-start">
            <div className="w-16 h-16 flex items-center justify-center">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 35L9 23M23 28L28 23L23 28ZM28 23L33 18L28 23ZM33 18C35.5 15.5 39.5 15.5 42 18C44.5 20.5 44.5 24.5 42 27L37 32M19 37L14 42C11.5 44.5 7.5 44.5 5 42C2.5 39.5 2.5 35.5 5 33L10 28" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="28" y1="5" x2="28" y2="11" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
                <line x1="46" y1="10" x2="42" y2="14" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
                <line x1="51" y1="28" x2="45" y2="28" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-slate-900">Are you sure you want to disconnect?</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              By disconnecting this integration, you will lose all the data and this action cannot be undone.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(integration)}
              className="flex-1 py-3 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors"
            >
              Yes, disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
