"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const totalSteps = 4;

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-[#E85A2B] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AssureGraph</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
              <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-2" />
            <CardTitle className="text-xl mt-4">
              {step === 1 && "Create Your Account"}
              {step === 2 && "Verify Your Email"}
              {step === 3 && "Set Up Your Organization"}
              {step === 4 && "Choose Your Frameworks"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Get started with your free trial"}
              {step === 2 && "Enter the 6-digit code sent to your email"}
              {step === 3 && "Tell us about your company"}
              {step === 4 && "Select compliance frameworks to track"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Email</label>
                  <Input type="email" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button 
                  className="w-full bg-[#E85A2B] hover:bg-[#d14d20] text-white"
                  onClick={() => setStep(2)}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500">
                  Didn&apos;t receive the code?{" "}
                  <button className="text-[#E85A2B] hover:underline">Resend</button>
                </p>
                <Button 
                  className="w-full bg-[#E85A2B] hover:bg-[#d14d20] text-white"
                  onClick={() => setStep(3)}
                >
                  Verify
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input className="pl-10" placeholder="Acme Inc." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Industry</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                    <option>Select industry</option>
                    <option>Technology</option>
                    <option>Financial Services</option>
                    <option>Healthcare</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Size</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                    <option>Select size</option>
                    <option>1-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>501-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>
                <Button 
                  className="w-full bg-[#E85A2B] hover:bg-[#d14d20] text-white"
                  onClick={() => setStep(4)}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "SOC 2", desc: "Service Organization Control" },
                    { name: "ISO 27001", desc: "Information Security" },
                    { name: "PCI DSS", desc: "Payment Card Industry" },
                    { name: "HIPAA", desc: "Healthcare Data" },
                    { name: "GDPR", desc: "Data Protection" },
                    { name: "NIST", desc: "Cybersecurity Framework" },
                  ].map((framework) => (
                    <button
                      key={framework.name}
                      className="p-3 border rounded-lg text-left hover:border-[#E85A2B] hover:bg-orange-50 transition-colors"
                    >
                      <div className="font-medium text-sm">{framework.name}</div>
                      <div className="text-xs text-gray-500">{framework.desc}</div>
                    </button>
                  ))}
                </div>
                <Link href="/dashboard">
                  <Button className="w-full bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                    Complete Setup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex items-start gap-3 bg-orange-50 p-4 rounded-lg border border-orange-100">
          <Sparkles className="w-5 h-5 text-[#E85A2B] mt-0.5" />
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">AI-Powered Setup</span>
            <p className="mt-1">
              AssureAI will automatically configure your dashboard based on your selections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
