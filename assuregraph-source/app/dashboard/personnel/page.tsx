"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Plus, Mail, Shield, UserCheck } from "lucide-react";

const personnel = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "Compliance Manager",
    department: "Security",
    status: "active",
    certifications: ["CISA", "CISSP"],
    lastTraining: "2024-02-15",
  },
  {
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Risk Analyst",
    department: "Risk Management",
    status: "active",
    certifications: ["CRISC"],
    lastTraining: "2024-01-20",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Security Engineer",
    department: "Engineering",
    status: "active",
    certifications: ["OSCP", "CEH"],
    lastTraining: "2024-03-01",
  },
  {
    name: "Tom Wilson",
    email: "tom.wilson@company.com",
    role: "IT Auditor",
    department: "Audit",
    status: "inactive",
    certifications: ["CISA"],
    lastTraining: "2023-11-10",
  },
];

export default function PersonnelPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personnel</h1>
          <p className="text-gray-500">Manage team members and their compliance roles</p>
        </div>
        <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
          <Plus className="w-4 h-4" />
          Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-sm text-gray-500">Active Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">18</div>
                <div className="text-sm text-gray-500">Certified</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Mail className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-500">Training Due</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="Search personnel..." className="pl-10" />
      </div>

      {/* Personnel List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {personnel.map((person) => (
              <div
                key={person.email}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-gray-200 text-gray-700">
                      {person.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{person.name}</span>
                      <Badge
                        className={
                          person.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      >
                        {person.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">{person.email}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">{person.role}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{person.department}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 justify-end mb-1">
                    {person.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    Last training: {person.lastTraining}
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
