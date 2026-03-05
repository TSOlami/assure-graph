"use client";

import { useState } from "react";
import clsx from "clsx";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
  XmarkOutlined,
  ArrowRightOutlined,
  Spinner3Outlined,
} from "@lineiconshq/free-icons";
import type { MonitoringTest } from "@/data/monitoring";
import { Loader } from "@/components/global/Loader";

interface TestDetailModalProps {
  test: MonitoringTest;
  onClose: () => void;
}

function ResultBadge({ result }: { result: MonitoringTest["result"] }) {
  const config = {
    Pass: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M11.667 3.5L5.25 9.917L2.333 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    Failed: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-500",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L1 13H13L7 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 5.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="7" cy="10" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
    Pending: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-600",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  };

  const c = config[result];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border",
        c.bg,
        c.border,
        c.text
      )}
    >
      {c.icon}
      {result}
    </span>
  );
}

function AIPredictionCard({
  test,
  onDismiss,
}: {
  test: MonitoringTest;
  onDismiss: () => void;
}) {
  const prediction = test.aiPrediction;

  const severityConfig = {
    critical: {
      bg: "bg-red-50",
      border: "border-red-200",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L2 18H18L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="14" r="0.75" fill="currentColor" />
        </svg>
      ),
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L2 18H18L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="14" r="0.75" fill="currentColor" />
        </svg>
      ),
    },
    stable: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  };

  const sc = severityConfig[prediction.severity];
  const confidenceColor =
    prediction.severity === "critical"
      ? "text-red-500 bg-red-50 border-red-200"
      : prediction.severity === "warning"
        ? "text-amber-600 bg-amber-50 border-amber-200"
        : "text-green-600 bg-green-50 border-green-200";

  return (
    <div
      className={clsx(
        "rounded-xl border px-4 py-3.5 flex items-start gap-3",
        sc.bg,
        sc.border
      )}
    >
      <div
        className={clsx(
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          sc.iconBg,
          sc.iconColor
        )}
      >
        {sc.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-gray-900">
            AI Prediction
          </span>
          <span
            className={clsx(
              "text-[10px] font-semibold px-2 py-0.5 rounded border",
              confidenceColor
            )}
          >
            {prediction.confidence}% Confident
          </span>
        </div>
        <p className="text-sm text-gray-600">{prediction.message}</p>
        {prediction.showMore && (
          <button className="text-sm font-medium text-gray-900 mt-1 hover:underline">
            Show more
          </button>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="p-0.5 text-gray-400 hover:text-gray-600 shrink-0"
      >
        <Lineicons icon={XmarkOutlined} size={16} aria-hidden />
      </button>
    </div>
  );
}

function RelatedIssueCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50/50 px-4 py-3 cursor-pointer hover:bg-green-50 transition-colors">
      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0 text-green-600">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-green-700">{title}</p>
        <p className="text-xs text-green-600">{subtitle}</p>
      </div>
      <Lineicons
        icon={ArrowRightOutlined}
        size={16}
        className="text-green-500 shrink-0"
        aria-hidden
      />
    </div>
  );
}

export default function TestDetailModal({
  test,
  onClose,
}: TestDetailModalProps) {
  const [showPrediction, setShowPrediction] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const handleRerun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  if (isRunning) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-12 flex flex-col items-center">
          <Loader label="Please wait..." />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Test</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Lineicons icon={XmarkOutlined} size={20} aria-hidden />
            </button>
          </div>

          <div className="flex items-start justify-between gap-3 mb-5">
            <p className="text-base font-medium text-gray-900 leading-snug">
              {test.name}
            </p>
            <ResultBadge result={test.result} />
          </div>

          {showPrediction && (
            <div className="mb-5">
              <AIPredictionCard
                test={test}
                onDismiss={() => setShowPrediction(false)}
              />
            </div>
          )}

          <div className="mb-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Related Issues
            </h3>
            <div className="space-y-2.5">
              <RelatedIssueCard
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2C4.686 2 2 4.686 2 8C2 11.314 4.686 14 8 14C11.314 14 14 11.314 14 8C14 4.686 11.314 2 8 2Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M8 11H8.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                }
                title={`Control ${test.controlId}`}
                subtitle="View Control Details"
              />
              <RelatedIssueCard
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M6 5.5H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M6 8H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M6 10.5H8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                }
                title={`Evidence ${test.evidenceId}`}
                subtitle="View Evidence Details"
              />
            </div>
          </div>
        </div>

        <div className="px-6 pb-5 flex items-center gap-3">
          <button
            onClick={handleRerun}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Lineicons icon={Spinner3Outlined} size={16} aria-hidden />
            Re-run Test
          </button>
          {test.result === "Failed" && (
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-5 rounded-lg hover:bg-brand-6 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6.5 4.5L8 6.5L13 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 2H13V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Fix Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
