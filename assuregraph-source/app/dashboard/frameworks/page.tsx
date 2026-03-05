"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle2, Clock, AlertCircle, Plus, ArrowRight, Sparkles } from "lucide-react";

const frameworks = [
  {
    name: "SOC 2 Type II",
    provider: "AICPA",
    progress: 94,
    status: "compliant",
    controls: { total: 127, passed: 119, failed: 5, pending: 3 },
    lastAudit: "2024-01-15",
    nextAudit: "2024-07-15",
  },
  {
    name: "ISO 27001",
    provider: "ISO",
    progress: 87,
    status: "in_progress",
    controls: { total: 114, passed: 99, failed: 8, pending: 7 },
    lastAudit: "2023-09-20",
    nextAudit: "2024-09-20",
  },
  {
    name: "PCI DSS",
    provider: "PCI SSC",
    progress: 78,
    status: "attention",
    controls: { total: 78, passed: 61, failed: 12, pending: 5 },
    lastAudit: "2023-12-01",
    nextAudit: "2024-06-01",
  },
  {
    name: "HIPAA",
    provider: "HHS",
    progress: 91,
    status: "compliant",
    controls: { total: 45, passed: 41, failed: 2, pending: 2 },
    lastAudit: "2024-02-01",
    nextAudit: "2024-08-01",
  },
  {
    name: "GDPR",
    provider: "EU",
    progress: 82,
    status: "in_progress",
    controls: { total: 68, passed: 56, failed: 8, pending: 4 },
    lastAudit: "2023-11-15",
    nextAudit: "2024-05-15",
  },
];

const aiRecommendations = [
  {
    framework: "PCI DSS",
    action: "Prioritize 5 failed controls affecting payment processing",
    impact: "High business impact",
  },
  {
    framework: "ISO 27001",
    action: "Schedule internal audit for 7 pending controls",
    impact: "Upcoming certification audit",
  },
];

export default function FrameworksPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Frameworks</h1>
          <p className="text-gray-500">Manage compliance frameworks and track progress</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Plus className="w-4 h-4" />
          Add Framework
        </Button>
      </div>

      {/* AI Recommendations */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">AI Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiRecommendations.map((rec) => (
              <div
                key={rec.framework}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-100"
              >
                <div>
                  <div className="font-medium text-gray-900">{rec.framework}</div>
                  <div className="text-sm text-gray-500">{rec.action}</div>
                </div>
                <Badge className="bg-orange-100 text-orange-700">{rec.impact}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Frameworks Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {frameworks.map((framework) => (
          <Card key={framework.name}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#E85A2B]" />
                    <h3 className="font-semibold text-gray-900">{framework.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{framework.provider}</p>
                </div>
                <Badge
                  className={
                    framework.status === "compliant"
                      ? "bg-green-100 text-green-700"
                      : framework.status === "attention"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                  }
                >
                  {framework.status === "compliant" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {framework.status === "attention" && <AlertCircle className="w-3 h-3 mr-1" />}
                  {framework.status === "in_progress" && <Clock className="w-3 h-3 mr-1" />}
                  {framework.status.replace("_", " ")}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Overall Progress</span>
                    <span className="font-medium">{framework.progress}%</span>
                  </div>
                  <Progress value={framework.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-lg font-semibold text-gray-900">{framework.controls.total}</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <div className="text-lg font-semibold text-green-600">{framework.controls.passed}</div>
                    <div className="text-xs text-gray-500">Passed</div>
                  </div>
                  <div className="p-2 bg-red-50 rounded">
                    <div className="text-lg font-semibold text-red-600">{framework.controls.failed}</div>
                    <div className="text-xs text-gray-500">Failed</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <div className="text-lg font-semibold text-blue-600">{framework.controls.pending}</div>
                    <div className="text-xs text-gray-500">Pending</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                  <div>Last audit: {framework.lastAudit}</div>
                  <div>Next: {framework.nextAudit}</div>
                </div>

                <Link href={`/dashboard/frameworks/${framework.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Button variant="outline" className="w-full gap-1">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
