"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, ShieldAlert, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

const risks = [
  {
    id: "RISK-2024-001",
    name: "Data breach due to misconfigured S3 bucket",
    category: "Security",
    likelihood: "Medium",
    impact: "Critical",
    score: 15,
    status: "active",
    owner: "Sarah Chen",
    treatment: "mitigate",
  },
  {
    id: "RISK-2024-002",
    name: "Loss of critical business data",
    category: "Operational",
    likelihood: "Low",
    impact: "High",
    score: 8,
    status: "active",
    owner: "Mike Johnson",
    treatment: "mitigate",
  },
  {
    id: "RISK-2024-003",
    name: "Vendor service disruption",
    category: "Third-Party",
    likelihood: "Medium",
    impact: "Medium",
    score: 9,
    status: "monitoring",
    owner: "Emily Davis",
    treatment: "transfer",
  },
  {
    id: "RISK-2024-004",
    name: "Regulatory non-compliance",
    category: "Compliance",
    likelihood: "Low",
    impact: "Critical",
    score: 10,
    status: "active",
    owner: "Tom Wilson",
    treatment: "mitigate",
  },
  {
    id: "RISK-2024-005",
    name: "Key personnel departure",
    category: "Operational",
    likelihood: "Medium",
    impact: "Medium",
    score: 9,
    status: "accepted",
    owner: "Sarah Chen",
    treatment: "accept",
  },
];

export default function RiskRegisterContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Register</h1>
          <p className="text-gray-500">Complete inventory of identified risks</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Plus className="w-4 h-4" />
          Add Risk
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">47</div>
            <div className="text-sm text-gray-500">Total Risks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">5</div>
            <div className="text-sm text-gray-500">Critical</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-gray-500">High</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">18</div>
            <div className="text-sm text-gray-500">Medium</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-500">Low</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Search risks..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Risks List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Risks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {risks.map((risk) => (
              <div
                key={risk.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-500">{risk.id}</span>
                      <Badge variant="outline">{risk.category}</Badge>
                      <Badge
                        className={
                          risk.impact === "Critical"
                            ? "bg-red-100 text-red-700"
                            : risk.impact === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {risk.impact} Impact
                      </Badge>
                      <Badge
                        className={
                          risk.status === "active"
                            ? "bg-red-100 text-red-700"
                            : risk.status === "monitoring"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }
                      >
                        {risk.status === "active" && <ShieldAlert className="w-3 h-3 mr-1" />}
                        {risk.status === "monitoring" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {risk.status === "accepted" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {risk.status}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mt-2">{risk.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Likelihood: {risk.likelihood}</span>
                      <span>Owner: {risk.owner}</span>
                      <span>Treatment: {risk.treatment}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{risk.score}</div>
                    <div className="text-xs text-gray-500">Risk Score</div>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
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
