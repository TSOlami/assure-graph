"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, CheckCircle2, XCircle, Clock, ArrowRight, Sparkles } from "lucide-react";

const controls = [
  {
    id: "AC-001",
    name: "Access Control Policy",
    description: "Establish and maintain access control policies",
    framework: "SOC 2",
    status: "passed",
    lastTested: "2024-03-01",
    evidence: 5,
    aiInsight: "Evidence auto-mapped from Okta integration",
  },
  {
    id: "AC-002",
    name: "User Access Review",
    description: "Quarterly review of user access permissions",
    framework: "SOC 2",
    status: "failed",
    lastTested: "2024-02-15",
    evidence: 2,
    aiInsight: "3 dormant accounts detected - recommend removal",
  },
  {
    id: "CC-006",
    name: "Encryption at Rest",
    description: "Sensitive data must be encrypted when stored",
    framework: "PCI DSS",
    status: "failed",
    lastTested: "2024-03-05",
    evidence: 1,
    aiInsight: "2 RDS instances missing encryption",
  },
  {
    id: "SI-004",
    name: "Vulnerability Management",
    description: "Regular vulnerability scanning and remediation",
    framework: "ISO 27001",
    status: "passed",
    lastTested: "2024-03-08",
    evidence: 8,
    aiInsight: "Scan coverage optimal - no gaps detected",
  },
  {
    id: "AU-003",
    name: "Audit Log Retention",
    description: "Maintain audit logs for minimum 1 year",
    framework: "HIPAA",
    status: "pending",
    lastTested: "Pending",
    evidence: 0,
    aiInsight: "Evidence collection scheduled for next week",
  },
];

export default function ControlsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Controls</h1>
          <p className="text-gray-500">Manage and test security controls</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
            <Sparkles className="w-4 h-4" />
            Auto-Test
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">127</div>
            <div className="text-sm text-gray-500">Total Controls</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">119</div>
            <div className="text-sm text-gray-500">Passed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">5</div>
            <div className="text-sm text-gray-500">Failed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-500">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="Search controls..." className="pl-10" />
      </div>

      {/* Controls List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {controls.map((control) => (
              <div
                key={control.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-500">{control.id}</span>
                      <Badge variant="outline">{control.framework}</Badge>
                      <Badge
                        className={
                          control.status === "passed"
                            ? "bg-green-100 text-green-700"
                            : control.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        {control.status === "passed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {control.status === "failed" && <XCircle className="w-3 h-3 mr-1" />}
                        {control.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                        {control.status}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mt-2">{control.name}</h3>
                    <p className="text-sm text-gray-600">{control.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Last tested: {control.lastTested}</span>
                      <span>Evidence: {control.evidence} items</span>
                    </div>
                    {control.aiInsight && (
                      <div className="flex items-start gap-2 mt-3 p-2 bg-orange-50 rounded-lg">
                        <Sparkles className="w-4 h-4 text-[#E85A2B] mt-0.5" />
                        <span className="text-sm text-gray-700">{control.aiInsight}</span>
                      </div>
                    )}
                  </div>
                  <Link href={`/dashboard/controls/${control.id}`}>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
