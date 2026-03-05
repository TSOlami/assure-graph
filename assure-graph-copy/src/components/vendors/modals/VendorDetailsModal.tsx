"use client";

import { Vendor, CRITICALITY_STYLES } from "@/data/vendors";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { XmarkOutlined } from "@lineiconshq/free-icons";

interface VendorDetailsModalProps {
  vendor: Vendor;
  onClose: () => void;
}

export default function VendorDetailsModal({ vendor, onClose }: VendorDetailsModalProps) {
  const critStyle = CRITICALITY_STYLES[vendor.criticality];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">Vendors Details</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Lineicons icon={XmarkOutlined} size={18} aria-hidden />
            </button>
          </div>

          {/* Vendor name & ID */}
          <div className="mb-5">
            <h3 className="text-base font-semibold text-gray-900">{vendor.name}</h3>
            <p className="text-sm text-gray-500">{vendor.vendorId}</p>
          </div>

          {/* Risk Score / Criticality / Assessment Due row */}
          <div className="flex items-stretch gap-3 mb-6">
            <div className="flex-1 border border-gray-200 rounded-xl px-4 py-3 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{vendor.riskScore}</span>
              <span className="text-xs text-gray-500">Risk Score</span>
            </div>
            <div className={`flex-1 rounded-xl px-4 py-3 flex flex-col items-center justify-center ${critStyle.bg} ${critStyle.border} border`}>
              <span className={`text-sm font-semibold ${critStyle.text}`}>{vendor.criticality}</span>
              <span className="text-xs text-gray-500">Criticality</span>
            </div>
            <div className="flex-1 border border-gray-200 rounded-xl px-4 py-3 flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-gray-900">Mar 15, 2026</span>
              <span className="text-xs text-gray-500">Assessment Due</span>
            </div>
          </div>

          {/* Data & System Access */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Data & System Access</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-500">
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs text-gray-600">PII Access</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{vendor.piiAccess ? "Yes" : "No"}</span>
              </div>
              <div className="bg-green-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-500">
                    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 7h6M5 9.5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs text-gray-600">Customer Data</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{vendor.customerData ? "Yes" : "No"}</span>
              </div>
              <div className="bg-amber-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-amber-500">
                    <path d="M8 2L14 13H2L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M8 6v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="8" cy="11" r="0.5" fill="currentColor" />
                  </svg>
                  <span className="text-xs text-gray-600">SOX Relevant</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{vendor.soxRelevant}</span>
              </div>
              <div className="bg-purple-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-purple-500">
                    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 7h6M5 9.5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs text-gray-600">Credit Card Data</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{vendor.creditCardData ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>

          {/* AI Recommended Actions */}
          <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-purple-500">
                <path d="M9 1L10.5 5.5L15 4L12.5 7.5L17 9L12.5 10.5L15 14L10.5 12.5L9 17L7.5 12.5L3 14L5.5 10.5L1 9L5.5 7.5L3 4L7.5 5.5L9 1Z" fill="currentColor" />
              </svg>
              <span className="text-sm font-semibold text-purple-700">AI Recommended Actions</span>
            </div>
            <div className="space-y-2">
              {vendor.aiRecommendedActions.map((action, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-purple-400 shrink-0">
                    <path d="M4 6L6 8.5L10 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-purple-600">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 7h6M5 9.5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              View Assessment
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-gray-700 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-500">
                <path d="M8 2L14 13H2L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M8 6v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="8" cy="11" r="0.5" fill="currentColor" />
              </svg>
              Security Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
