"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Clock, AlertTriangle, CheckCircle2, Calendar, User } from "lucide-react";

const exceptions = [
  {
    id: "EXC-001",
    title: "Legacy system without MFA",
    description: "Critical legacy application cannot support modern MFA",
    riskLevel: "High",
    status: "pending_approval",
    requester: "Mike Johnson",
    approver: "Sarah Chen",
    expiryDate: "2024-06-30",
    compensatingControls: ["Network segmentation", "Enhanced monitoring"],
  },
  {
    id: "EXC-002",
    title: "Third-party vendor access delay",
    description: "Vendor onboarding delayed due to contract negotiations",
    riskLevel: "Medium",
    status: "approved",
    requester: "Emily Davis",
    approver: "Sarah Chen",
    expiryDate: "2024-04-15",
    compensatingControls: ["Temporary access review"],
  },
  {
    id: "EXC-003",
    title: "Development environment encryption waiver",
    description: "Non-production data encryption not required for testing",
    riskLevel: "Low",
    status: "approved",
    requester: "Tom Wilson",
    approver: "Mike Johnson",
    expiryDate: "2024-12-31",
    compensatingControls: ["No production data", "Isolated network"],
  },
];

export default function ExceptionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exceptions</h1>
          <p className="text-gray-500">Manage policy exceptions and waivers</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Plus className="w-4 h-4" />
          Request Exception
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-500">Total Exceptions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-500">Pending Approval</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-500">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-500">Expiring Soon</div>
          </CardContent>
        </Card>
      </div>

      {/* Exceptions List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Exception Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exceptions.map((exception) => (
              <div
                key={exception.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{exception.id}</span>
                      <Badge
                        className={
                          exception.riskLevel === "High"
                            ? "bg-red-100 text-red-700"
                            : exception.riskLevel === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {exception.riskLevel} Risk
                      </Badge>
                      <Badge
                        className={
                          exception.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {exception.status === "approved" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {exception.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mt-2">{exception.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{exception.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Requested by {exception.requester}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Expires {exception.expiryDate}
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {exception.compensatingControls.map((control) => (
                        <Badge key={control} variant="outline" className="text-xs">
                          {control}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {exception.status === "pending_approval" && (
                      <>
                        <Button size="sm" variant="outline" className="text-green-600">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          Reject
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="ghost">
                      View
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
