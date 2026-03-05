"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Building2, Star, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

const vendors = [
  {
    id: "VEN-001",
    name: "AWS",
    category: "Cloud Provider",
    riskScore: 25,
    status: "approved",
    contractExpiry: "2025-03-01",
    lastAssessment: "2024-02-01",
    criticality: "High",
  },
  {
    id: "VEN-002",
    name: "Salesforce",
    category: "SaaS",
    riskScore: 35,
    status: "approved",
    contractExpiry: "2024-12-31",
    lastAssessment: "2024-01-15",
    criticality: "High",
  },
  {
    id: "VEN-003",
    name: "Datadog",
    category: "Monitoring",
    riskScore: 45,
    status: "review_needed",
    contractExpiry: "2024-06-30",
    lastAssessment: "2023-09-01",
    criticality: "Medium",
  },
  {
    id: "VEN-004",
    name: "Stripe",
    category: "Payment Processor",
    riskScore: 20,
    status: "approved",
    contractExpiry: "2025-01-01",
    lastAssessment: "2024-02-15",
    criticality: "Critical",
  },
];

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <p className="text-gray-500">Manage third-party vendor risk</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Plus className="w-4 h-4" />
          Add Vendor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">32</div>
            <div className="text-sm text-gray-500">Total Vendors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">28</div>
            <div className="text-sm text-gray-500">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-500">Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-500">High Risk</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="Search vendors..." className="pl-10" />
      </div>

      {/* Vendors List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Building2 className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{vendor.id}</span>
                        <Badge variant="outline">{vendor.category}</Badge>
                        <Badge
                          className={
                            vendor.criticality === "Critical"
                              ? "bg-red-100 text-red-700"
                              : vendor.criticality === "High"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        >
                          {vendor.criticality} Criticality
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mt-1">{vendor.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>Contract expires: {vendor.contractExpiry}</span>
                        <span>Last assessment: {vendor.lastAssessment}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-2xl font-bold text-gray-900">{vendor.riskScore}</span>
                      <span className="text-sm text-gray-500">/100</span>
                    </div>
                    <div className="text-xs text-gray-500">Risk Score</div>
                    <Badge
                      className={`mt-2 ${
                        vendor.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {vendor.status === "approved" ? (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {vendor.status.replace("_", " ")}
                    </Badge>
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
