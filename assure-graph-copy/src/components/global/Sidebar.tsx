"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { Logo } from "./Logo";

interface NavItem {
  icon: string;
  label: string;
  path: string;
  badge?: string;
  children?: NavItem[];
}

const getstartedItems: NavItem[] = [
  {
    icon: "lni-home",
    label: "Get Started",
    path: "/get-started",
  },
];

const overviewItems: NavItem[] = [
  {
    icon: "lni-dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: "lni-list",
    label: "Task",
    path: "/task",
  },
  {
    icon: "lni-layers",
    label: "Integrations",
    path: "/integrations",
  },
];

const governanceItems: NavItem[] = [
  {
    icon: "lni-user",
    label: "Personnel",
    path: "/personnel",
  },
  {
    icon: "lni-shield",
    label: "Policy Center",
    path: "/policy",
  },
];

const complianceItems: NavItem[] = [
  {
    icon: "lni-bookmark",
    label: "Monitoring",
    path: "/monitoring",
  },
  {
    icon: "lni-target",
    label: "Frameworks",
    path: "/frameworks",
  },
  {
    icon: "lni-check-box",
    label: "Controls",
    path: "/controls",
  },
  {
    icon: "lni-folder",
    label: "Evidence",
    path: "/evidence",
  },
  {
    icon: "lni-bulb",
    label: "Audit",
    path: "/audit",
    children: [
      {
        icon: "",
        label: "Audit Summary",
        path: "/audit/summary",
      },
      {
        icon: "",
        label: "Findings",
        path: "/audit/findings",
      },
      {
        icon: "",
        label: "Document Library",
        path: "/audit/document-library",
      },
      {
        icon: "",
        label: "Reports",
        path: "/audit/reports",
      },
      {
        icon: "",
        label: "Issue Management",
        path: "/audit/issue-management",
      },
    ],
  },
];

const rpaItems: NavItem[] = [
  {
    icon: "lni-warning",
    label: "Risk Management",
    path: "/risk-management",
    children: [
      {
        icon: "",
        label: "Risk Register",
        path: "/risk-management/risk-register",
      },
      {
        icon: "",
        label: "Risk Assessment",
        path: "/risk-management/risk-assessment",
      },
    ],
  },
  {
    icon: "lni-briefcase",
    label: "Vendors",
    path: "/vendors",
  },
  {
    icon: "lni-folder",
    label: "Assets",
    path: "/assets",
  },
  {
    icon: "lni-shield",
    label: "Vulnerabilities",
    path: "/vulnerabilities",
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleNavigation = (path: string) => {
    router.push(path);
    if (onClose) onClose();
  };

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );
  };

  const isItemActive = (item: NavItem) => {
    if (pathname === item.path) return true;
    if (item.children) {
      return item.children.some(
        (child) =>
          pathname === child.path || pathname.startsWith(child.path + "/"),
      );
    }
    return pathname.startsWith(item.path + "/");
  };

  const isChildActive = (childPath: string) => {
    return pathname === childPath || pathname.startsWith(childPath + "/");
  };

  const renderNavItem = (item: NavItem, isChild: boolean = false) => {
    const isActive = isItemActive(item);
    const isDirectActive = isChild ? isChildActive(item.path) : isActive;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.path);

    return (
      <div key={item.path}>
        <div className="flex w-full">
          {!isChild && (
            <div
              className={clsx(
                "transition-all",
                isActive ? "bg-brand-5 w-1 h-10 rounded-r-2xl" : "w-0",
              )}
            ></div>
          )}
          <button
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.path);
              } else {
                handleNavigation(item.path);
              }
            }}
            className={clsx(
              "w-full cursor-pointer flex items-center justify-between py-2.5 text-sm rounded-r-lg transition-colors outline-none focus:outline-none border-none relative",
              isChild ? "pl-12 pr-4" : "pl-4 pr-4",
              isActive && !isChild
                ? "bg-brand-0-5 text-brand-5 font-medium"
                : isChild && isDirectActive
                  ? "text-brand-5 font-normal"
                  : "text-gray-500 hover:bg-gray-100 font-normal",
            )}
          >
            <div className="flex items-center gap-3">
              {!isChild && item.icon && (
                <i className={clsx("lni", item.icon, "text-lg")}></i>
              )}
              <span className="text-sm">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="px-2 py-0.5 text-xs bg-brand-1 text-brand-5 rounded">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <i
                  className={clsx(
                    "lni lni-chevron-down text-sm text-gray-500 transition-transform",
                    isExpanded && "rotate-180",
                  )}
                ></i>
              )}
            </div>
          </button>
        </div>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="relative">
            <div className="absolute left-7.5 top-0 bottom-0 w-px bg-gray-200"></div>

            <div className="mt-1 space-y-1">
              {item.children!.map((child) => renderNavItem(child, true))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSection = (title: string, items: NavItem[]) => {
    return (
      <div className="mb-6 pr-4 py-1 bg-[#FCFCFD]">
        {title && (
          <h3 className="px-4 mb-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h3>
        )}
        <div className="space-y-1">
          {items.map((item) => renderNavItem(item))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={clsx(
        "w-64 bg-[#FCFCFD] border-r border-gray-200 flex flex-col",
        "fixed left-0 top-0 h-screen z-50 transform transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Logo */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {renderSection("", getstartedItems)}
        {renderSection("OVERVIEW", overviewItems)}
        {renderSection("GOVERNANCE", governanceItems)}
        {renderSection("COMPLIANCE", complianceItems)}
        {renderSection("RISK", rpaItems)}
      </div>

      {/* User Profile */}
      <div className="p-4">
        <div className="flex bg-white shadow-lg items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
            alt="User"
            className="w-10 h-10 rounded-full ring-2 ring-gray-100"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              User Name
            </div>
            <div className="text-xs text-gray-500 truncate">user@email.com</div>
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <i className="lni lni-exit text-red-500 text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
