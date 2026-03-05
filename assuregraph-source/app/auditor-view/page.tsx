"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { 
  Eye, 
  Shield, 
  CheckCircle2, 
  FileText, 
  Download, 
  Lock,
  Search,
  Target,
  AlertTriangle,
  Calendar
} from "lucide-react";

const auditorStats = [
  { title: "Frameworks", value: "4", icon: Target },
  { title: "Controls Tested", value: "127", icon: CheckCircle2 },
  { title: "Evidence Items", value: "342", icon: FileText },
  { title: "Findings", value: "8", icon: AlertTriangle },
];

const frameworks = [
  {
    name: "SOC 2 Type II",
    progress: 94,
    controls: { passed: 119, failed: 5, pending: 3 },
    lastAudit: "2024-01-15",
    nextAudit: "2024-07-15",
  },
  {
    name: "ISO 27001",
    progress: 87,
    controls: { passed: 99, failed: 8, pending: 7 },
    lastAudit: "2023-09-20",
    nextAudit: "2024-09-20",
  },
];

const recentEvidence = [
  { id: "EV-001", name: "Q1 Access Review Report", framework: "SOC 2", date: "2024-03-01" },
  { id: "EV-002", name: "Vulnerability Scan Results", framework: "ISO 27001", date: "2024-03-08" },
  { id: "EV-003", name: "Firewall Configuration Backup", framework: "PCI DSS", date: "2024-03-05" },
];

export default function AuditorViewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E85A2B] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AssureGraph</span>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Auditor View</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-700 gap-1">
                <Lock className="w-3 h-3" />
                Read-Only Access
              </Badge>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Exit Auditor View
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Welcome Banner */}
          <Card className="bg-gradient-to-r from-blue-50 to-white border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Welcome, External Auditor</h1>
                  <p className="text-gray-600 mt-1">
                    This read-only portal provides access to all compliance documentation, 
                    evidence, and audit trails. All access is logged for security purposes.
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Access granted: March 1, 2024
                    </span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      Expires: March 31, 2024
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {auditorStats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <stat.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Framework Status */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Framework Compliance</CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {frameworks.map((framework) => (
                    <div key={framework.name} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{framework.name}</span>
                        <span className="text-sm font-medium">{framework.progress}%</span>
                      </div>
                      <Progress value={framework.progress} className="h-2 mb-3" />
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="p-2 bg-green-50 rounded">
                          <div className="font-semibold text-green-600">{framework.controls.passed}</div>
                          <div className="text-xs text-gray-500">Passed</div>
                        </div>
                        <div className="p-2 bg-red-50 rounded">
                          <div className="font-semibold text-red-600">{framework.controls.failed}</div>
                          <div className="text-xs text-gray-500">Failed</div>
                        </div>
                        <div className="p-2 bg-blue-50 rounded">
                          <div className="font-semibold text-blue-600">{framework.controls.pending}</div>
                          <div className="text-xs text-gray-500">Pending</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Evidence */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Recent Evidence</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEvidence.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <FileText className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">
                            {item.framework} • {item.date}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Control Testing Results", icon: CheckCircle2, count: "127 items" },
                  { name: "Audit Findings", icon: AlertTriangle, count: "8 open" },
                  { name: "Policy Documents", icon: FileText, count: "12 policies" },
                  { name: "Evidence Library", icon: Search, count: "342 items" },
                ].map((item) => (
                  <Button
                    key={item.name}
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.count}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
