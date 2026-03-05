"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, CheckCircle2, AlertTriangle, XCircle, Sparkles, RefreshCw } from "lucide-react";

const monitors = [
  {
    name: "Access Control Monitoring",
    status: "healthy",
    lastCheck: "2 minutes ago",
    coverage: 98,
    alerts: 0,
  },
  {
    name: "Encryption Status",
    status: "warning",
    lastCheck: "5 minutes ago",
    coverage: 87,
    alerts: 3,
  },
  {
    name: "Backup Verification",
    status: "healthy",
    lastCheck: "1 hour ago",
    coverage: 100,
    alerts: 0,
  },
  {
    name: "Vulnerability Scanning",
    status: "critical",
    lastCheck: "30 minutes ago",
    coverage: 65,
    alerts: 12,
  },
  {
    name: "Policy Compliance",
    status: "healthy",
    lastCheck: "15 minutes ago",
    coverage: 94,
    alerts: 1,
  },
];

const aiInsights = [
  {
    monitor: "Encryption Status",
    insight: "3 databases detected without encryption at rest",
    recommendation: "Enable encryption for RDS instances: prod-db-01, prod-db-02, analytics-db",
    priority: "High",
  },
  {
    monitor: "Vulnerability Scanning",
    insight: "Scan coverage dropped below threshold",
    recommendation: "Review scanner configuration - 35 hosts not being scanned",
    priority: "Critical",
  },
];

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monitoring</h1>
          <p className="text-gray-500">Continuous compliance monitoring dashboard</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh All
        </Button>
      </div>

      {/* AI Insights */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">AI-Detected Issues</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((item) => (
              <div
                key={item.monitor}
                className="p-3 bg-white rounded-lg border border-orange-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{item.monitor}</span>
                  <Badge
                    className={
                      item.priority === "Critical"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }
                  >
                    {item.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{item.insight}</p>
                <p className="text-sm text-[#E85A2B] mt-1">{item.recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monitors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monitors.map((monitor) => (
          <Card key={monitor.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {monitor.status === "healthy" && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {monitor.status === "warning" && (
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  )}
                  {monitor.status === "critical" && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-medium text-gray-900">{monitor.name}</span>
                </div>
                <Badge
                  className={
                    monitor.status === "healthy"
                      ? "bg-green-100 text-green-700"
                      : monitor.status === "warning"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {monitor.status}
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Coverage</span>
                    <span className="font-medium">{monitor.coverage}%</span>
                  </div>
                  <Progress
                    value={monitor.coverage}
                    className="h-2"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Active Alerts</span>
                  <span
                    className={`font-medium ${
                      monitor.alerts > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {monitor.alerts}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  Last check: {monitor.lastCheck}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
