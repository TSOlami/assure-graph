"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/global/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const NAV_LINKS = [
  { label: "Solutions", href: "#solutions" },
  { label: "Products", href: "#products" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "Trust", href: "#trust" },
  { label: "Resources", href: "#resources" },
];

function MobileNavItem({ item, onNavigate }: { item: (typeof NAV_LINKS)[0]; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E5E7EB] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex min-h-[52px] w-full items-center justify-between px-4 py-4 text-left text-base font-medium text-[#212B36] transition-colors hover:bg-[#F9FAFB] active:bg-[#F3F4F6]"
      >
        {item.label}
        <svg
          width="80"
          height="80"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(0 0 0)"
          className={`h-5 w-5 text-[#637381] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M5.54779 9.09467C5.84069 8.80178 6.31556 8.80178 6.60846 9.09467L12.3281 14.8143L18.0478 9.09467C18.3407 8.80178 18.8156 8.80178 19.1085 9.09467C19.4013 9.38756 19.4013 9.86244 19.1085 10.1553L12.8585 16.4053C12.5656 16.6982 12.0907 16.6982 11.7978 16.4053L5.54779 10.1553C5.2549 9.86244 5.2549 9.38756 5.54779 9.09467Z"
            fill="#343C54"
          />
        </svg>
      </button>
      {open && (
        <div className="bg-[#F9FAFB] pb-2">
          <Link
            href={item.href}
            onClick={onNavigate}
            className="block min-h-[44px] px-6 py-3 text-sm text-[#637381] hover:bg-white hover:text-[#212B36]"
          >
            Overview
          </Link>
          <Link
            href={`${item.href}/details`}
            onClick={onNavigate}
            className="block min-h-[44px] px-6 py-3 text-sm text-[#637381] hover:bg-white hover:text-[#212B36]"
          >
            Details
          </Link>
        </div>
      )}
    </div>
  );
}

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      document.addEventListener("keydown", handleEscape);
      closeButtonRef.current?.focus();
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#F3F4F6] bg-white/95">
      <div className="flex h-14 min-h-[56px] w-full items-center justify-between gap-4 px-4 sm:px-6 md:px-8 lg:px-12">
        <Link href="/" className="shrink-0" aria-label="AssureGraph home">
          <Logo variant="landing" />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden flex-1 items-center justify-center gap-6 xl:gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((item) => (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex min-h-[44px] items-center gap-1 rounded-md px-2 py-2 text-sm font-normal text-[#637381] transition-colors hover:text-[#212B36] focus:outline-none focus:ring-2 focus:ring-brand-5/20 focus:ring-offset-2"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={8}
                className="min-w-[180px] rounded-lg border-[#E5E7EB] p-1 shadow-lg"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href={item.href}
                    className="min-h-[40px] cursor-pointer rounded-md px-3 py-2"
                  >
                    Overview
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`${item.href}/details`}
                    className="min-h-[40px] cursor-pointer rounded-md px-3 py-2"
                  >
                    Details
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="min-h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-normal text-[#637381] transition-colors hover:text-[#212B36]"
          >
            Sign in
          </Link>
          <Button
            asChild
            size="sm"
            className="h-9 min-h-[44px] shrink-0 rounded-md px-4 bg-linear-to-r from-[#E85A2B] to-[#FF6B3D] hover:from-[#FF6B3D] hover:to-[#E85A2B] text-white font-medium"
          >
            <Link href="/get-started">Get started</Link>
          </Button>
        </div>

        {/* Mobile: hamburger only */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[#637381] hover:bg-[#F3F4F6] hover:text-[#212B36] focus:outline-none focus:ring-2 focus:ring-brand-5/20"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu - slide-out panel */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={closeMobile}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu"
        />
        {/* Panel */}
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-[min(100vw,380px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#E5E7EB] px-4">
            <Logo variant="landing" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMobile}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[#637381] hover:bg-[#F3F4F6] hover:text-[#212B36]"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav
            className="flex flex-1 flex-col overflow-y-auto py-4"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                onNavigate={closeMobile}
              />
            ))}
          </nav>
          <div className="mt-auto shrink-0 border-t border-[#E5E7EB] p-4 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={closeMobile}
              className="min-h-[44px] flex items-center justify-center rounded-md px-4 text-sm font-medium text-[#637381] transition-colors hover:bg-[#F9FAFB] hover:text-[#212B36]"
            >
              Sign in
            </Link>
            <Button
              asChild
              size="sm"
              className="h-11 w-full rounded-md bg-brand-5 text-white font-medium hover:bg-brand-6"
            >
              <Link href="/get-started" onClick={closeMobile}>
                Get started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
