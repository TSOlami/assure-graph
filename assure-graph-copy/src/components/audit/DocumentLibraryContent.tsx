"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, FileText, Folder, MoreVertical, Clock } from "lucide-react";

const folders = [
  { name: "Policies", count: 12, updated: "2 days ago" },
  { name: "Procedures", count: 8, updated: "1 week ago" },
  { name: "Audit Reports", count: 15, updated: "3 days ago" },
  { name: "Training Materials", count: 6, updated: "2 weeks ago" },
];

const recentDocuments = [
  {
    id: "DOC-001",
    name: "Information Security Policy v2.3",
    type: "PDF",
    size: "2.4 MB",
    updatedBy: "Sarah Chen",
    updatedAt: "2024-03-01",
  },
  {
    id: "DOC-002",
    name: "Incident Response Procedure",
    type: "DOCX",
    size: "1.8 MB",
    updatedBy: "Mike Johnson",
    updatedAt: "2024-03-05",
  },
  {
    id: "DOC-003",
    name: "SOC 2 Type II Report 2023",
    type: "PDF",
    size: "15.2 MB",
    updatedBy: "Emily Davis",
    updatedAt: "2024-02-15",
  },
  {
    id: "DOC-004",
    name: "Security Awareness Training",
    type: "PPTX",
    size: "8.5 MB",
    updatedBy: "Tom Wilson",
    updatedAt: "2024-03-08",
  },
];

export default function DocumentLibraryContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Library</h1>
          <p className="text-gray-500">Manage and organize GRC documents</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="Search documents..." className="pl-10" />
      </div>

      {/* Folders */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <Card key={folder.name} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Folder className="w-6 h-6 text-blue-600" />
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="font-medium text-gray-900 mt-4">{folder.name}</h3>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                <span>{folder.count} files</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {folder.updated}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{doc.name}</span>
                      <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {doc.size} • Updated by {doc.updatedBy} on {doc.updatedAt}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
