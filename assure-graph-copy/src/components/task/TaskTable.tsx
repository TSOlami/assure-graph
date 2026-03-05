"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Task, Priority, Status } from "./TaskCard";

interface TaskTableRowProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

const priorityConfig: Record<Priority, { className: string; dot: string }> = {
  Low: {
    className: "bg-blue-50 text-blue-600 border-blue-200",
    dot: "bg-blue-500",
  },
  Medium: {
    className: "bg-orange-50 text-orange-600 border-orange-200",
    dot: "bg-orange-500",
  },
  High: {
    className: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
  },
};

const statusConfig: Record<Status, { className: string; icon: string }> = {
  "To-Do": { className: "bg-gray-50 text-gray-600 border-gray-200", icon: "○" },
  "In-Progress": {
    className: "bg-blue-50 text-blue-600 border-blue-200",
    icon: "◑",
  },
  Completed: {
    className: "bg-green-50 text-green-600 border-green-200",
    icon: "✓",
  },
  Overdue: { className: "bg-red-50 text-red-600 border-red-200", icon: "⚠" },
};

export function TaskTable({ task, onEdit, onDelete }: TaskTableRowProps) {
  const pConfig = priorityConfig[task.priority];
  const sConfig = statusConfig[task.status];

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors group">
      {/* Checkbox */}
      <td className="pl-4 pr-2 py-3 w-8">
        <Checkbox className="h-4 w-4 border-gray-300" />
      </td>

      {/* Task & Description */}
      <td className="px-3 py-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">{task.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
        </div>
      </td>

      {/* Due date */}
      <td className="px-3 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-600">{task.dueDate}</span>
      </td>

      {/* Priority */}
      <td className="px-3 py-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border",
            pConfig.className,
          )}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full", pConfig.dot)} />
          {task.priority}
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border",
            sConfig.className,
          )}
        >
          <span className="text-[10px]">{sConfig.icon}</span>
          {task.status}
        </span>
      </td>

      {/* Assigned to */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
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
          <button className="h-5 w-5 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-500 hover:text-gray-600 transition-colors">
            <i className="lni lni-user-add text-xs" />
          </button>
        </div>
      </td>

      {/* Comments & actions */}
      <td className="px-3 py-3 text-left">
        <div className="flex items-center justify-end gap-5">
          <span className="flex items-center gap-1 text-xs text-gray-400">
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

            {task.comments ?? 0}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400"
              >
                <i className="lni lni-more text-sm" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
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
      </td>
    </tr>
  );
}
