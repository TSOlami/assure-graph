"use client";

import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Predictive Risk Detection",
    description: "Identify emerging risks before they impact your business",
  },
  {
    title: "Automated Evidence Mapping",
    description: "AI maps evidence to controls across multiple frameworks",
  },
  {
    title: "Smart Task Prioritization",
    description: "Focus on what matters most with AI-ranked priorities",
  },
  {
    title: "Natural Language Queries",
    description: "Ask questions about your compliance posture in plain English",
  },
];

export function LandingFeatures() {
  return (
    <section id="ai" className="py-20 bg-linear-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">
              <Sparkles className="w-3 h-3 mr-1" />
              AssureAI
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Intelligence That Works for You
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our AI engine analyzes your GRC data to provide predictive insights,
              automate routine tasks, and help you make informed decisions faster.
            </p>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">{feature.title}</div>
                    <div className="text-sm text-gray-600">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl border p-6 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-[#E85A2B] rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">AssureAI Assistant</div>
                  <div className="text-sm text-gray-500">Always learning from your data</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">
                    &quot;Show me controls that are failing across multiple frameworks&quot;
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E85A2B] mt-0.5" />
                    <div className="text-sm text-gray-700">
                      Found 3 controls with cross-framework failures:
                      <ul className="mt-2 space-y-1 ml-4 list-disc">
                        <li>Access Review (SOC 2, ISO 27001)</li>
                        <li>Encryption at Rest (PCI DSS, HIPAA)</li>
                        <li>Incident Response (All frameworks)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">
                    &quot;What&apos;s my compliance forecast for Q2?&quot;
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E85A2B] mt-0.5" />
                    <div className="text-sm text-gray-700">
                      Based on current trends, your compliance score is projected
                      to reach 96% by end of Q2, up from 94% today.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
