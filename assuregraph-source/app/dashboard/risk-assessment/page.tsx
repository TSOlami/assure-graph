"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Target } from "lucide-react";

const steps = [
  { id: 1, name: "Risk Identification" },
  { id: 2, name: "Impact Assessment" },
  { id: 3, name: "Likelihood Analysis" },
  { id: 4, name: "Treatment Plan" },
];

export default function RiskAssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Assessment</h1>
          <p className="text-gray-500">Conduct a comprehensive risk assessment</p>
        </div>
        <Badge className="bg-orange-100 text-[#E85A2B] gap-1 w-fit">
          <Sparkles className="w-3 h-3" />
          AI-Assisted
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id <= currentStep
                      ? "bg-[#E85A2B] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {step.id < currentStep ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:block ${
                    step.id <= currentStep ? "text-gray-900 font-medium" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-8 sm:w-16 h-px bg-gray-200 mx-2 sm:mx-4" />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Risk Name</label>
                <Input placeholder="e.g., Data breach due to misconfiguration" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe the risk in detail..." />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option>Select category</option>
                  <option>Security</option>
                  <option>Operational</option>
                  <option>Compliance</option>
                  <option>Financial</option>
                  <option>Strategic</option>
                  <option>Third-Party</option>
                </select>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-[#E85A2B] mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">AI Suggestion</div>
                    <p className="text-sm text-gray-600">
                      Based on similar risks in your register, consider also assessing 
                      the impact on customer trust and regulatory fines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Impact Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  {["Low", "Medium", "High", "Critical"].map((level) => (
                    <button
                      key={level}
                      className="p-3 border rounded-lg text-center hover:border-[#E85A2B] hover:bg-orange-50 transition-colors"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Impact Areas</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Financial", "Reputation", "Operations", "Compliance", "Legal", "Safety"].map(
                    (area) => (
                      <label key={area} className="flex items-center gap-2 p-2 border rounded-lg">
                        <input type="checkbox" className="rounded" />
                        <span>{area}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Likelihood</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  {["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"].map((level) => (
                    <button
                      key={level}
                      className="p-3 border rounded-lg text-center hover:border-[#E85A2B] hover:bg-orange-50 transition-colors"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Contributing Factors</label>
                <Textarea placeholder="List factors that could increase likelihood..." />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Treatment Strategy</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { name: "Mitigate", desc: "Reduce likelihood or impact" },
                    { name: "Transfer", desc: "Insurance or third party" },
                    { name: "Accept", desc: "Acknowledge and monitor" },
                    { name: "Avoid", desc: "Eliminate the risk" },
                  ].map((strategy) => (
                    <button
                      key={strategy.name}
                      className="p-3 border rounded-lg text-left hover:border-[#E85A2B] hover:bg-orange-50 transition-colors"
                    >
                      <div className="font-medium">{strategy.name}</div>
                      <div className="text-sm text-gray-500">{strategy.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Mitigation Plan</label>
                <Textarea placeholder="Describe how you will address this risk..." />
              </div>
              <div>
                <label className="text-sm font-medium">Owner</label>
                <Input placeholder="Assign a risk owner" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep < steps.length ? (
              <Button
                className="bg-[#E85A2B] hover:bg-[#d14d20] text-white"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete Assessment
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
