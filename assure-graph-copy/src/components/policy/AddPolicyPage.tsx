"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type UploadState = "idle" | "uploading" | "success";

interface UploadedFile {
  name: string;
  size: number;
}

export default function AddPolicyPage() {
  const router = useRouter();
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Form state
  const [documentName, setDocumentName] = useState("ISMS Policy Document");
  const [assignedOwner, setAssignedOwner] = useState("Ruth Nwadike");
  const [approver, setApprover] = useState("Serhmy Alex");
  const [classification, setClassification] = useState("Internal");
  const [version, setVersion] = useState("1.0");
  const [reviewCycle, setReviewCycle] = useState("Annually");
  const [nextReviewDate, setNextReviewDate] = useState("12-12-2026");
  const [frameworks, setFrameworks] = useState<string[]>([
    "SOC 2",
    "ISO 27001",
    "NIST",
    "GDPR",
    "HIPAA",
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: file.size,
      });

      // Simulate upload
      setUploadState("uploading");
      setTimeout(() => {
        setUploadState("success");
      }, 2000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: file.size,
      });
      setUploadState("uploading");
      setTimeout(() => {
        setUploadState("success");
      }, 2000);
    }
  };

  const handleCancel = () => {
    if (uploadState === "success") {
      setShowCancelDialog(true);
    } else {
      router.back();
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);
    router.back();
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Submitting policy...");
    router.back();
  };

  const formatFileSize = (bytes: number) => {
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <i className="lni lni-chevron-left text-sm"></i>
            <span className="text-sm font-medium">Upload Policy</span>
          </button>
          <p className="text-sm text-gray-600">
            Complete steps to add policy document.
          </p>
        </div>

        {/* Upload Area */}
        {uploadState === "idle" && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="bg-white rounded-lg border-2 border-dashed border-gray-200 p-12 text-center mb-6"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="lni lni-upload text-gray-600 text-xl"></i>
              </div>

              <div>
                <p className="text-sm text-gray-900 mb-1">
                  <label
                    htmlFor="file-upload"
                    className="text-brand-5 cursor-pointer hover:text-brand-6"
                  >
                    Click to upload
                  </label>
                  {" or drag and drop"}
                </p>
                <p className="text-xs text-gray-500">
                  PDF, TXT or DOCX (max. 4MB)
                </p>
              </div>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.txt,.docx"
                onChange={handleFileUpload}
              />
            </div>

            {/* AI Analysis Info */}
            <div className="mt-6 p-3 bg-amber-50 rounded-lg flex items-start gap-3 text-left max-w-md mx-auto">
              <i className="lni lni-bulb text-amber-600 text-lg shrink-0 mt-0.5"></i>
              <div className="text-sm text-amber-800">
                <span className="font-semibold">AI Analysis</span>
                <p className="mt-1">
                  After upload AI will automatically detect content, reference
                  requirements, and suggest framework mapping.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 max-w-md mx-auto">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                disabled
                className="flex-1 bg-brand-5 hover:bg-brand-6 text-white"
              >
                Upload & Analyze
              </Button>
            </div>
          </div>
        )}

        {/* Uploading/Success State */}
        {(uploadState === "uploading" || uploadState === "success") && (
          <div className="space-y-6">
            {/* Upload Progress */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="lni lni-checkmark text-green-600 text-2xl"></i>
                </div>

                <div className="text-center w-full">
                  <p className="text-sm font-medium text-gray-900 mb-3">
                    Uploading Successful...
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: uploadState === "success" ? "100%" : "60%",
                      }}
                    ></div>
                  </div>

                  {/* File info */}
                  {uploadedFile && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <i className="lni lni-files text-gray-600 text-xl"></i>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">
                            Statement of applicability
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(uploadedFile.size)}
                          </p>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <i className="lni lni-trash text-red-500 text-lg"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Document Details Form */}
            {uploadState === "success" && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <i className="lni lni-files text-gray-700 text-xl"></i>
                    <h3 className="text-base font-semibold text-gray-900">
                      Document details
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Fill the information of document.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Document Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document name
                    </label>
                    <input
                      type="text"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-5 focus:border-transparent"
                    />
                  </div>

                  {/* Assigned Owner & Approver */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assigned Owner
                      </label>
                      <Select
                        value={assignedOwner}
                        onValueChange={setAssignedOwner}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ruth Nwadike">
                            Ruth Nwadike
                          </SelectItem>
                          <SelectItem value="John Doe">John Doe</SelectItem>
                          <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Approver
                      </label>
                      <Select value={approver} onValueChange={setApprover}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Serhmy Alex">
                            Serhmy Alex
                          </SelectItem>
                          <SelectItem value="Alice Brown">
                            Alice Brown
                          </SelectItem>
                          <SelectItem value="Bob Wilson">Bob Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Classification & Version */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Classification
                      </label>
                      <Select
                        value={classification}
                        onValueChange={setClassification}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Internal">Internal</SelectItem>
                          <SelectItem value="Confidential">
                            Confidential
                          </SelectItem>
                          <SelectItem value="Public">Public</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Version
                      </label>
                      <input
                        type="text"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-5 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Review Cycle & Next Review Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review cycle
                      </label>
                      <Select
                        value={reviewCycle}
                        onValueChange={setReviewCycle}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Annually">Annually</SelectItem>
                          <SelectItem value="Bi-annually">
                            Bi-annually
                          </SelectItem>
                          <SelectItem value="Quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Next review date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={nextReviewDate}
                          onChange={(e) => setNextReviewDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-5 focus:border-transparent"
                        />
                        <i className="lni lni-calendar absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applicable Frameworks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Applicable Frameworks
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {frameworks.map((framework) => (
                      <span
                        key={framework}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-medium"
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        {framework}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-brand-5 hover:bg-brand-6 text-white"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <i className="lni lni-warning text-red-500 text-3xl"></i>
            </div>

            <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">
              Are you sure you want to cancel?
            </DialogTitle>

            <DialogDescription className="text-sm text-gray-600 mb-6">
              By cancelling this, you will lose all the progress and this action
              cannot be undone.
            </DialogDescription>

            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => setShowCancelDialog(false)}
                className="flex-1"
              >
                No, don't cancel
              </Button>
              <Button
                onClick={handleConfirmCancel}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                Yes, cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
