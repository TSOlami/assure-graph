"use client";

import Link from "next/link";
import {
  FolderOpen,
  Shield,
  AlertTriangle,
  FileStack,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const SOLUTIONS: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: FolderOpen,
    title: "Evidence Hub & Audit Readiness",
    description:
      "Connect all your data sources, manage controls, collect evidence, & prove compliance with ease.",
    href: "/evidence",
  },
  {
    icon: Shield,
    title: "AI Powered Control Generation",
    description:
      "Generate controls automatically, map them to your frameworks, and monitor them with our powerful AI engine.",
    href: "/controls",
  },
  {
    icon: AlertTriangle,
    title: "Exception & Risk Acceptance",
    description:
      "Track and manage exceptions, document risk acceptance, and automatically create corrective actions.",
    href: "/risk-management/risk-acceptance",
  },
  {
    icon: FileStack,
    title: "Ownership & Accountability",
    description:
      "Assign control ownership, track completion, and manage approvals to build a culture of compliance.",
    href: "/personnel",
  },
];

export function LandingSolutions() {
  return (
    <section
      id="solutions"
      className="bg-[#F9FAFB] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-[1152px]">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="text-2xl font-bold text-[#212B36] sm:text-3xl md:text-4xl">
            Our Solutions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#637381] sm:mt-4 sm:text-base">
            Purpose-built AI-powered audit readiness and compliance solutions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {SOLUTIONS.map((solution) => (
            <div
              key={solution.title}
              className="group flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-6"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-brand-0-5 sm:mb-4 sm:size-12">
                <solution.icon className="size-6 text-brand-5" />
              </div>
              <h3 className="text-sm font-bold text-[#212B36] sm:text-base">
                {solution.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-[#637381] leading-relaxed">
                {solution.description}
              </p>
              <Link
                href={solution.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-5 transition-colors hover:text-brand-6"
              >
                Learn more
                <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
