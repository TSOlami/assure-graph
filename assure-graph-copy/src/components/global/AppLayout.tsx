"use client";

import { useState, createContext, useContext } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppLayoutContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const AppLayoutContext = createContext<AppLayoutContextValue | null>(null);

export function useAppLayout(): AppLayoutContextValue | null {
  return useContext(AppLayoutContext);
}

interface AppLayoutProps {
  children: React.ReactNode;
  /** Optional className for the main content area */
  mainClassName?: string;
}

export default function AppLayout({ children, mainClassName = "" }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <AppLayoutContext.Provider
      value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}
    >
      <div className="flex h-screen overflow-hidden">
        {/* Mobile overlay when sidebar is open */}
        <div
          className={`
            fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden
            ${sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}
          `}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden ml-0 lg:ml-64">
          <Header />
          <main
            className={`flex-1 overflow-y-auto p-4 sm:p-6 ${mainClassName}`}
          >
            {children}
          </main>
        </div>
      </div>
    </AppLayoutContext.Provider>
  );
}
