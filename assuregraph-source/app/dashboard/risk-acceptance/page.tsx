"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, User, Calendar, AlertTriangle } from "lucide-react";

const acceptedRisks = [
  {
    id: "RISK-2024-005",
    name: "Key personnel departure",
    description: "Risk of business disruption if key team members leave",
    justification: "Cross-training program in place, documented procedures",
    approver: "CTO",
    approvedDate: "2024-02-01",
    reviewDate: "2024-08-01",
    compensatingControls: ["Documentation", "Cross-training", "Succession planning"],
  },
  {
    id: "RISK-2024-012",
    name: "Legacy system maintenance costs",
    description: "Higher costs to maintain outdated systems",
    justification: "Migration planned for Q3 2024, cost-benefit analysis complete",
    approver: "CFO",
    approvedDate: "2024-01-15",
    reviewDate: "2024-07-15",
    compensatingControls: ["Maintenance contract", "Migration timeline"],
  },
  {
    id: "RISK-2024-018",
    name: "Single cloud provider dependency",
    description: "All infrastructure hosted with one provider",
    justification: "Multi-cloud strategy in planning phase for 2025",
    approver: "CTO",
    approvedDate: "2024-03-01",
    reviewDate: "2024-09-01",
    compensatingControls: ["DR plan", "Regular backups", "SLA monitoring"],
  },
];

export default function RiskAcceptancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Acceptance</h1>
          <p className="text-gray-500">Manage accepted risks and their review schedule</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Request Acceptance
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-500">Accepted Risks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-gray-500">Pending Approval</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-500">Review Overdue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-500">Upcoming Reviews</div>
          </CardContent>
        </Card>
      </div>

      {/* Accepted Risks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Accepted Risks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {acceptedRisks.map((risk) => (
              <div
                key={risk.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{risk.id}</span>
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Accepted
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mt-2">{risk.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700">Justification</div>
                      <p className="text-sm text-gray-600">{risk.justification}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {risk.compensatingControls.map((control) => (
                        <Badge key={control} variant="outline" className="text-xs">
                          {control}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Approved by {risk.approver}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Approved: {risk.approvedDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Review: {risk.reviewDate}
                      </div>
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
