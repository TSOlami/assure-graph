"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, XCircle, RefreshCw, Plus, Cloud, Lock, FileText, MessageSquare } from "lucide-react";

const integrations = [
  {
    name: "AWS",
    category: "Cloud",
    status: "connected",
    lastSync: "2 hours ago",
    description: "Auto-collect evidence from AWS Config, CloudTrail, and IAM",
    icon: Cloud,
  },
  {
    name: "Azure AD",
    category: "Identity",
    status: "connected",
    lastSync: "1 hour ago",
    description: "Sync user access data and authentication logs",
    icon: Lock,
  },
  {
    name: "Jira",
    category: "Project Management",
    status: "connected",
    lastSync: "30 minutes ago",
    description: "Track remediation tasks and control testing",
    icon: FileText,
  },
  {
    name: "Slack",
    category: "Communication",
    status: "disconnected",
    lastSync: "Never",
    description: "Get real-time alerts and notifications",
    icon: MessageSquare,
  },
  {
    name: "Okta",
    category: "Identity",
    status: "connected",
    lastSync: "3 hours ago",
    description: "Access review and user lifecycle management",
    icon: Lock,
  },
];

const aiRecommendations = [
  {
    integration: "GitHub",
    reason: "Source code scanning for security vulnerabilities",
    benefit: "Automate evidence collection for SDLC controls",
  },
  {
    integration: "Datadog",
    reason: "Monitor infrastructure compliance in real-time",
    benefit: "Continuous monitoring for 24/7 compliance",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-500">Connect your tools for automated compliance</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Plus className="w-4 h-4" />
          Add Integration
        </Button>
      </div>

      {/* AI Recommendations */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">Recommended Integrations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {aiRecommendations.map((rec) => (
              <div
                key={rec.integration}
                className="p-4 bg-white rounded-lg border border-orange-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{rec.integration}</span>
                  <Button size="sm" className="bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                    Connect
                  </Button>
                </div>
                <p className="text-sm text-gray-600">{rec.reason}</p>
                <p className="text-sm text-[#E85A2B] mt-1">{rec.benefit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integrations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <integration.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{integration.name}</h3>
                    <p className="text-xs text-gray-500">{integration.category}</p>
                  </div>
                </div>
                <Badge
                  className={
                    integration.status === "connected"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {integration.status === "connected" ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  {integration.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-4">{integration.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-xs text-gray-500">
                  Last sync: {integration.lastSync}
                </span>
                <Button variant="ghost" size="sm" className="gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Sync
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
