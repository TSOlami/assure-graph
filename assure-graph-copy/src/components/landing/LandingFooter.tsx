"use client";

import Link from "next/link";
import { Logo } from "@/components/global/Logo";
import { Button } from "@/components/ui/button";

const SOLUTION_LINKS = [
  { label: "GRC", href: "#" },
  { label: "IT Audit", href: "#" },
  { label: "Security", href: "#" },
  { label: "Risk", href: "#" },
  { label: "SaaS", href: "#" },
  { label: "Compliance", href: "#" },
];

const PRODUCT_LINKS = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#contact" },
  { label: "Pricing", href: "#pricing" },
  { label: "Features", href: "#solutions" },
  { label: "Integrations", href: "/integrations" },
  { label: "Testimonials", href: "#" },
];

const RESOURCE_LINKS = [
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Support", href: "#" },
  { label: "Community", href: "#" },
  { label: "Legal", href: "#" },
  { label: "Partners", href: "#" },
];

export function LandingFooter() {
  return (
    <footer
      className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12"
      style={{ backgroundColor: "#111827" }}
    >
      <div className="mx-auto max-w-[1152px]">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-12">
          <div className="max-w-sm space-y-4 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Logo variant="dark" />
            <p className="text-sm text-white/70">
              A powerful compliance tool that makes audits easy. Connect data,
              prove everywhere.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-10 min-w-[120px] border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/get-started">Get started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-10 min-w-[120px] border-brand-5 bg-transparent text-brand-3 hover:bg-brand-5/20"
              >
                <Link href="/#solutions">Learn more</Link>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Solutions</h4>
            <ul className="space-y-3">
              {SOLUTION_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Resources</h4>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:mt-12 sm:flex-row">
          <p className="text-sm text-white/60">
            © 2023 AssureGraph. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
