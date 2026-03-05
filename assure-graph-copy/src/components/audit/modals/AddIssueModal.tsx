"use client";

import { useState } from "react";

interface AddIssueModalProps {
  onClose: () => void;
}

export default function AddIssueModal({ onClose }: AddIssueModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [owner, setOwner] = useState("");
  const [control, setControl] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-gray-900">Add New Issue</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-5">Track and resolve compliance issues.</p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Issue Title</label>
            <input
              type="text"
              placeholder="e.g Missing MFA on admin accounts"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Type" value={type} onChange={setType} options={["Finding", "Observation", "Non-Compliance"]} placeholder="Select type" />
            <SelectField label="Severity" value={severity} onChange={setSeverity} options={["Critical", "High", "Medium", "Low"]} placeholder="Select level" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Status" value={status} onChange={setStatus} options={["Open", "In-progress", "Resolved"]} placeholder="Select status" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5"
              />
            </div>
          </div>

          <SelectField label="Owner" value={owner} onChange={setOwner} options={["John A.", "Samuel A.", "Grace O.", "Joseph W."]} placeholder="Select owner" />
          <SelectField label="Related Control" value={control} onChange={setControl} options={["DCF-00", "AC-003", "PL-003", "IF-003"]} placeholder="Select control" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-2.5 bg-brand-5 text-white rounded-lg text-sm font-medium hover:bg-brand-6 transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 bg-white"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
