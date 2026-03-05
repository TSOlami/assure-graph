"use client";

import React from "react";
import Link from "next/link";
import { useAppLayout } from "./AppLayout";
import { Button } from "@/components/ui/button";
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
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Eye,
  Menu,
  X,
} from "lucide-react";

export default function Header() {
  const layout = useAppLayout();

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          {layout && (
            <button
              onClick={layout.toggleSidebar}
              className="lg:hidden p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {layout.sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E85A2B] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden lg:block">
              AssureGraph
            </span>
          </Link>
          <div className="h-6 w-px bg-gray-200 hidden lg:block" />
          <span className="text-sm text-gray-500 hidden lg:block">
            GRC Platform
          </span>
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
                  <AvatarFallback className="bg-[#E85A2B] text-white text-sm">
                    JD
                  </AvatarFallback>
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
  );
}
