"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Sparkles, BarChart3, Shield, AlertTriangle } from "lucide-react";

const reports = [
  {
    id: "RPT-001",
    name: "Executive Compliance Summary",
    type: "Dashboard",
    description: "High-level compliance metrics for leadership",
    lastGenerated: "2024-03-08",
    schedule: "Weekly",
    aiGenerated: true,
  },
  {
    id: "RPT-002",
    name: "SOC 2 Readiness Assessment",
    type: "Compliance",
    description: "Detailed SOC 2 control testing results",
    lastGenerated: "2024-03-05",
    schedule: "Monthly",
    aiGenerated: false,
  },
  {
    id: "RPT-003",
    name: "Risk Register Summary",
    type: "Risk",
    description: "Current risk posture and mitigation status",
    lastGenerated: "2024-03-07",
    schedule: "Monthly",
    aiGenerated: true,
  },
  {
    id: "RPT-004",
    name: "Open Findings Report",
    type: "Audit",
    description: "All open audit findings with remediation plans",
    lastGenerated: "2024-03-10",
    schedule: "Weekly",
    aiGenerated: false,
  },
];

const aiInsights = [
  {
    title: "Compliance Trend Analysis",
    insight: "Your compliance score improved 8% over the last quarter",
    recommendation: "Generate executive report to share with board",
  },
  {
    title: "Risk Prediction",
    insight: "3 controls likely to fail next audit based on current trends",
    recommendation: "Schedule proactive remediation before April 15",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">Generate and schedule compliance reports</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Sparkles className="w-4 h-4" />
          AI Report Builder
        </Button>
      </div>

      {/* AI Insights */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">AI-Generated Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {aiInsights.map((item) => (
              <div
                key={item.title}
                className="p-4 bg-white rounded-lg border border-orange-100"
              >
                <div className="font-medium text-gray-900 mb-1">{item.title}</div>
                <p className="text-sm text-gray-600 mb-2">{item.insight}</p>
                <p className="text-sm text-[#E85A2B]">{item.recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {report.type === "Dashboard" && <BarChart3 className="w-5 h-5 text-gray-600" />}
                    {report.type === "Compliance" && <Shield className="w-5 h-5 text-gray-600" />}
                    {report.type === "Risk" && <AlertTriangle className="w-5 h-5 text-gray-600" />}
                    {report.type === "Audit" && <FileText className="w-5 h-5 text-gray-600" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Badge variant="outline">{report.type}</Badge>
                {report.aiGenerated && (
                  <Badge className="bg-orange-100 text-[#E85A2B] gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Enhanced
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {report.schedule}
                </div>
                <div>Last: {report.lastGenerated}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
