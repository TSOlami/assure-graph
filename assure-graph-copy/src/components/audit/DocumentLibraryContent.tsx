"use client";

import { useState } from "react";
import clsx from "clsx";
import { DOCUMENTS, DOCUMENT_CATEGORIES, DocumentCategory } from "@/data/audit";
import { StatCard } from "@/components/ui/StatCard";
import { Pagination } from "@/components/ui/Pagination";
import { AIBanner } from "@/components/ui/AIBanner";
import UploadDocumentModal from "./modals/UploadDocumentModal";

const sourceIcons: Record<string, React.ReactNode> = {
  okta: (
    <span className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#2563EB" strokeWidth="1.2" /></svg>
      Okta
    </span>
  ),
  upload: (
    <span className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 10V3M7 3L4.5 5.5M7 3L9.5 5.5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2.5 8.5V11C2.5 11.55 2.95 12 3.5 12H10.5C11.05 12 11.5 11.55 11.5 11V8.5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Manual Upload
    </span>
  ),
  qualys: (
    <span className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="#DC2626" strokeWidth="1.2" /></svg>
      Qualys
    </span>
  ),
  azure: (
    <span className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11L6 2L8 7L12 6L10 12H2Z" stroke="#0078D4" strokeWidth="1.1" strokeLinejoin="round" /></svg>
      Azure
    </span>
  ),
  outlook: (
    <span className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="8" rx="1" stroke="#0078D4" strokeWidth="1.2" /><path d="M1.5 4.5L7 8L12.5 4.5" stroke="#0078D4" strokeWidth="1.2" strokeLinejoin="round" /></svg>
      Outlook
    </span>
  ),
};

export default function DocumentLibraryContent() {
  const [modal, setModal] = useState<"upload" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<DocumentCategory>("All Document");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredDocs = DOCUMENTS.filter((doc) => {
    if (activeCategory !== "All Document" && doc.category !== activeCategory) return false;
    if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedRows.length === filteredDocs.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredDocs.map((d) => d.id));
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 px-6 pt-5 pb-5">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Document Library</h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M13.5 3V6H10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Refresh All
            </button>
            <button
              onClick={() => setModal("upload")}
              className="flex items-center gap-2 px-4 py-2 bg-brand-5 text-white rounded-lg text-sm font-medium hover:bg-brand-6 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 12V4M8 4L5 7M8 4L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 10V13H13V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 bg-[#F5F5F7]">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard value="2,347" label="Total Documents" />
          <StatCard value="1,892" label="Auto-Collected" accentColor="green" variant="accent" />
          <StatCard value="455" label="Manual Upload" />
          <StatCard value="12" label="Categories" />
        </div>

        {/* AI Banner */}
        <AIBanner
          title="Evidence Data Lake Status"
          confidence="91% Confident"
          description="AssureGraph AI has automatically categorized and tagged 1,892 documents from integrated systems. All evidence is refreshed based on your configured frequency settings."
          primaryActionLabel="View Refresh Schedule"
        />

        {/* Content Area */}
        <div className="flex gap-6">
          {/* Categories Sidebar */}
          <div className="w-56 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-1">
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(cat.label)}
                    className={clsx(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                      activeCategory === cat.label
                        ? "bg-brand-0-5 text-brand-5 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <span>{cat.label}</span>
                    <span className={clsx(
                      "text-xs font-medium",
                      activeCategory === cat.label ? "text-brand-5" : "text-gray-400"
                    )}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search document..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:border-brand-5 bg-white"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1.5 3H12.5M3.5 7H10.5M5.5 11H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Type
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Source
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                AI Tagged
              </button>
              <div className="ml-auto">
                <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 3V10M7 10L4 7M7 10L10 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 12H11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Download
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === filteredDocs.length && filteredDocs.length > 0}
                        onChange={toggleAll}
                        className="w-4 h-4 rounded border-gray-300 "
                      />
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1">
                        Document Name
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 2V10M6 2L3.5 4.5M6 2L8.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Source</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Size</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Uploaded</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(doc.id)}
                          onChange={() => toggleRow(doc.id)}
                          className="w-4 h-4 rounded border-gray-300 "
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={clsx(
                            "w-8 h-8 rounded flex items-center justify-center text-[9px] font-bold shrink-0",
                            doc.type === "pdf" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                          )}>
                            {doc.type === "pdf" ? "PDF" : "TXT"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <div className="flex items-center gap-1.5">
                              {doc.code && <span className="text-xs text-gray-500">{doc.code}</span>}
                              {doc.aiTagged && (
                                <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium">AI</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {sourceIcons[doc.sourceIcon] || doc.source}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{doc.size}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 text-sm text-gray-500">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {doc.uploaded}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal === "upload" && <UploadDocumentModal onClose={() => setModal(null)} />}
    </div>
  );
}
