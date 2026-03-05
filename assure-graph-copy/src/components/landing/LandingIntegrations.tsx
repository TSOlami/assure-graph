"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Lock,
  Cpu,
  Zap,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";

const integrations = [
  { icon: Globe, name: "AWS" },
  { icon: Lock, name: "Azure" },
  { icon: Cpu, name: "GCP" },
  { icon: Zap, name: "Slack" },
  { icon: Users, name: "Okta" },
  { icon: FileText, name: "Jira" },
];

export function LandingIntegrations() {
  return (
    <section id="integrations" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">Integrations</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Connect Your Entire Stack
          </h2>
          <p className="text-lg text-gray-600">
            Integrate with 100+ tools to automatically collect evidence,
            sync tasks, and maintain continuous compliance.
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <integration.icon className="w-8 h-8 text-gray-600" />
              </div>
              <span className="text-sm text-gray-600">{integration.name}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/dashboard/integrations">
            <Button variant="outline" className="gap-2">
              View All Integrations
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
