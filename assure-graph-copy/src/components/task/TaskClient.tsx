"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TaskTab, type Tabs } from "@/components/task/TaskTab";
import { TaskCard, type Task, type Status } from "@/components/task/TaskCard";
import { TaskTable } from "@/components/task/TaskTable";
import { AddTaskModal } from "@/components/task/modals/AddTaskModal";
import { AIPrioritizerModal } from "@/components/task/modals/AIPrioritizerModal";

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Medium",
    dueDate: "13 Dec 2025",
    status: "To-Do",
    linkedCount: 3,
    assignees: [{ name: "Alice" }, { name: "Bob" }, { name: "Carol" }],
    files: 1,
    comments: 2,
  },
  {
    id: "2",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Low",
    dueDate: "13 Dec 2025",
    status: "To-Do",
    linkedCount: 3,
    assignees: [{ name: "Dave" }, { name: "Eve" }, { name: "Frank" }],
    files: 1,
    comments: 2,
  },
  {
    id: "3",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Low",
    dueDate: "13 Dec 2025",
    status: "To-Do",
    linkedCount: 3,
    assignees: [{ name: "Grace" }],
    files: 1,
    comments: 2,
  },
  {
    id: "4",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Low",
    dueDate: "13 Dec 2025",
    status: "In-Progress",
    linkedCount: 3,
    assignees: [{ name: "Alice" }, { name: "Bob" }, { name: "Carol" }],
    files: 1,
    comments: 2,
  },
  {
    id: "5",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Medium",
    dueDate: "13 Dec 2025",
    status: "In-Progress",
    linkedCount: 3,
    assignees: [{ name: "Dave" }, { name: "Eve" }],
    files: 1,
    comments: 2,
    isOverdue: true,
  },
  {
    id: "6",
    title: "Task Title",
    description: "Description of task here...",
    priority: "High",
    dueDate: "13 Dec 2025",
    status: "In-Progress",
    linkedCount: 3,
    assignees: [{ name: "Alice" }],
    files: 1,
    comments: 2,
  },
  {
    id: "7",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Low",
    dueDate: "13 Dec 2025",
    status: "Completed",
    linkedCount: 3,
    assignees: [{ name: "Alice" }, { name: "Bob" }, { name: "Carol" }],
    files: 1,
    comments: 2,
  },
  {
    id: "8",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Medium",
    dueDate: "13 Dec 2025",
    status: "Completed",
    linkedCount: 3,
    assignees: [{ name: "Dave" }, { name: "Eve" }, { name: "Frank" }],
    files: 1,
    comments: 2,
  },
  {
    id: "9",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Low",
    dueDate: "25-01-2025",
    status: "Completed",
    assignees: [{ name: "Alice" }, { name: "Bob" }],
    comments: 2,
  },
  {
    id: "10",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Medium",
    dueDate: "05-04-2025",
    status: "In-Progress",
    assignees: [{ name: "Carol" }, { name: "Dave" }],
    comments: 2,
  },
  {
    id: "11",
    title: "Task Title",
    description: "Description of task here...",
    priority: "Low",
    dueDate: "01-06-2025",
    status: "Overdue",
    assignees: [{ name: "Eve" }],
    comments: 2,
    isOverdue: true,
  },
  {
    id: "12",
    title: "Task Title",
    description: "Description of task here...",
    priority: "High",
    dueDate: "18-08-2025",
    status: "To-Do",
    assignees: [{ name: "Frank" }, { name: "Grace" }],
    comments: 2,
  },
];

const COLUMN_STATUSES: {
  status: Status;
  label: string;
  textColor: string;
  iconColor: string;
}[] = [
  {
    status: "To-Do",
    label: "To-Do",
    textColor: "text-purple-600",
    iconColor: "#9333ea",
  },
  {
    status: "In-Progress",
    label: "In-Progress",
    textColor: "text-amber-600",
    iconColor: "#d97706",
  },
  {
    status: "Completed",
    label: "Completed",
    textColor: "text-green-600",
    iconColor: "#16a34a",
  },
  {
    status: "Overdue",
    label: "Overdue",
    textColor: "text-red-600",
    iconColor: "#dc2626",
  },
];

function ColumnView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[calc(100vh-220px)]">
      {COLUMN_STATUSES.map(({ status, label, textColor, iconColor }) => {
        const colTasks = tasks.filter((t) => t.status === status);
        return (
          <div key={status} className="shrink-0 w-70">
            <div className="flex items-center justify-between border border-gray-200 mb-3 py-3 rounded-lg px-2">
              <div className="flex items-center gap-2">
                <i
                  className="lni lni-flag text-sm"
                  style={{ color: iconColor }}
                />
                <span className={cn("text-sm font-semibold", textColor)}>
                  {label}
                </span>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 rounded-full px-1.5 py-0.5">
                  {colTasks.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-800 hover:text-gray-600"
              >
                <i className="lni lni-plus text-sm" />
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {colTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {colTasks.length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-xl h-24 flex items-center justify-center">
                  <p className="text-xs text-gray-400">No tasks</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const PAGE_SIZE = 9;

function TableView({ tasks }: { tasks: Task[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);
  const paginated = tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/60">
              <th className="pl-4 pr-2 py-3 w-8">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
              </th>
              {[
                ["Task & Description", true],
                ["Due date", true],
                ["Priority", true],
                ["Status", true],
                ["Assigned to", false],
                ["", false],
              ].map(([col, sortable], i) => (
                <th
                  key={i}
                  className="px-3 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap"
                >
                  {sortable ? (
                    <button className="inline-flex items-center gap-1 hover:text-gray-700 transition-colors">
                      {col}
                      <i className="lni lni-sort-amount-asc text-xs" />
                    </button>
                  ) : (
                    col
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.map((task) => (
              <TaskTable key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 px-1">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-sm font-medium"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <i className="lni lni-chevron-left text-sm" />
          Previous
        </Button>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>Page</span>
          <span className="font-semibold text-gray-800">{page}</span>
          <span>of</span>
          <span className="font-semibold text-gray-800">{totalPages}</span>
          <div className="flex items-center gap-1 ml-2">
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "w-7 h-7 rounded-md text-sm font-medium transition-colors",
                    page === p
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-100",
                  )}
                >
                  {p}
                </button>
              );
            })}
            {totalPages > 3 && (
              <>
                <span className="text-gray-400">…</span>
                <button
                  onClick={() => setPage(totalPages)}
                  className={cn(
                    "w-7 h-7 rounded-md text-sm font-medium transition-colors",
                    page === totalPages
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-100",
                  )}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-sm font-medium"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
          <i className="lni lni-chevron-right text-sm" />
        </Button>
      </div>
    </div>
  );
}

export default function TaskClient() {
  const [activeTab, setActiveTab] = useState<Tabs>("All Task");
  const [viewMode, setViewMode] = useState<"column" | "table">("column");
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [aiPrioritizerOpen, setAIPrioritizerOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    if (activeTab === "All Task") return MOCK_TASKS;
    return MOCK_TASKS.filter((t) => t.status === activeTab);
  }, [activeTab]);

  const tabCounts = useMemo(
    () => ({
      "All Task": MOCK_TASKS.length,
      "To-Do": MOCK_TASKS.filter((t) => t.status === "To-Do").length,
      "In-Progress": MOCK_TASKS.filter((t) => t.status === "In-Progress")
        .length,
      Completed: MOCK_TASKS.filter((t) => t.status === "Completed").length,
      Overdue: MOCK_TASKS.filter((t) => t.status === "Overdue").length,
    }),
    [],
  );

  return (
    <div className="min-h-screen">
      {/* Modals */}
      <AddTaskModal open={addTaskOpen} onClose={() => setAddTaskOpen(false)} />
      <AIPrioritizerModal
        open={aiPrioritizerOpen}
        onClose={() => setAIPrioritizerOpen(false)}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Task</h1>
            <p className="text-sm text-gray-600">
              Monitor all your task in one place.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-1.5 border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-lg"
              onClick={() => setAIPrioritizerOpen(true)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 10L13.25 11.75L15 12.5L13.25 13.25L12.5 15L11.75 13.25L10 12.5L11.75 11.75L12.5 10Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              AI Prioritizer
            </Button>
            <Button
              className="gap-1.5 bg-brand-5 hover:bg-gray-800 text-white rounded-lg"
              onClick={() => setAddTaskOpen(true)}
            >
              <i className="lni lni-plus text-sm" />
              New task
            </Button>
          </div>
        </div>

        <div className="flex items-end justify-between mb-5">
          <TaskTab
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={tabCounts}
          />
          <div className="flex items-center gap-3 mb-0.5">
            <p className="text-sm text-gray-500">View as:</p>
            <button
              onClick={() => setViewMode("column")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                viewMode === "column"
                  ? "bg-gray-50 border border-gray-200 text-gray-800"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              <i className="lni lni-grid-alt text-sm" />
              Column
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                viewMode === "table"
                  ? "bg-gray-50 border border-gray-200 text-gray-800"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              <i className="lni lni-list text-sm" />
              Table
            </button>
          </div>
        </div>

        {viewMode === "column" ? (
          <ColumnView tasks={filteredTasks} />
        ) : (
          <TableView tasks={filteredTasks} />
        )}
      </div>
    </div>
  );
}
