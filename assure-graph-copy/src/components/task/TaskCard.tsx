"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type Priority = "Low" | "Medium" | "High";
export type Status = "To-Do" | "In-Progress" | "Completed" | "Overdue";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: Status;
  linkedCount?: number;
  assignees: { name: string; avatar?: string }[];
  files?: number;
  comments?: number;
  isOverdue?: boolean;
}

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

const priorityConfig: Record<
  Priority,
  { label: string; className: string; dot: string }
> = {
  Low: {
    label: "Low",
    className: "bg-blue-50 text-blue-600 border-blue-200",
    dot: "text-blue-500",
  },
  Medium: {
    label: "Medium",
    className: "bg-orange-50 text-orange-600 border-orange-200",
    dot: "text-orange-500",
  },
  High: {
    label: "High",
    className: "bg-red-50 text-red-600 border-red-200",
    dot: "text-red-500",
  },
};

function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border",
        config.className,
      )}
    >
      <i className={cn("lni lni-flag text-xs", config.dot)} />
      {config.label}
    </span>
  );
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-1.5">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
          {task.title}
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 -mt-0.5 -mr-1 text-gray-400 hover:text-gray-600"
            >
              <i
                style={{ color: "#1C2024" }}
                className="lni lni-more text-sm"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onEdit?.(task)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={() => onDelete?.(task.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-3 leading-relaxed">
        {task.description}
      </p>

      {/* Linked tag */}
      {task.linkedCount !== undefined && (
        <div
          className={cn(
            "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg mb-3 w-fit border",
            task.status === "In-Progress"
              ? "bg-pink-50 text-pink-600 border-pink-200"
              : task.status === "Completed"
                ? "bg-green-50 text-green-600 border-green-200"
                : "bg-purple-50 text-purple-600 border-purple-200",
          )}
        >
          <i className="lni lni-link text-xs" />
          <span>Linked to {task.linkedCount} high-risk access controls</span>
        </div>
      )}

      {/* Priority */}
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-xs text-gray-400">Priority:</span>
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-2 mb-3">
        <i className="lni lni-calendar text-gray-400 text-sm" />
        <span className="text-xs text-gray-500">Due Date:</span>
        <span className="text-xs font-medium text-gray-700">
          {task.dueDate}
        </span>
        {task.isOverdue && (
          <span className="text-xs font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200">
            Overdue
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
        {/* Assignees */}
        <div className="flex items-center -space-x-1.5">
          {task.assignees.map((a, i) => (
            <Avatar key={i} className="h-6 w-6 border-2 border-white ring-0">
              <AvatarImage src={a.avatar} />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-[10px] font-semibold">
                {a.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-gray-400">
          {task.files !== undefined && (
            <span className="flex items-center gap-1 text-xs">
              <i className="lni lni-files text-gray-800 text-sm" />
              {task.files}
            </span>
          )}
          {task.comments !== undefined && (
            <span className="flex items-center gap-1 text-xs">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(0 0 0)"
              >
                <path
                  d="M6.25 9.77344C6.25 9.35922 6.58579 9.02344 7 9.02344H17C17.4142 9.02344 17.75 9.35922 17.75 9.77344C17.75 10.1877 17.4142 10.5234 17 10.5234H7C6.58579 10.5234 6.25 10.1877 6.25 9.77344Z"
                  fill="#343C54"
                />
                <path
                  d="M7 12.0234C6.58579 12.0234 6.25 12.3592 6.25 12.7734C6.25 13.1877 6.58579 13.5234 7 13.5234H12C12.4142 13.5234 12.75 13.1877 12.75 12.7734C12.75 12.3592 12.4142 12.0234 12 12.0234H7Z"
                  fill="#343C54"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.5 5.53125C2.5 4.28861 3.50736 3.28125 4.75 3.28125H19.25C20.4926 3.28125 21.5 4.28861 21.5 5.53125V16.0796C21.5 17.3223 20.4926 18.3296 19.25 18.3296H15.1014L12.6025 21.6956C12.461 21.8861 12.2377 21.9985 12.0003 21.9985C11.763 21.9985 11.5396 21.8861 11.3981 21.6956L8.89931 18.3296H4.75C3.50736 18.3296 2.5 17.3223 2.5 16.0796V5.53125ZM4.75 4.78125C4.33579 4.78125 4 5.11704 4 5.53125V16.0796C4 16.4938 4.33579 16.8296 4.75 16.8296H9.2766C9.51396 16.8296 9.73731 16.942 9.87879 17.1326L12.0003 19.9903L14.1219 17.1326C14.2634 16.942 14.4867 16.8296 14.7241 16.8296H19.25C19.6642 16.8296 20 16.4938 20 16.0796V5.53125C20 5.11704 19.6642 4.78125 19.25 4.78125H4.75Z"
                  fill="#343C54"
                />
              </svg>
              {task.comments}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
