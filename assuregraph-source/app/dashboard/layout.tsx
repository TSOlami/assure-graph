"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Shield,
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
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useState } from "react";

const sidebarSections = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare, badge: "8" },
      { name: "Integrations", href: "/dashboard/integrations", icon: Plug },
    ],
  },
  {
    title: "Governance",
    items: [
      { name: "Personnel", href: "/dashboard/personnel", icon: Users },
      { name: "Policy Center", href: "/dashboard/policy-center", icon: FileText },
      { name: "Exceptions", href: "/dashboard/exceptions", icon: AlertCircle, badge: "3" },
    ],
  },
  {
    title: "Compliance",
    items: [
      { name: "Monitoring", href: "/dashboard/monitoring", icon: Activity },
      { name: "Frameworks", href: "/dashboard/frameworks", icon: Target },
      { name: "Controls", href: "/dashboard/controls", icon: ClipboardCheck },
      { name: "Audits", href: "/dashboard/audits", icon: Search },
      { name: "Evidence", href: "/dashboard/evidence", icon: FolderOpen },
      { name: "Findings", href: "/dashboard/findings", icon: AlertTriangle, badge: "5" },
      { name: "Documents", href: "/dashboard/documents", icon: BookOpen },
      { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Risk",
    items: [
      { name: "Risk Management", href: "/dashboard/risk-management", icon: ShieldAlert },
      { name: "Risk Register", href: "/dashboard/risk-register", icon: ClipboardList },
      { name: "Risk Assessment", href: "/dashboard/risk-assessment", icon: Calculator },
      { name: "Risk Acceptance", href: "/dashboard/risk-acceptance", icon: CheckCircle },
      { name: "Vendors", href: "/dashboard/vendors", icon: Building2 },
      { name: "Assets", href: "/dashboard/assets", icon: Server },
      { name: "Vulnerabilities", href: "/dashboard/vulnerabilities", icon: Bug, badge: "12" },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(["Overview", "Compliance"]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E85A2B] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden lg:block">AssureGraph</span>
            </Link>
            <div className="h-6 w-px bg-gray-200 hidden lg:block" />
            <span className="text-sm text-gray-500 hidden lg:block">GRC Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auditor-view">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Auditor View</span>
              </Button>
            </Link>
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#E85A2B] text-white text-sm">JD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-64px)] hidden lg:block overflow-y-auto">
          <nav className="p-4 space-y-6">
            {sidebarSections.map((section) => (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 hover:text-gray-700"
                >
                  {section.title}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      expandedSections.includes(section.title) ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedSections.includes(section.title) && (
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? "bg-orange-50 text-[#E85A2B] font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
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
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          {/* AI Assistant Card */}
          <div className="p-4 mt-auto">
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

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
