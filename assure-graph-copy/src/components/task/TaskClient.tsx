"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, ArrowRight, Calendar, User, Filter, Plus } from "lucide-react";

const tasks = [
  {
    id: "TASK-001",
    title: "Review quarterly access controls",
    description: "Validate user access permissions across all critical systems",
    priority: "High",
    dueDate: "2024-03-15",
    assignee: "Sarah Chen",
    framework: "SOC 2",
    aiRecommended: true,
    status: "pending",
  },
  {
    id: "TASK-002",
    title: "Update incident response policy",
    description: "Incorporate lessons learned from recent security incident",
    priority: "Medium",
    dueDate: "2024-03-20",
    assignee: "Mike Johnson",
    framework: "ISO 27001",
    aiRecommended: false,
    status: "pending",
  },
  {
    id: "TASK-003",
    title: "Complete vendor risk assessment",
    description: "Evaluate security posture of new cloud service provider",
    priority: "High",
    dueDate: "2024-03-12",
    assignee: "Emily Davis",
    framework: "PCI DSS",
    aiRecommended: true,
    status: "in_progress",
  },
  {
    id: "TASK-004",
    title: "Document encryption procedures",
    description: "Create technical documentation for data encryption at rest",
    priority: "Low",
    dueDate: "2024-03-25",
    assignee: "Tom Wilson",
    framework: "HIPAA",
    aiRecommended: false,
    status: "pending",
  },
];

const aiPriorities = [
  {
    task: "TASK-001: Review quarterly access controls",
    reason: "Audit finding linked to this control - immediate attention required",
    impact: "High",
  },
  {
    task: "TASK-003: Complete vendor risk assessment",
    reason: "Vendor onboarding blocked - business critical",
    impact: "High",
  },
];

export default function TaskClient() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500">Manage and track your GRC tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* AI Priority Section */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E85A2B]" />
            <CardTitle className="text-lg">AI-Powered Priorities</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiPriorities.map((item) => (
              <div
                key={item.task}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-100"
              >
                <div>
                  <div className="font-medium text-gray-900">{item.task}</div>
                  <div className="text-sm text-gray-500">{item.reason}</div>
                </div>
                <Badge className="bg-red-100 text-red-700">{item.impact} Impact</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Checkbox className="mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-500">{task.id}</span>
                    {task.aiRecommended && (
                      <Badge className="bg-orange-100 text-[#E85A2B] gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Recommended
                      </Badge>
                    )}
                    <Badge
                      className={
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-gray-900 mt-1">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due {task.dueDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {task.assignee}
                    </div>
                    <Badge variant="outline">{task.framework}</Badge>
                  </div>
                </div>
                <Link href={`/task/${task.id}`}>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
