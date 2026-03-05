"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Priority, Status } from "@/components/task/TaskCard";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NewTaskPayload {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  comment: string;
}

export interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (payload: NewTaskPayload) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIORITIES: Priority[] = ["Low", "Medium", "High"];
const STATUSES: Status[] = ["To-Do", "In-Progress", "Completed", "Overdue"];

const PRIORITY_STYLE: Record<Priority, { text: string; hex: string }> = {
  Low: { text: "text-blue-600", hex: "#3b82f6" },
  Medium: { text: "text-orange-600", hex: "#f97316" },
  High: { text: "text-red-600", hex: "#ef4444" },
};

const STATUS_STYLE: Record<Status, string> = {
  "To-Do": "text-gray-600",
  "In-Progress": "text-blue-600",
  Completed: "text-green-600",
  Overdue: "text-red-600",
};

// ─── Inline dropdown ──────────────────────────────────────────────────────────

function SimpleDropdown<T extends string>({
  value,
  options,
  onChange,
  renderTrigger,
  renderItem,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
  renderTrigger: (v: T) => React.ReactNode;
  renderItem: (v: T) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-xs font-medium"
      >
        {renderTrigger(value)}
        <i
          className="lni lni-chevron-down text-[10px]"
          style={{ color: "#9ca3af" }}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-[61] min-w-[130px] overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors",
                  opt === value ? "bg-gray-50 font-semibold" : "",
                )}
              >
                {renderItem(opt)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AddTaskModal({ open, onClose, onSave }: AddTaskModalProps) {
  const [title, setTitle] = useState("Task title");
  const [editingTitle, setEditingTitle] = useState(false);
  const [desc, setDesc] = useState("Description of task");
  const [editingDesc, setEditingDesc] = useState(false);
  const [priority, setPriority] = useState<Priority>("Low");
  const [status, setStatus] = useState<Status>("To-Do");
  const [dueDate, setDueDate] = useState("");
  const [comment, setComment] = useState("");

  if (!open) return null;

  const pStyle = PRIORITY_STYLE[priority];

  function handleSave() {
    onSave?.({ title, description: desc, priority, status, dueDate, comment });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[360px] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3.5 border-b border-gray-100 shrink-0">
          <h2 className="text-sm font-semibold text-gray-900">Add task</h2>
          <button
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className="lni lni-close text-sm" style={{ color: "#6b7280" }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Title + description */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {editingTitle ? (
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setEditingTitle(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
                  className="flex-1 text-sm font-semibold text-gray-900 outline-none border-b border-brand-5 pb-0.5"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-900">
                  {title}
                </span>
              )}
              <button
                onClick={() => setEditingTitle(true)}
                className="p-0.5 rounded hover:bg-gray-100"
              >
                <i
                  className="lni lni-pencil text-xs"
                  style={{ color: "#9ca3af" }}
                />
              </button>
            </div>
            <div className="flex items-center gap-2">
              {editingDesc ? (
                <input
                  autoFocus
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  onBlur={() => setEditingDesc(false)}
                  onKeyDown={(e) => e.key === "Enter" && setEditingDesc(false)}
                  className="flex-1 text-xs text-gray-500 outline-none border-b border-gray-300 pb-0.5"
                />
              ) : (
                <span className="text-xs text-gray-500">{desc}</span>
              )}
              <button
                onClick={() => setEditingDesc(true)}
                className="p-0.5 rounded hover:bg-gray-100"
              >
                <i
                  className="lni lni-pencil text-xs"
                  style={{ color: "#9ca3af" }}
                />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Meta fields */}
          <div className="space-y-3">
            {/* Priority */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 w-28 shrink-0">
                <i
                  className="lni lni-flag text-sm"
                  style={{ color: "#9ca3af" }}
                />
                <span className="text-xs text-gray-500">Priority:</span>
              </div>
              <SimpleDropdown
                value={priority}
                options={PRIORITIES}
                onChange={setPriority}
                renderTrigger={(v) => (
                  <span
                    className={cn(
                      "flex items-center gap-1",
                      PRIORITY_STYLE[v].text,
                    )}
                  >
                    <i
                      className="lni lni-flag text-xs"
                      style={{ color: PRIORITY_STYLE[v].hex }}
                    />
                    {v}
                  </span>
                )}
                renderItem={(v) => (
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      PRIORITY_STYLE[v].text,
                    )}
                  >
                    <i
                      className="lni lni-flag text-xs"
                      style={{ color: PRIORITY_STYLE[v].hex }}
                    />
                    {v}
                  </span>
                )}
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 w-28 shrink-0">
                <i
                  className="lni lni-checkmark-circle text-sm"
                  style={{ color: "#9ca3af" }}
                />
                <span className="text-xs text-gray-500">Status:</span>
              </div>
              <SimpleDropdown
                value={status}
                options={STATUSES}
                onChange={setStatus}
                renderTrigger={(v) => (
                  <span className={STATUS_STYLE[v]}>{v}</span>
                )}
                renderItem={(v) => <span className={STATUS_STYLE[v]}>{v}</span>}
              />
            </div>

            {/* Due date */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 w-28 shrink-0">
                <i
                  className="lni lni-calendar text-sm"
                  style={{ color: "#9ca3af" }}
                />
                <span className="text-xs text-gray-500">Due date:</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-gray-200 bg-white">
                {dueDate ? (
                  <span className="text-xs text-gray-700">{dueDate}</span>
                ) : (
                  <span className="text-xs text-gray-400">Choose date</span>
                )}
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="sr-only"
                  id="task-due-date"
                />
                <label htmlFor="task-due-date" className="cursor-pointer">
                  <i
                    className="lni lni-calendar text-xs"
                    style={{ color: "#9ca3af" }}
                  />
                </label>
              </div>
            </div>

            {/* Assigned to */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 w-28 shrink-0">
                <i
                  className="lni lni-user text-sm"
                  style={{ color: "#9ca3af" }}
                />
                <span className="text-xs text-gray-500">Assigned to:</span>
              </div>
              <button
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed border-gray-300 text-xs font-medium hover:border-gray-400 transition-colors"
                style={{ color: "#f05a35" }}
              >
                <i
                  className="lni lni-user-add text-xs"
                  style={{ color: "#f05a35" }}
                />
                Assign
                <i
                  className="lni lni-chevron-down text-xs"
                  style={{ color: "#f05a35" }}
                />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Attachment */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2.5">
              Attachment
            </p>
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                  <i
                    className="lni lni-files text-sm"
                    style={{ color: "#9ca3af" }}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700">
                    Attach file
                  </p>
                  <p className="text-[11px] text-gray-400">
                    Upload to add attachment
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-700 border border-gray-200 bg-white rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                <i
                  className="lni lni-upload text-xs"
                  style={{ color: "#6b7280" }}
                />
                Upload
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Comment */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Comment</p>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus-within:border-gray-300 focus-within:bg-white transition-colors">
              <input
                type="text"
                placeholder="Type here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 text-xs bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              />
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-yellow-100 hover:bg-yellow-200 transition-colors">
                  <i
                    className="lni lni-emoji-smile text-sm"
                    style={{ color: "#f59e0b" }}
                  />
                </button>
                <button
                  className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                  style={{ backgroundColor: "#f05a35" }}
                >
                  <i
                    className="lni lni-arrow-up text-sm"
                    style={{ color: "#fff" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#111827" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
