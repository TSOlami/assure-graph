"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Clock, ArrowRight, Sparkles, Target } from "lucide-react";

const findings = [
  {
    id: "FIND-089",
    title: "Missing encryption at rest for database",
    description: "Production database prod-db-01 does not have encryption enabled",
    severity: "High",
    status: "open",
    framework: "PCI DSS",
    control: "CC-006",
    assignedTo: "Emily Davis",
    dueDate: "2024-03-20",
    aiRecommendation: "Enable AWS RDS encryption - estimated 2 hours downtime",
  },
  {
    id: "FIND-092",
    title: "Dormant user accounts not disabled",
    description: "15 user accounts with no activity in 90 days still active",
    severity: "Medium",
    status: "in_progress",
    framework: "SOC 2",
    control: "AC-002",
    assignedTo: "Mike Johnson",
    dueDate: "2024-03-15",
    aiRecommendation: "Bulk disable accounts - no business impact expected",
  },
  {
    id: "FIND-095",
    title: "Incomplete audit log retention",
    description: "Audit logs for application X only retained for 6 months",
    severity: "Low",
    status: "open",
    framework: "HIPAA",
    control: "AU-003",
    assignedTo: "Tom Wilson",
    dueDate: "2024-03-30",
    aiRecommendation: "Update log retention policy in CloudWatch",
  },
  {
    id: "FIND-087",
    title: "Missing vulnerability scan documentation",
    description: "Q4 vulnerability scan results not properly documented",
    severity: "Medium",
    status: "remediated",
    framework: "ISO 27001",
    control: "SI-004",
    assignedTo: "Sarah Chen",
    dueDate: "2024-03-01",
    aiRecommendation: null,
  },
];

export default function FindingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Findings</h1>
          <p className="text-gray-500">Track and remediate audit findings</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <AlertTriangle className="w-4 h-4" />
          New Finding
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-500">Total Findings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">5</div>
            <div className="text-sm text-gray-500">High Severity</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-500">Open</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">11</div>
            <div className="text-sm text-gray-500">Remediated</div>
          </CardContent>
        </Card>
      </div>

      {/* Findings List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Findings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {findings.map((finding) => (
              <div
                key={finding.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-500">{finding.id}</span>
                      <Badge
                        className={
                          finding.severity === "High"
                            ? "bg-red-100 text-red-700"
                            : finding.severity === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {finding.severity}
                      </Badge>
                      <Badge
                        className={
                          finding.status === "remediated"
                            ? "bg-green-100 text-green-700"
                            : finding.status === "in_progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {finding.status === "remediated" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {finding.status === "in_progress" && <Clock className="w-3 h-3 mr-1" />}
                        {finding.status === "open" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {finding.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mt-2">{finding.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{finding.framework}</Badge>
                      <Link href={`/dashboard/controls/${finding.control}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                          <Target className="w-3 h-3 mr-1" />
                          {finding.control}
                        </Badge>
                      </Link>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Assigned: {finding.assignedTo}</span>
                      <span>Due: {finding.dueDate}</span>
                    </div>
                    {finding.aiRecommendation && (
                      <div className="flex items-start gap-2 mt-3 p-2 bg-orange-50 rounded-lg">
                        <Sparkles className="w-4 h-4 text-[#E85A2B] mt-0.5" />
                        <span className="text-sm text-gray-700">{finding.aiRecommendation}</span>
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
