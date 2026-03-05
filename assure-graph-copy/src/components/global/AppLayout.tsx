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
  mainClassName?: string;
}

export default function AppLayout({ children, mainClassName }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <AppLayoutContext.Provider
      value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}
    >
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          {/* Mobile overlay */}
          <div
            className={`
              fixed inset-0 z-20 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden
              ${sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}
            `}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className={`flex-1 p-4 lg:p-6 overflow-auto lg:ml-64 min-h-[calc(100vh-64px)] ${mainClassName || ""}`}>
            {children}
          </main>
        </div>
      </div>
    </AppLayoutContext.Provider>
  );
}
