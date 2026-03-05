"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Solutions",
    items: [
      { name: "Governance", description: "Streamline governance processes", href: "/dashboard/governance" },
      { name: "Risk Management", description: "Identify and mitigate risks", href: "/dashboard/risk-management" },
      { name: "Compliance", description: "Maintain regulatory compliance", href: "/dashboard/compliance" },
      { name: "Audit Management", description: "Simplify audit workflows", href: "/dashboard/audits" },
    ],
  },
  {
    name: "Product",
    items: [
      { name: "Features", description: "Explore all features", href: "#features" },
      { name: "AI Capabilities", description: "Powered by AssureAI", href: "#ai" },
      { name: "Integrations", description: "Connect your tools", href: "#integrations" },
      { name: "Security", description: "Enterprise-grade security", href: "#security" },
    ],
  },
  {
    name: "Integrations",
    href: "/dashboard/integrations",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "Trust",
    items: [
      { name: "Security", description: "Security certifications", href: "#" },
      { name: "Compliance", description: "Compliance frameworks", href: "#" },
      { name: "Privacy", description: "Privacy policy", href: "#" },
    ],
  },
  {
    name: "Resources",
    items: [
      { name: "Documentation", description: "Product documentation", href: "#" },
      { name: "Blog", description: "Latest insights", href: "#" },
      { name: "Webinars", description: "Watch on-demand", href: "#" },
      { name: "Support", description: "Get help", href: "#" },
    ],
  },
];

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E85A2B] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AssureGraph</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.items && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.items ? (
                  <>
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border p-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block p-3 rounded-lg hover:bg-gray-50"
                          >
                            <div className="font-medium text-gray-900">{subItem.name}</div>
                            <div className="text-sm text-gray-500">{subItem.description}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                Get Started
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.items ? (
                    <div className="space-y-2">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-gray-600"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className="block font-medium text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/login" className="block w-full">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href="/login" className="block w-full">
                  <Button className="w-full bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
