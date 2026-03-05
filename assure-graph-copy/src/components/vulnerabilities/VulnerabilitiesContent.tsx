"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bug, AlertTriangle, Shield, Clock, CheckCircle2, Sparkles } from "lucide-react";

const vulnerabilities = [
  {
    id: "CVE-2024-1234",
    title: "Remote Code Execution in Apache Struts",
    severity: "Critical",
    cvss: 9.8,
    affectedAssets: ["web-server-01", "web-server-02"],
    status: "open",
    discovered: "2024-03-05",
    remediation: "Update to version 2.5.33",
  },
  {
    id: "CVE-2024-5678",
    title: "SQL Injection in Customer Portal",
    severity: "High",
    cvss: 8.1,
    affectedAssets: ["app-server-03"],
    status: "in_progress",
    discovered: "2024-03-03",
    remediation: "Apply patch from vendor",
  },
  {
    id: "CVE-2024-9012",
    title: "Information Disclosure in API",
    severity: "Medium",
    cvss: 5.3,
    affectedAssets: ["api-gateway-01"],
    status: "open",
    discovered: "2024-03-01",
    remediation: "Update API configuration",
  },
  {
    id: "CVE-2024-3456",
    title: "Cross-Site Scripting in Admin Panel",
    severity: "Medium",
    cvss: 6.1,
    affectedAssets: ["admin-panel"],
    status: "remediated",
    discovered: "2024-02-28",
    remediation: "Input validation implemented",
  },
];

const aiInsights = [
  {
    title: "Critical Vulnerability Detected",
    description: "CVE-2024-1234 affects production web servers",
    action: "Schedule emergency patching within 24 hours",
    priority: "Critical",
  },
  {
    title: "Patch Management Gap",
    description: "Average time to patch increased to 14 days",
    action: "Review patching procedures and resource allocation",
    priority: "High",
  },
];

export default function VulnerabilitiesContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vulnerabilities</h1>
          <p className="text-gray-500">Track and remediate security vulnerabilities</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Shield className="w-4 h-4" />
          Run Scan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-500">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-sm text-gray-500">Critical</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">5</div>
            <div className="text-sm text-gray-500">High</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-500">Medium</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">9</div>
            <div className="text-sm text-gray-500">Low</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">AI Security Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <div
                key={insight.title}
                className="p-3 bg-white rounded-lg border border-orange-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{insight.title}</span>
                  <Badge
                    className={
                      insight.priority === "Critical"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }
                  >
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{insight.description}</p>
                <p className="text-sm text-[#E85A2B] mt-1">{insight.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vulnerabilities List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Vulnerabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <div
                key={vuln.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-500">{vuln.id}</span>
                      <Badge
                        className={
                          vuln.severity === "Critical"
                            ? "bg-red-100 text-red-700"
                            : vuln.severity === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        <Bug className="w-3 h-3 mr-1" />
                        {vuln.severity}
                      </Badge>
                      <Badge
                        className={
                          vuln.status === "remediated"
                            ? "bg-green-100 text-green-700"
                            : vuln.status === "in_progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {vuln.status === "remediated" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {vuln.status === "in_progress" && <Clock className="w-3 h-3 mr-1" />}
                        {vuln.status === "open" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {vuln.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mt-2">{vuln.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-sm">
                        <span className="text-gray-500">CVSS: </span>
                        <span className={`font-medium ${
                          vuln.cvss >= 9 ? "text-red-600" : vuln.cvss >= 7 ? "text-orange-600" : "text-blue-600"
                        }`}>
                          {vuln.cvss}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Discovered: {vuln.discovered}
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Affected: </span>
                      <span className="text-sm">{vuln.affectedAssets.join(", ")}</span>
                    </div>
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                      <span className="text-gray-500">Remediation: </span>
                      <span>{vuln.remediation}</span>
                    </div>
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
