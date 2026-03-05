// TaskDetailDrawer.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Task } from "./TaskCard";

// ─── Internal types ───────────────────────────────────────────────────────────

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  time: string;
  text: string;
  reactions?: { emoji: string; count: number }[];
  replies?: number;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "Ruth Amakiri",
    time: "6h ago",
    text: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share just you and the engineering team hitting as the DPO",
    reactions: [
      { emoji: "👍", count: 4 },
      { emoji: "🔥", count: 5 },
    ],
    replies: 5,
  },
  {
    id: "2",
    author: "Mufi Ibe",
    time: "4h ago",
    text: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share just you and the engineering team hitting as the DPO",
    replies: 0,
  },
  {
    id: "3",
    author: "Ruth Amakiri",
    time: "2h ago",
    text: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share just you and the engineering team hitting as the DPO",
  },
];

const MOCK_ATTACHMENTS: Attachment[] = [
  { id: "1", name: "Statement of applicability", type: "Other" },
];

// ─── Config maps ──────────────────────────────────────────────────────────────

const priorityColors: Record<
  string,
  { bg: string; text: string; border: string; hex: string }
> = {
  Low: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    hex: "#3b82f6",
  },
  Medium: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    hex: "#f97316",
  },
  High: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    hex: "#ef4444",
  },
};

const statusColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  "To-Do": {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
  },
  "In-Progress": {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  Completed: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
  },
  Overdue: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
};

// ─── Comment bubble ───────────────────────────────────────────────────────────

function CommentBubble({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-3">
      <Avatar className="h-7 w-7 shrink-0 mt-0.5">
        <AvatarImage src={comment.avatar} />
        <AvatarFallback className="bg-gray-100 text-gray-600 text-[10px] font-semibold">
          {comment.author.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-gray-900">
            {comment.author}
          </span>
          <span className="text-[11px] text-gray-400">· {comment.time}</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">{comment.text}</p>
        <div className="flex items-center gap-3 mt-2">
          {comment.reactions && (
            <div className="flex items-center gap-1.5">
              {comment.reactions.map((r) => (
                <span
                  key={r.emoji}
                  className="flex items-center gap-0.5 text-[11px] bg-gray-100 rounded-full px-1.5 py-0.5 text-gray-600"
                >
                  {r.emoji} {r.count}
                </span>
              ))}
            </div>
          )}
          <button className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors">
            Reply
          </button>
          {!!comment.replies && (
            <span className="text-[11px] text-gray-400">
              {comment.replies} Replies
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Props & export ───────────────────────────────────────────────────────────

export interface TaskDetailDrawerProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

export function TaskDetailDrawer({
  task,
  open,
  onClose,
}: TaskDetailDrawerProps) {
  const [comment, setComment] = useState("");
  const [aiDismissed, setAiDismissed] = useState(false);

  if (!task) return null;

  const pCol = priorityColors[task.priority] ?? priorityColors.Low;
  const sCol = statusColors[task.status] ?? statusColors["To-Do"];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 z-40 transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 shrink-0">
          <button className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
            <i
              className="lni lni-trash-can text-sm"
              style={{ color: "#ef4444" }}
            />
            Delete task
          </button>
          <div className="flex items-center gap-2">
            <button className="text-xs font-semibold text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
              Save changes
            </button>
            <button
              onClick={onClose}
              className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <i
                className="lni lni-close text-sm"
                style={{ color: "#6b7280" }}
              />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">
          {/* AI Recommendation banner */}
          {!aiDismissed && (
            <div className="mx-5 mt-4 rounded-xl border border-orange-200 bg-orange-50 p-3.5 flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                <i
                  className="lni lni-bulb text-sm"
                  style={{ color: "#f97316" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-gray-900">
                    AI Recommendation
                  </span>
                  <span className="text-[10px] font-semibold bg-orange-200 text-orange-700 px-1.5 py-0.5 rounded-full">
                    98% Confident
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Exception expired 3 days ago – Immediate action required
                </p>
                <button
                  className="mt-1.5 text-xs font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
                  style={{ color: "#f05a35" }}
                >
                  View Prediction Details
                  <i
                    className="lni lni-arrow-top-right text-xs"
                    style={{ color: "#f05a35" }}
                  />
                </button>
              </div>
              <button
                onClick={() => setAiDismissed(true)}
                className="shrink-0 h-5 w-5 flex items-center justify-center rounded hover:bg-orange-100 transition-colors"
              >
                <i
                  className="lni lni-close text-xs"
                  style={{ color: "#9ca3af" }}
                />
              </button>
            </div>
          )}

          {/* Title + description */}
          <div className="px-5 mt-5">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-base font-bold text-gray-900 leading-snug flex-1">
                {task.title}
              </h2>
              <button className="shrink-0 mt-0.5 p-1 rounded hover:bg-gray-100 transition-colors">
                <i
                  className="lni lni-pencil text-sm"
                  style={{ color: "#9ca3af" }}
                />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* Meta fields */}
          <div className="px-5 mt-5 space-y-3.5">
            {/* Priority */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-24 shrink-0">
                Priority:
              </span>
              <button
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border",
                  pCol.bg,
                  pCol.text,
                  pCol.border,
                )}
              >
                <i
                  className="lni lni-flag text-xs"
                  style={{ color: pCol.hex }}
                />
                {task.priority}
                <i
                  className="lni lni-chevron-down text-xs"
                  style={{ color: pCol.hex }}
                />
              </button>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-24 shrink-0">
                Status:
              </span>
              <button
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border",
                  sCol.bg,
                  sCol.text,
                  sCol.border,
                )}
              >
                <i className="lni lni-checkmark-circle text-xs" />
                {task.status}
                <i className="lni lni-chevron-down text-xs" />
              </button>
            </div>

            {/* Due date */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-24 shrink-0">
                Due date:
              </span>
              <div className="flex items-center gap-1.5">
                <i
                  className="lni lni-calendar text-sm"
                  style={{ color: "#9ca3af" }}
                />
                <span className="text-xs font-medium text-gray-700">
                  {task.dueDate}
                </span>
              </div>
            </div>

            {/* Assigned to */}
            <div className="flex items-start gap-3">
              <span className="text-xs text-gray-400 w-24 shrink-0 mt-1">
                Assigned to:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center -space-x-1.5">
                  {task.assignees.map((a, i) => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={a.avatar} />
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-[10px] font-semibold">
                        {a.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {task.assignees.map((a) => a.name).join(", ")}
                </span>
                <button>
                  <i
                    className="lni lni-chevron-down text-xs"
                    style={{ color: "#9ca3af" }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mx-5 mt-5 border-t border-gray-100" />

          {/* Attachments */}
          <div className="px-5 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-700">
                Attachments{" "}
                <span className="text-gray-400 font-normal">
                  {MOCK_ATTACHMENTS.length} file
                </span>
              </span>
              <button
                className="flex items-center gap-1 text-xs font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#f05a35" }}
              >
                <i
                  className="lni lni-plus text-xs"
                  style={{ color: "#f05a35" }}
                />
                Add Item
              </button>
            </div>
            <div className="space-y-2">
              {MOCK_ATTACHMENTS.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50 group/att"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center">
                      <i
                        className="lni lni-files text-sm"
                        style={{ color: "#6b7280" }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {att.name}
                      </p>
                      <p className="text-[11px] text-gray-400">{att.type}</p>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover/att:opacity-100 transition-opacity">
                    <i
                      className="lni lni-download text-sm"
                      style={{ color: "#9ca3af" }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-5 mt-4 border-t border-gray-100" />

          {/* Comments */}
          <div className="px-5 mt-4 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-gray-700">
                Comments
              </span>
              <span className="text-[11px] text-gray-500 bg-gray-100 rounded-full px-1.5 py-0.5">
                {MOCK_COMMENTS.length} new
              </span>
            </div>
            <div className="space-y-5">
              {MOCK_COMMENTS.map((c) => (
                <CommentBubble key={c.id} comment={c} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Comment input ── */}
        <div className="px-5 py-3.5 border-t border-gray-100 shrink-0">
          <span className="text-xs font-semibold text-gray-700 block mb-2">
            Comment
          </span>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-colors">
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
    </>
  );
}

interface StatItem {
  icon: string;
  iconBg: string;
  iconColor: string;
  trend: string;
  trendColor: string;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: "lni-database",
    iconBg: "bg-blue-50",
    iconColor: "#3b82f6",
    trend: "+40%",
    trendColor: "text-green-500",
    value: "64/89",
    label: "Controls",
  },
  {
    icon: "lni-users",
    iconBg: "bg-red-50",
    iconColor: "#f97316",
    trend: "+5%",
    trendColor: "text-green-500",
    value: "45",
    label: "Team members",
  },
  {
    icon: "lni-folder",
    iconBg: "bg-green-50",
    iconColor: "#22c55e",
    trend: "+10%",
    trendColor: "text-green-500",
    value: "156",
    label: "Evidence Item",
  },
  {
    icon: "lni-folder",
    iconBg: "bg-orange-50",
    iconColor: "#f59e0b",
    trend: "+8%",
    trendColor: "text-green-500",
    value: "12",
    label: "Open Findings",
  },
];

interface StatCardProps {
  stat: StatItem;
}

function StatCard({ stat }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow duration-200">
      {/* Top row: icon + trend */}
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center",
            stat.iconBg,
          )}
        >
          <i
            className={cn("lni", stat.icon, "text-base")}
            style={{ color: stat.iconColor }}
          />
        </div>
        <span
          className={cn(
            "flex items-center gap-0.5 text-xs font-semibold",
            stat.trendColor,
          )}
        >
          <i className="lni lni-arrow-up-right text-xs" />
          {stat.trend}
        </span>
      </div>

      {/* Bottom: value + label */}
      <div>
        <p className="text-xl font-bold text-gray-900 leading-tight">
          {stat.value}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
      </div>
    </div>
  );
}

interface StatsCardsProps {
  className?: string;
}

export function StatsCards({ className }: StatsCardsProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-3", className)}>
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} />
      ))}
    </div>
  );
}
