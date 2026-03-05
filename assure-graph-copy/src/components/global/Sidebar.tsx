"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  CheckSquare,
  Plug,
  Users,
  FileText,
  AlertCircle,
  Activity,
  Target,
  ClipboardCheck,
  FolderOpen,
  Search,
  BookOpen,
  BarChart3,
  AlertTriangle,
  ShieldAlert,
  ClipboardList,
  Calculator,
  CheckCircle,
  Building2,
  Server,
  Bug,
  Sparkles,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface SidebarSection {
  title: string;
  items: NavItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Tasks", href: "/task", icon: CheckSquare, badge: "8" },
      { name: "Integrations", href: "/integrations", icon: Plug },
    ],
  },
  {
    title: "Governance",
    items: [
      { name: "Personnel", href: "/personnel", icon: Users },
      { name: "Policy Center", href: "/policy", icon: FileText },
      { name: "Exceptions", href: "/exceptions", icon: AlertCircle, badge: "3" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { name: "Monitoring", href: "/monitoring", icon: Activity },
      { name: "Frameworks", href: "/frameworks", icon: Target },
      { name: "Controls", href: "/controls", icon: ClipboardCheck },
      { name: "Audits", href: "/audit", icon: Search },
      { name: "Evidence", href: "/evidence", icon: FolderOpen },
      { name: "Findings", href: "/audit/findings", icon: AlertTriangle, badge: "5" },
      { name: "Documents", href: "/audit/document-library", icon: BookOpen },
      { name: "Reports", href: "/audit/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Risk",
    items: [
      { name: "Risk Management", href: "/risk-management", icon: ShieldAlert },
      { name: "Risk Register", href: "/risk-management/risk-register", icon: ClipboardList },
      { name: "Risk Assessment", href: "/risk-management/risk-assessment", icon: Calculator },
      { name: "Risk Acceptance", href: "/risk-management/risk-acceptance", icon: CheckCircle },
      { name: "Vendors", href: "/vendors", icon: Building2 },
      { name: "Assets", href: "/assets", icon: Server },
      { name: "Vulnerabilities", href: "/vulnerabilities", icon: Bug, badge: "12" },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Overview",
    "Governance",
    "Compliance",
    "Risk",
  ]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleNavClick = (href: string) => {
    router.push(href);
    if (onClose) onClose();
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={clsx(
        "w-64 bg-white border-r min-h-[calc(100vh-64px)] overflow-y-auto flex flex-col",
        "fixed left-0 top-16 h-[calc(100vh-64px)] z-30 transform transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="p-4 space-y-6 flex-1">
        {sidebarSections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 hover:text-gray-700"
            >
              {section.title}
              <ChevronRight
                className={clsx(
                  "w-4 h-4 transition-transform",
                  expandedSections.includes(section.title) && "rotate-90"
                )}
              />
            </button>
            {expandedSections.includes(section.title) && (
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={clsx(
                          "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors text-left",
                          active
                            ? "bg-orange-50 text-[#E85A2B] font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">AssureAI</span>
          </div>
          <p className="text-sm text-orange-100 mb-3">
            Get intelligent insights about your GRC program
          </p>
          <Button
            size="sm"
            variant="secondary"
            className="w-full bg-white text-orange-600 hover:bg-orange-50"
          >
            Ask AI Assistant
          </Button>
        </div>
      </div>
    </aside>
  );
}
