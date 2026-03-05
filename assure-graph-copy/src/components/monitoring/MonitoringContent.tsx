"use client";

import { useState, useMemo } from "react";
import clsx from "clsx";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
  ArrowDownwardOutlined,
  AlignTextLeftOutlined,
  ArrowBothDirectionVertical1Outlined,
} from "@lineiconshq/free-icons";
import { AIBanner } from "@/components/ui/AIBanner";
import {
  MOCK_TESTS,
  MONITORING_STATS,
  type MonitoringTest,
  type TestResult,
} from "@/data/monitoring";
import MonitoringChart from "./MonitoringChart";
import AISidebar from "./AISidebar";
import AIAlertsPanel from "./AIAlertsPanel";
import TestDetailModal from "./TestDetailModal";
import { Pagination } from "../ui/Pagination";

type ActiveModal =
  | { type: "alerts" }
  | { type: "testDetail"; test: MonitoringTest }
  | null;

const ITEMS_PER_PAGE = 10;

function StatBox({
  icon,
  value,
  label,
  valueColor,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  valueColor?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-1 px-5 py-3.5">
      <div className="mb-0.5">{icon}</div>
      <span className={clsx("text-xl font-bold", valueColor || "text-gray-900")}>
        {value}
      </span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

function ResultBadge({ result }: { result: TestResult }) {
  const config = {
    Pass: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
      icon: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4 6L5.5 7.5L8 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    Failed: {
      bg: "bg-red-50",
      text: "text-red-500",
      border: "border-red-200",
      icon: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 2V10H4V6H7L8 2H3Z" fill="currentColor" />
        </svg>
      ),
    },
    Pending: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
      icon: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
        c.text,
        c.border
      )}
    >
      {c.icon}
      {result}
    </span>
  );
}

function ActivityBadge({ activity }: { activity: MonitoringTest["activity"] }) {
  return (
    <span
      className={clsx(
        "text-xs font-medium",
        activity === "Enabled" ? "text-green-600" : "text-gray-400"
      )}
    >
      {activity}
    </span>
  );
}

function FilterDropdown({
  label,
  hasIcon,
}: {
  label: string;
  hasIcon?: boolean;
}) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
      {hasIcon && (
        <Lineicons
          icon={AlignTextLeftOutlined}
          size={14}
          className="text-gray-500"
          aria-hidden
        />
      )}
      {label}
      <Lineicons
        icon={ArrowDownwardOutlined}
        size={12}
        className="text-gray-400"
        aria-hidden
      />
    </button>
  );
}

function SortIcon() {
  return (
    <Lineicons
      icon={ArrowBothDirectionVertical1Outlined}
      size={12}
      className="text-gray-400"
      aria-hidden
    />
  );
}

function AiRiskBadge({ risk }: { risk: number }) {
  const color =
    risk >= 50 ? "text-red-500" : risk >= 20 ? "text-amber-500" : "text-green-600";
  return <span className={clsx("text-sm font-semibold", color)}>{risk}%</span>;
}

export default function MonitoringContent() {
  const [tests] = useState<MonitoringTest[]>(MOCK_TESTS);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [alertDismissed, setAlertDismissed] = useState(false);

  const paginatedList = useMemo(
    () =>
      tests.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [tests, currentPage]
  );

  const totalPages = Math.max(1, Math.ceil(tests.length / ITEMS_PER_PAGE));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === paginatedList.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedList.map((t) => t.id)));
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Continuous Monitoring
          </h1>
          <p className="text-sm text-gray-600">
            Know WHY something failed, not just THAT it failed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModal({ type: "alerts" })}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors"
          >
            AI Alerts
            <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
              0
            </span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-5 text-white text-sm font-medium rounded-lg hover:bg-brand-6 transition-colors">
            Run all test
          </button>
        </div>
      </div>

      {/* Chart + Stats */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <MonitoringChart />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl grid grid-cols-2 lg:w-fit shrink-0">
          <div className="border-r border-b border-gray-200">
            <StatBox
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M2 16L5.5 11L9 13L14 6L20 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 2H20V7" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              value={MONITORING_STATS.compliant}
              label="Compliant"
            />
          </div>
          <div className="border-b border-gray-200">
            <StatBox
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#22c55e" strokeWidth="1.5" />
                  <path d="M7.5 11L10 13.5L14.5 9" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              value={MONITORING_STATS.testPassed}
              label="Test Passed"
            />
          </div>
          <div className="border-r border-gray-200">
            <StatBox
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M11 7V11.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="11" cy="14.5" r="0.75" fill="#f59e0b" />
                </svg>
              }
              value={MONITORING_STATS.testPending}
              label="Test Pending"
            />
          </div>
          <div>
            <StatBox
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2L5 5.5V16.5L11 20L17 16.5V5.5L11 2Z" stroke="#7c3aed" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M11 8V12" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 14L11 12L14 14" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              value={MONITORING_STATS.aiPredictedIssues}
              label="AI Predicted Issues"
              valueColor="text-purple-600"
            />
          </div>
        </div>
      </div>

      {/* AI Predictive Alert Banner */}
      {!alertDismissed && (
        <AIBanner
          variant="warning"
          title="AI Predictive Alerts"
          description="Based on trend analysis, 3 controls are predicted to fail within the next 14 days. Proactive remediation recommended."
          confidence="87% Confident"
          primaryActionLabel="View Predictions"
          onDismiss={() => setAlertDismissed(true)}
        />
      )}

      {/* Main Content Area: Table + Sidebar */}
      <div className="flex gap-4">
        {/* Table Section */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
              <FilterDropdown label="Activity" hasIcon />
              <FilterDropdown label="Result" />
              <FilterDropdown label="Framework" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
              Export as
              <Lineicons
                icon={ArrowDownwardOutlined}
                size={12}
                className="text-gray-400"
                aria-hidden
              />
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/60">
                    <th className="pl-5 pr-2 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={
                          selectedIds.size === paginatedList.length &&
                          paginatedList.length > 0
                        }
                        onChange={toggleAll}
                        className="w-4 h-4 rounded border-gray-300 text-brand-5 focus:ring-brand-5/20 cursor-pointer"
                      />
                    </th>
                    {[
                      { label: "Tests", sort: true },
                      { label: "Test ID", sort: true },
                      { label: "Activity", sort: true },
                      { label: "Results", sort: true },
                      { label: "AI Risk", sort: false },
                      { label: "Linked Frameworks", sort: false },
                      { label: "Last Tested", sort: false },
                    ].map((col) => (
                      <th
                        key={col.label}
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1">
                          {col.label}
                          {col.sort && <SortIcon />}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedList.map((test) => (
                    <tr
                      key={test.id}
                      className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                      onClick={() =>
                        setActiveModal({ type: "testDetail", test })
                      }
                    >
                      <td
                        className="pl-5 pr-2 py-3.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.has(test.id)}
                          onChange={() => toggleSelect(test.id)}
                          className="w-4 h-4 rounded border-gray-300 text-brand-5 focus:ring-brand-5/20 cursor-pointer"
                        />
                      </td>

                      <td className="px-3 py-3.5 max-w-xs">
                        <div>
                          <p className="text-sm font-medium text-gray-900 leading-snug">
                            {test.name}
                          </p>
                          {test.subtext && (
                            <p
                              className={clsx(
                                "text-xs mt-0.5",
                                test.result === "Failed"
                                  ? "text-red-400"
                                  : "text-amber-500"
                              )}
                            >
                              {test.subtext}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-3 py-3.5">
                        <span className="text-sm text-gray-600">
                          {test.testId}
                        </span>
                      </td>

                      <td className="px-3 py-3.5">
                        <ActivityBadge activity={test.activity} />
                      </td>

                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-2">
                          <ResultBadge result={test.result} />
                          {test.result === "Failed" && (
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-brand-5 rounded-md hover:bg-brand-6 transition-colors"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M2 7L5 3.5L6.5 5L10 1.5"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7.5 1.5H10V4"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Fix Now
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="px-3 py-3.5">
                        <AiRiskBadge risk={test.aiRisk} />
                      </td>

                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {test.linkedFrameworks.map((fw) => (
                            <span
                              key={fw}
                              className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5"
                            >
                              {fw}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-3 py-3.5">
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {test.lastTested}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* AI Sidebar */}
        <AISidebar onViewAllAlerts={() => setActiveModal({ type: "alerts" })} />
      </div>

      {/* Modals */}
      {activeModal?.type === "alerts" && (
        <AIAlertsPanel onClose={() => setActiveModal(null)} />
      )}
      {activeModal?.type === "testDetail" && (
        <TestDetailModal
          test={activeModal.test}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
