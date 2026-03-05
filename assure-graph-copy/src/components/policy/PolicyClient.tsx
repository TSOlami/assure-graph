"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, Clock, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

const policies = [
  {
    id: "POL-001",
    name: "Information Security Policy",
    version: "2.3",
    status: "active",
    lastUpdated: "2024-02-01",
    reviewDate: "2024-08-01",
    owner: "Sarah Chen",
    frameworks: ["SOC 2", "ISO 27001"],
  },
  {
    id: "POL-002",
    name: "Access Control Policy",
    version: "1.5",
    status: "active",
    lastUpdated: "2024-01-15",
    reviewDate: "2024-07-15",
    owner: "Mike Johnson",
    frameworks: ["SOC 2", "PCI DSS"],
  },
  {
    id: "POL-003",
    name: "Incident Response Policy",
    version: "3.0",
    status: "pending_review",
    lastUpdated: "2024-03-01",
    reviewDate: "2024-03-15",
    owner: "Emily Davis",
    frameworks: ["SOC 2", "ISO 27001", "HIPAA"],
  },
  {
    id: "POL-004",
    name: "Data Retention Policy",
    version: "1.2",
    status: "draft",
    lastUpdated: "2024-02-20",
    reviewDate: "2024-04-01",
    owner: "Tom Wilson",
    frameworks: ["GDPR", "HIPAA"],
  },
];

const aiSuggestions = [
  {
    policy: "Incident Response Policy",
    suggestion: "Add section on cloud security incidents based on recent industry trends",
    confidence: "92%",
  },
  {
    policy: "Access Control Policy",
    suggestion: "Update MFA requirements to include phishing-resistant methods",
    confidence: "88%",
  },
];

export default function PolicyClient() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Policy Center</h1>
          <p className="text-gray-500">Manage and maintain your compliance policies</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Plus className="w-4 h-4" />
          New Policy
        </Button>
      </div>

      {/* AI Suggestions */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">AI Policy Suggestions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiSuggestions.map((item) => (
              <div
                key={item.policy}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-100"
              >
                <div>
                  <div className="font-medium text-gray-900">{item.policy}</div>
                  <div className="text-sm text-gray-500">{item.suggestion}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700">{item.confidence} confidence</Badge>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="Search policies..." className="pl-10" />
      </div>

      {/* Policies List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{policy.id}</span>
                      <Badge
                        className={
                          policy.status === "active"
                            ? "bg-green-100 text-green-700"
                            : policy.status === "pending_review"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      >
                        {policy.status === "active" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {policy.status === "pending_review" && <Clock className="w-3 h-3 mr-1" />}
                        {policy.status === "draft" && <AlertCircle className="w-3 h-3 mr-1" />}
                        {policy.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mt-1">{policy.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <span>v{policy.version}</span>
                      <span>•</span>
                      <span>Owner: {policy.owner}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {policy.frameworks.map((fw) => (
                        <Badge key={fw} variant="outline" className="text-xs">
                          {fw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Last updated</div>
                  <div className="text-sm font-medium">{policy.lastUpdated}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Review: {policy.reviewDate}
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
