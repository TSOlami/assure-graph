"use client";

import AppLayout from "@/components/global/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Target,
  Activity
} from "lucide-react";

const riskStats = [
  {
    title: "Total Risks",
    value: "47",
    change: "+3",
    trend: "up",
    color: "text-gray-900",
  },
  {
    title: "Critical Risks",
    value: "5",
    change: "-2",
    trend: "down",
    color: "text-red-600",
  },
  {
    title: "High Risks",
    value: "12",
    change: "+1",
    trend: "up",
    color: "text-orange-600",
  },
  {
    title: "Mitigated This Month",
    value: "8",
    change: "+5",
    trend: "up",
    color: "text-green-600",
  },
];

const aiPredictions = [
  {
    risk: "Cloud Infrastructure",
    prediction: "Likelihood of data breach increasing based on recent config changes",
    probability: "68%",
    action: "Review IAM policies immediately",
  },
  {
    risk: "Third-Party Vendor",
    prediction: "Vendor security score declining over past 30 days",
    probability: "45%",
    action: "Schedule vendor security review",
  },
];

const topRisks = [
  {
    id: "RISK-001",
    name: "Insufficient backup coverage",
    category: "Operational",
    likelihood: "High",
    impact: "High",
    score: 16,
    status: "active",
  },
  {
    id: "RISK-002",
    name: "Key person dependency",
    category: "Operational",
    likelihood: "Medium",
    impact: "High",
    score: 12,
    status: "active",
  },
  {
    id: "RISK-003",
    name: "Legacy system vulnerabilities",
    category: "Technical",
    likelihood: "High",
    impact: "Medium",
    score: 12,
    status: "mitigating",
  },
];

export default function RiskManagementPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Risk Management</h1>
            <p className="text-gray-500">Identify, assess, and mitigate enterprise risks</p>
          </div>
          <div className="flex gap-2">
            <Link href="/risk-management/risk-assessment">
              <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
                <Target className="w-4 h-4" />
                Start Assessment
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {riskStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
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
                <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Predictions */}
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E85A2B]" />
              <CardTitle className="text-lg">AI Risk Predictions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiPredictions.map((item) => (
                <div
                  key={item.risk}
                  className="p-3 bg-white rounded-lg border border-orange-100"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{item.risk}</span>
                    <Badge className="bg-red-100 text-red-700">{item.probability} probability</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{item.prediction}</p>
                  <p className="text-sm text-[#E85A2B] mt-1">{item.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Risks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Top Risks</CardTitle>
              <Link href="/risk-management/risk-register">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRisks.map((risk) => (
                  <div
                    key={risk.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{risk.id}</span>
                          <Badge variant="outline">{risk.category}</Badge>
                        </div>
                        <h3 className="font-medium text-gray-900 mt-1">{risk.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            className={
                              risk.likelihood === "High"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }
                          >
                            {risk.likelihood} Likelihood
                          </Badge>
                          <Badge
                            className={
                              risk.impact === "High"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }
                          >
                            {risk.impact} Impact
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{risk.score}</div>
                        <div className="text-xs text-gray-500">Risk Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Management Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/risk-management/risk-register">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <ShieldAlert className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Risk Register</div>
                      <div className="text-sm text-gray-500">View and manage all risks</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/risk-management/risk-assessment">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Risk Assessment</div>
                      <div className="text-sm text-gray-500">Conduct new risk assessment</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/risk-management/risk-acceptance">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Risk Acceptance</div>
                      <div className="text-sm text-gray-500">Manage accepted risks</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/vendors">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Vendor Risk</div>
                      <div className="text-sm text-gray-500">Assess third-party risks</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
