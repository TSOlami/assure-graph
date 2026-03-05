"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Server, Laptop, Database, Cloud, Shield, AlertTriangle } from "lucide-react";

const assets = [
  {
    id: "AST-001",
    name: "Production Database Cluster",
    type: "Database",
    environment: "Production",
    owner: "Emily Davis",
    criticality: "Critical",
    complianceStatus: "compliant",
    lastScan: "2024-03-08",
  },
  {
    id: "AST-002",
    name: "Web Application Servers",
    type: "Server",
    environment: "Production",
    owner: "Mike Johnson",
    criticality: "High",
    complianceStatus: "compliant",
    lastScan: "2024-03-07",
  },
  {
    id: "AST-003",
    name: "Employee Laptops",
    type: "Endpoint",
    environment: "Corporate",
    owner: "IT Team",
    criticality: "Medium",
    complianceStatus: "attention",
    lastScan: "2024-03-05",
  },
  {
    id: "AST-004",
    name: "Backup Storage",
    type: "Storage",
    environment: "Production",
    owner: "Tom Wilson",
    criticality: "High",
    complianceStatus: "compliant",
    lastScan: "2024-03-06",
  },
];

const assetTypes = [
  { name: "Servers", count: 45, icon: Server },
  { name: "Databases", count: 12, icon: Database },
  { name: "Endpoints", count: 156, icon: Laptop },
  { name: "Cloud Resources", count: 89, icon: Cloud },
];

export default function AssetsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="text-gray-500">Manage and track IT assets for compliance</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Plus className="w-4 h-4" />
          Add Asset
        </Button>
      </div>

      {/* Asset Types */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assetTypes.map((type) => (
          <Card key={type.name} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <type.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{type.count}</div>
                  <div className="text-sm text-gray-500">{type.name}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="Search assets..." className="pl-10" />
      </div>

      {/* Assets List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {asset.type === "Database" && <Database className="w-5 h-5 text-gray-600" />}
                      {asset.type === "Server" && <Server className="w-5 h-5 text-gray-600" />}
                      {asset.type === "Endpoint" && <Laptop className="w-5 h-5 text-gray-600" />}
                      {asset.type === "Storage" && <Cloud className="w-5 h-5 text-gray-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{asset.id}</span>
                        <Badge variant="outline">{asset.type}</Badge>
                        <Badge
                          className={
                            asset.criticality === "Critical"
                              ? "bg-red-100 text-red-700"
                              : asset.criticality === "High"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        >
                          {asset.criticality}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-gray-900 mt-1">{asset.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>Environment: {asset.environment}</span>
                        <span>Owner: {asset.owner}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        asset.complianceStatus === "compliant"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    >
                      {asset.complianceStatus === "compliant" ? (
                        <Shield className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {asset.complianceStatus}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-2">
                      Last scan: {asset.lastScan}
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
