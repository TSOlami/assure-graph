"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
} from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-orange-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full">
              <Sparkles className="w-4 h-4 text-[#E85A2B]" />
              <span className="text-sm font-medium text-[#E85A2B]">
                Now with AssureAI
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              AI-Powered GRC Platform for Modern Enterprises
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Unify governance, risk, and compliance with intelligent automation.
              AssureGraph helps you stay ahead of regulations with predictive insights
              and automated workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl border overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-xs text-gray-400">AssureGraph Dashboard</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <div className="text-xs text-gray-600">Compliance Score</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">12</div>
                    <div className="text-xs text-gray-600">Open Risks</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-xs text-gray-600">Pending Tasks</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Framework Coverage</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[87%] bg-[#E85A2B] rounded-full" />
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#E85A2B] mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">AI Insight</div>
                      <div className="text-xs text-gray-600">
                        3 controls need attention based on recent audit findings
                      </div>
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
