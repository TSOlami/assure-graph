"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  BarChart3,
  CheckCircle2,
  FileText,
  Lock,
  Users,
  ArrowRight,
} from "lucide-react";

const solutions = [
  {
    icon: Shield,
    title: "Governance",
    description: "Streamline policy management, personnel oversight, and exception handling with automated workflows.",
    href: "/dashboard/governance",
  },
  {
    icon: BarChart3,
    title: "Risk Management",
    description: "Identify, assess, and mitigate risks with predictive analytics and real-time monitoring.",
    href: "/dashboard/risk-management",
  },
  {
    icon: CheckCircle2,
    title: "Compliance",
    description: "Maintain continuous compliance across 50+ frameworks with automated evidence collection.",
    href: "/dashboard/compliance",
  },
  {
    icon: FileText,
    title: "Audit Management",
    description: "Simplify audit workflows with AI-assisted findings and automated report generation.",
    href: "/dashboard/audits",
  },
  {
    icon: Lock,
    title: "Controls",
    description: "Design, test, and monitor controls with intelligent mapping to frameworks and requirements.",
    href: "/dashboard/controls",
  },
  {
    icon: Users,
    title: "Vendor Management",
    description: "Assess and monitor third-party risks with automated vendor questionnaires and scoring.",
    href: "/dashboard/vendors",
  },
];

export function LandingSolutions() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">Solutions</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for GRC
          </h2>
          <p className="text-lg text-gray-600">
            A complete platform that unifies governance, risk, and compliance
            management with AI-powered intelligence.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <Link
              key={solution.title}
              href={solution.href}
              className="group p-6 bg-white rounded-xl border hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#E85A2B] transition-colors">
                <solution.icon className="w-6 h-6 text-[#E85A2B] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
              <p className="text-gray-600">{solution.description}</p>
              <div className="mt-4 flex items-center text-[#E85A2B] font-medium">
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
