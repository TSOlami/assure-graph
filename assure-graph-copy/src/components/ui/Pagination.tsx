"use client";

import clsx from "clsx";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@lineiconshq/free-icons";

function ChevronLeft({ className }: { className?: string }) {
  return (
    <Lineicons
      icon={ArrowLeftOutlined}
      size={14}
      className={clsx("shrink-0", className)}
      aria-hidden
    />
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <Lineicons
      icon={ArrowRightOutlined}
      size={14}
      className={clsx("shrink-0", className)}
      aria-hidden
    />
  );
}

export interface PaginationProps {
  /** Current page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Optional class for the container */
  className?: string;
}

/**
 * Build page numbers with ellipsis (e.g. [1, 2, "...", 10])
 */
export function getPaginationPages(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "...")[] = [1];
  if (currentPage > 3) pages.push("...");
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  if (currentPage < totalPages - 2) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);
  return [...new Set(pages)];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div
      className={clsx(
        "flex w-full items-center justify-between border-t border-gray-100 px-5 py-3",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft />
        Previous
      </button>

      <div className="flex items-center gap-1.5">
        <span className="text-sm text-gray-500 mr-3">
          Page {currentPage} of {totalPages}
        </span>
        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className="px-1.5 text-sm text-gray-400 select-none" aria-hidden>
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={clsx(
                "w-8 h-8 text-sm rounded-lg transition-colors",
                currentPage === page
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              )}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRight />
      </button>
    </div>
  );
}
