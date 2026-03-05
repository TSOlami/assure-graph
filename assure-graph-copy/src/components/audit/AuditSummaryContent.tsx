"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, User, CheckCircle2, Clock, AlertCircle, Sparkles } from "lucide-react";

const audits = [
  {
    id: "AUD-2024-001",
    name: "SOC 2 Type II Annual Audit",
    framework: "SOC 2",
    auditor: "Deloitte",
    status: "in_progress",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    progress: 65,
    findings: 3,
  },
  {
    id: "AUD-2024-002",
    name: "ISO 27001 Surveillance Audit",
    framework: "ISO 27001",
    auditor: "BSI Group",
    status: "scheduled",
    startDate: "2024-04-15",
    endDate: "2024-04-19",
    progress: 0,
    findings: 0,
  },
  {
    id: "AUD-2023-008",
    name: "PCI DSS Q4 Assessment",
    framework: "PCI DSS",
    auditor: "Coalfire",
    status: "completed",
    startDate: "2023-12-01",
    endDate: "2023-12-15",
    progress: 100,
    findings: 5,
  },
];

const aiPrep = [
  {
    audit: "SOC 2 Type II Annual Audit",
    readiness: "85%",
    gaps: ["3 evidence items missing", "1 control test overdue"],
    recommendation: "Schedule control test for AC-002 before March 20",
  },
];

export default function AuditSummaryContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audits</h1>
          <p className="text-gray-500">Manage internal and external audits</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Plus className="w-4 h-4" />
          Schedule Audit
        </Button>
      </div>

      {/* AI Prep */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">AI Audit Readiness</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {aiPrep.map((item) => (
            <div key={item.audit} className="p-4 bg-white rounded-lg border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{item.audit}</span>
                <Badge className="bg-blue-100 text-blue-700">{item.readiness} Ready</Badge>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Identified gaps:</div>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {item.gaps.map((gap) => (
                    <li key={gap}>{gap}</li>
                  ))}
                </ul>
                <div className="flex items-start gap-2 mt-2 p-2 bg-orange-50 rounded">
                  <Sparkles className="w-4 h-4 text-[#E85A2B] mt-0.5" />
                  <span className="text-sm text-gray-700">{item.recommendation}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Audits List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Audits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {audits.map((audit) => (
              <div
                key={audit.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-500">{audit.id}</span>
                      <Badge variant="outline">{audit.framework}</Badge>
                      <Badge
                        className={
                          audit.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : audit.status === "in_progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {audit.status === "completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {audit.status === "in_progress" && <Clock className="w-3 h-3 mr-1" />}
                        {audit.status === "scheduled" && <Calendar className="w-3 h-3 mr-1" />}
                        {audit.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mt-2">{audit.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {audit.auditor}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {audit.startDate} - {audit.endDate}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{audit.progress}%</span>
                      </div>
                      <Progress value={audit.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="text-right">
                    {audit.findings > 0 && (
                      <Badge className="bg-orange-100 text-orange-700">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {audit.findings} Findings
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
