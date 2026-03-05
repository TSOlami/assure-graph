"use client";

interface CancelConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelConfirmModal({ onClose, onConfirm }: CancelConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[420px] mx-4 overflow-hidden p-6">
        {/* Warning icon + close */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L37 34H3L20 4Z" stroke="#EF4444" strokeWidth="2" strokeLinejoin="round" fill="none" />
              <path d="M20 16V24" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              <circle cx="20" cy="28" r="1.2" fill="#EF4444" />
            </svg>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Are you sure you want to cancel?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          By cancelling this, you will lose all the progress and this action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            No, don&apos;t cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors"
          >
            Yes, cancel
          </button>
        </div>
      </div>
    </div>
  );
}
