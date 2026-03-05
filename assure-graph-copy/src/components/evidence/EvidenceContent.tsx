"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Upload, FileText, CheckCircle2, Clock, Link2, Sparkles, ArrowRight } from "lucide-react";

const evidence = [
  {
    id: "EV-001",
    name: "Q1 Access Review Report",
    type: "Document",
    framework: "SOC 2",
    control: "AC-002",
    status: "approved",
    uploadedBy: "Sarah Chen",
    uploadedAt: "2024-03-01",
    aiMapped: true,
  },
  {
    id: "EV-002",
    name: "Vulnerability Scan Results",
    type: "Report",
    framework: "ISO 27001",
    control: "SI-004",
    status: "pending_review",
    uploadedBy: "Mike Johnson",
    uploadedAt: "2024-03-08",
    aiMapped: true,
  },
  {
    id: "EV-003",
    name: "Firewall Configuration Backup",
    type: "Configuration",
    framework: "PCI DSS",
    control: "CC-006",
    status: "approved",
    uploadedBy: "Emily Davis",
    uploadedAt: "2024-03-05",
    aiMapped: false,
  },
  {
    id: "EV-004",
    name: "Employee Training Records",
    type: "Document",
    framework: "HIPAA",
    control: "TR-001",
    status: "pending_review",
    uploadedBy: "Tom Wilson",
    uploadedAt: "2024-03-10",
    aiMapped: true,
  },
];

const aiSuggestions = [
  {
    control: "AC-002: User Access Review",
    suggestion: "Evidence from Okta can be auto-mapped to this control",
    action: "Auto-map",
  },
  {
    control: "CC-007: Network Security",
    suggestion: "Missing evidence - recommend uploading firewall logs",
    action: "Upload",
  },
];

export default function EvidenceContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evidence</h1>
          <p className="text-gray-500">Manage compliance evidence and documentation</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Upload className="w-4 h-4" />
          Upload Evidence
        </Button>
      </div>

      {/* AI Suggestions */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">AI Evidence Suggestions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiSuggestions.map((item) => (
              <div
                key={item.control}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-100"
              >
                <div>
                  <div className="font-medium text-gray-900">{item.control}</div>
                  <div className="text-sm text-gray-500">{item.suggestion}</div>
                </div>
                <Button size="sm" className="bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                  {item.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          placeholder="Search evidence..."
          className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pl-10"
        />
      </div>

      {/* Evidence List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evidence.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-500">{item.id}</span>
                      <Badge variant="outline">{item.type}</Badge>
                      <Badge
                        className={
                          item.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {item.status === "approved" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {item.status.replace("_", " ")}
                      </Badge>
                      {item.aiMapped && (
                        <Badge className="bg-orange-100 text-[#E85A2B] gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI Mapped
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 mt-1">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <Badge variant="outline" className="text-xs">{item.framework}</Badge>
                      <Link href={`/controls/${item.control}`}>
                        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-100">
                          <Link2 className="w-3 h-3 mr-1" />
                          {item.control}
                        </Badge>
                      </Link>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Uploaded by {item.uploadedBy} on {item.uploadedAt}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
