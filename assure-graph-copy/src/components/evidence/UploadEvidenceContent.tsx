"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import CancelConfirmModal from "./modals/CancelConfirmModal";

type UploadStatus = "idle" | "uploading" | "success";

interface UploadedFile {
  name: string;
  size: string;
}

interface FormData {
  documentName: string;
  assignedOwner: string;
  approver: string;
  classification: string;
  version: string;
  reviewCycle: string;
  nextReviewDate: string;
}

const FRAMEWORKS = ["SOC 2", "ISO 27001", "NIST", "GDPR", "HIPAA"];

const OWNERS = ["Ruth Nwadike", "Samuel Adeyemi", "Grace Okonkwo", "John Adeniyi", "Mary Roberts"];
const APPROVERS = ["Sarhmy Alex", "Joseph Williams", "Philip Ibrahim", "Sarah Okafor"];
const CLASSIFICATIONS = ["Internal", "Public", "Restricted", "Confidential"];
const REVIEW_CYCLES = ["Annually", "Semi-Annually", "Quarterly", "Monthly"];

export default function UploadEvidenceContent() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(FRAMEWORKS);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    documentName: "",
    assignedOwner: "",
    approver: "",
    classification: "",
    version: "",
    reviewCycle: "",
    nextReviewDate: "",
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) simulateUpload(e.dataTransfer.files[0]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) simulateUpload(e.target.files[0]);
  };

  const simulateUpload = (file: File) => {
    setUploadStatus("uploading");
    const sizeKB = Math.round(file.size / 1024);
    setTimeout(() => {
      setUploadedFile({ name: file.name, size: `${sizeKB} KB` });
      setUploadStatus("success");
    }, 1500);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleFramework = (fw: string) => {
    setSelectedFrameworks((prev) =>
      prev.includes(fw) ? prev.filter((f) => f !== fw) : [...prev, fw]
    );
  };

  const handleCancel = () => {
    if (uploadedFile || formData.documentName) {
      setShowCancelModal(true);
    } else {
      router.push("/evidence");
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    router.push("/evidence");
  };

  const handleSubmit = () => {
    router.push("/evidence");
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleCancel}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Upload Evidence</h1>
          <p className="text-sm text-gray-500 mt-0.5">Complete steps to add evidence.</p>
        </div>
      </div>

      {/* Upload Area */}
      <div className={clsx(
        "border-2 border-dashed rounded-xl p-8 mb-6 transition-colors",
        uploadStatus === "success" ? "border-green-300 bg-green-50/50" : dragActive ? "border-brand-5 bg-brand-0-5" : "border-gray-300 bg-gray-50/50"
      )}>
        {uploadStatus === "idle" && (
          <div
            className="flex flex-col items-center gap-3 cursor-pointer"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gray-400">
              <path d="M20 8V24M20 8L14 14M20 8L26 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 28C8 30.2 9.8 32 12 32H28C30.2 32 32 30.2 32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="text-brand-5 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">PDF, TXT or DOCS (max. 4MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {uploadStatus === "uploading" && (
          <div className="flex flex-col items-center gap-3">
            <div
              className="h-10 w-10 rounded-full animate-spin"
              style={{
                background: "conic-gradient(from 0deg at 50% 50%, rgba(240, 90, 53, 0) 0deg, #F05A35 360deg)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))",
              }}
            />
            <p className="text-sm text-gray-600">Uploading...</p>
            <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-5 rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
          </div>
        )}

        {uploadStatus === "success" && uploadedFile && (
          <div className="flex flex-col items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="16" fill="#22C55E" />
              <path d="M13 20L18 25L27 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm font-medium text-gray-700">Uploading Successful...</p>
            <div className="w-full max-w-xs h-2 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }} />
            </div>

            {/* File row */}
            <div className="flex items-center gap-3 w-full mt-2 px-4 py-2">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path d="M0 2C0 0.9 0.9 0 2 0H12L20 8V22C20 23.1 19.1 24 18 24H2C0.9 24 0 23.1 0 22V2Z" fill="#E5E7EB" />
                  <path d="M12 0L20 8H14C12.9 8 12 7.1 12 6V0Z" fill="#D1D5DB" />
                  <text x="3" y="18" fill="#6B7280" fontSize="6" fontWeight="600" fontFamily="sans-serif">.PDF</text>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.name}</p>
                <p className="text-xs text-gray-400">{uploadedFile.size}</p>
              </div>
              <button
                onClick={removeFile}
                className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 5H13V14.5C13 15.3 12.3 16 11.5 16H6.5C5.7 16 5 15.3 5 14.5V5Z" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M3 5H15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M7 2.5H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M8 8V13M10 8V13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Analysis info */}
      {uploadStatus === "idle" && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L10.5 5.5L15 4L12.5 8L15 12L10.5 10.5L9 15L7.5 10.5L3 12L5.5 8L3 4L7.5 5.5L9 1Z" fill="#EA580C" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-orange-800">AI Analysis</h3>
            <p className="text-xs text-orange-600 leading-relaxed">
              After upload, AI will automatically extract controls, evidence requirements, and suggest framework mappings.
            </p>
          </div>
        </div>
      )}

      {/* Document details form - shown after upload */}
      {uploadStatus === "success" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-700">
              <rect x="3" y="2" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <h2 className="text-base font-semibold text-gray-900">Document details</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">Fill the information of document.</p>

          <div className="flex flex-col gap-4">
            {/* Document name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Document name</label>
              <input
                type="text"
                value={formData.documentName}
                onChange={(e) => updateField("documentName", e.target.value)}
                placeholder="Enter document name"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors"
              />
            </div>

            {/* Owner + Approver */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned Owner</label>
                <div className="relative">
                  <select
                    value={formData.assignedOwner}
                    onChange={(e) => updateField("assignedOwner", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors"
                  >
                    <option value="">Select owner</option>
                    {OWNERS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Approver</label>
                <div className="relative">
                  <select
                    value={formData.approver}
                    onChange={(e) => updateField("approver", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors"
                  >
                    <option value="">Select approver</option>
                    {APPROVERS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Classification + Version */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Classification</label>
                <div className="relative">
                  <select
                    value={formData.classification}
                    onChange={(e) => updateField("classification", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors"
                  >
                    <option value="">Select classification</option>
                    {CLASSIFICATIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Version</label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => updateField("version", e.target.value)}
                  placeholder="e.g. 1.0"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors"
                />
              </div>
            </div>

            {/* Review cycle + Next review date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Review cycle</label>
                <div className="relative">
                  <select
                    value={formData.reviewCycle}
                    onChange={(e) => updateField("reviewCycle", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors"
                  >
                    <option value="">Select cycle</option>
                    {REVIEW_CYCLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Next review date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.nextReviewDate}
                    onChange={(e) => updateField("nextReviewDate", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applicable Frameworks - shown after upload */}
      {uploadStatus === "success" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Applicable Frameworks</h3>
          <div className="flex flex-wrap gap-2">
            {FRAMEWORKS.map((fw) => (
              <button
                key={fw}
                onClick={() => toggleFramework(fw)}
                className={clsx(
                  "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
                  selectedFrameworks.includes(fw)
                    ? "bg-white border-gray-200 text-gray-700"
                    : "bg-gray-100 border-gray-200 text-gray-400"
                )}
              >
                <span className={clsx("w-2 h-2 rounded-full", selectedFrameworks.includes(fw) ? "bg-red-500" : "bg-gray-300")} />
                {fw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleCancel}
          className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        {uploadStatus === "success" ? (
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-brand-5 rounded-xl hover:bg-brand-6 transition-colors"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-brand-5 rounded-xl hover:bg-brand-6 transition-colors"
          >
            Upload & Analyze
          </button>
        )}
      </div>

      {/* Cancel confirmation modal */}
      {showCancelModal && (
        <CancelConfirmModal
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
        />
      )}
    </div>
  );
}
