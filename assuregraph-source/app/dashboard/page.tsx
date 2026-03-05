"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Shield,
  Target,
  AlertCircle,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Compliance Score",
    value: "94%",
    change: "+2.3%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Open Risks",
    value: "12",
    change: "-3",
    trend: "up",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Failed Controls",
    value: "3",
    change: "+1",
    trend: "down",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "Pending Tasks",
    value: "8",
    change: "-5",
    trend: "up",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

const aiInsights = [
  {
    type: "prediction",
    title: "Compliance Forecast",
    description: "Your SOC 2 compliance score is projected to reach 96% by end of Q2 based on current remediation velocity.",
    action: "View Details",
  },
  {
    type: "recommendation",
    title: "Control Gap Detected",
    description: "Access Review control is failing across multiple frameworks. AI suggests consolidating evidence collection.",
    action: "Fix Now",
  },
  {
    type: "alert",
    title: "Upcoming Audit",
    description: "Annual ISO 27001 audit scheduled in 14 days. 3 evidence items are still pending.",
    action: "Prepare",
  },
];

const recentActivity = [
  { action: "Control test completed", item: "AC-001: Access Control Policy", time: "2 hours ago", user: "Sarah Chen" },
  { action: "Evidence uploaded", item: "Firewall configuration backup", time: "4 hours ago", user: "Mike Johnson" },
  { action: "Risk accepted", item: "RISK-2024-012: Legacy system vulnerability", time: "6 hours ago", user: "Emily Davis" },
  { action: "Finding remediated", item: "FIND-089: Missing encryption at rest", time: "1 day ago", user: "Tom Wilson" },
];

const frameworkStatus = [
  { name: "SOC 2 Type II", progress: 94, status: "Compliant", color: "bg-green-500" },
  { name: "ISO 27001", progress: 87, status: "In Progress", color: "bg-blue-500" },
  { name: "PCI DSS", progress: 78, status: "Attention Needed", color: "bg-orange-500" },
  { name: "HIPAA", progress: 91, status: "Compliant", color: "bg-green-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's your GRC overview.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Activity className="w-4 h-4" />
            Generate Report
          </Button>
          <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
            <Sparkles className="w-4 h-4" />
            AI Insights
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">AssureAI Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.title}
                className="p-4 bg-white rounded-lg border border-orange-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  {insight.type === "prediction" && <TrendingUp className="w-4 h-4 text-blue-500" />}
                  {insight.type === "recommendation" && <Sparkles className="w-4 h-4 text-[#E85A2B]" />}
                  {insight.type === "alert" && <AlertCircle className="w-4 h-4 text-red-500" />}
                  <span className="font-medium text-gray-900">{insight.title}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <Button variant="link" className="p-0 h-auto text-[#E85A2B]">
                  {insight.action}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Framework Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Framework Compliance</CardTitle>
            <Link href="/dashboard/frameworks">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {frameworkStatus.map((framework) => (
                <div key={framework.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{framework.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{framework.progress}%</span>
                      <Badge
                        variant={framework.status === "Compliant" ? "default" : "secondary"}
                        className={
                          framework.status === "Compliant"
                            ? "bg-green-100 text-green-700"
                            : framework.status === "Attention Needed"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        {framework.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={framework.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.item}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: "Start Risk Assessment", href: "/dashboard/risk-assessment" },
              { icon: Target, label: "Review Controls", href: "/dashboard/controls" },
              { icon: CheckCircle2, label: "Upload Evidence", href: "/dashboard/evidence" },
              { icon: FileText, label: "Generate Report", href: "/dashboard/reports" },
            ].map((action) => (
              <Link key={action.label} href={action.href}>
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                  <action.icon className="w-5 h-5" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
