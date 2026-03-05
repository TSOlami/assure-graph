"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Sparkles,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  FileText,
  Users,
  Lock,
  Zap,
  Globe,
  Cpu,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Star
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    name: "Solutions",
    items: [
      { name: "Governance", description: "Streamline governance processes", href: "/dashboard/governance" },
      { name: "Risk Management", description: "Identify and mitigate risks", href: "/dashboard/risk-management" },
      { name: "Compliance", description: "Maintain regulatory compliance", href: "/dashboard/compliance" },
      { name: "Audit Management", description: "Simplify audit workflows", href: "/dashboard/audits" },
    ],
  },
  {
    name: "Product",
    items: [
      { name: "Features", description: "Explore all features", href: "#features" },
      { name: "AI Capabilities", description: "Powered by AssureAI", href: "#ai" },
      { name: "Integrations", description: "Connect your tools", href: "#integrations" },
      { name: "Security", description: "Enterprise-grade security", href: "#security" },
    ],
  },
  {
    name: "Integrations",
    href: "/dashboard/integrations",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "Trust",
    items: [
      { name: "Security", description: "Security certifications", href: "#" },
      { name: "Compliance", description: "Compliance frameworks", href: "#" },
      { name: "Privacy", description: "Privacy policy", href: "#" },
    ],
  },
  {
    name: "Resources",
    items: [
      { name: "Documentation", description: "Product documentation", href: "#" },
      { name: "Blog", description: "Latest insights", href: "#" },
      { name: "Webinars", description: "Watch on-demand", href: "#" },
      { name: "Support", description: "Get help", href: "#" },
    ],
  },
];

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E85A2B] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AssureGraph</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.items && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.items ? (
                    <>
                      <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                        {item.name}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border p-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block p-3 rounded-lg hover:bg-gray-50"
                            >
                              <div className="font-medium text-gray-900">{subItem.name}</div>
                              <div className="text-sm text-gray-500">{subItem.description}</div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/welcome">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/welcome">
                <Button className="bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <div className="space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.items ? (
                      <div className="space-y-2">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="pl-4 space-y-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-sm text-gray-600"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className="block font-medium text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 space-y-2">
                  <Link href="/welcome" className="block w-full">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/welcome" className="block w-full">
                    <Button className="w-full bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full">
                <Sparkles className="w-4 h-4 text-[#E85A2B]" />
                <span className="text-sm font-medium text-[#E85A2B]">
                  Now with AssureAI
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-Powered GRC Platform for Modern Enterprises
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Unify governance, risk, and compliance with intelligent automation. 
                AssureGraph helps you stay ahead of regulations with predictive insights 
                and automated workflows.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/welcome">
                  <Button size="lg" className="bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>SOC 2 Compliant</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl border overflow-hidden">
                <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-400">AssureGraph Dashboard</div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">94%</div>
                      <div className="text-xs text-gray-600">Compliance Score</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">12</div>
                      <div className="text-xs text-gray-600">Open Risks</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <div className="text-xs text-gray-600">Pending Tasks</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Framework Coverage</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[87%] bg-[#E85A2B] rounded-full" />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-[#E85A2B] mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">AI Insight</div>
                        <div className="text-xs text-gray-600">
                          3 controls need attention based on recent audit findings
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-400 mt-1">Enterprise Customers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400 mt-1">Compliance Frameworks</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white">99.9%</div>
              <div className="text-sm text-gray-400 mt-1">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white">SOC 2</div>
              <div className="text-sm text-gray-400 mt-1">Type II Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">Solutions</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for GRC
            </h2>
            <p className="text-lg text-gray-600">
              A complete platform that unifies governance, risk, and compliance 
              management with AI-powered intelligence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Governance",
                description: "Streamline policy management, personnel oversight, and exception handling with automated workflows.",
                href: "/dashboard/governance",
              },
              {
                icon: BarChart3,
                title: "Risk Management",
                description: "Identify, assess, and mitigate risks with predictive analytics and real-time monitoring.",
                href: "/dashboard/risk-management",
              },
              {
                icon: CheckCircle2,
                title: "Compliance",
                description: "Maintain continuous compliance across 50+ frameworks with automated evidence collection.",
                href: "/dashboard/compliance",
              },
              {
                icon: FileText,
                title: "Audit Management",
                description: "Simplify audit workflows with AI-assisted findings and automated report generation.",
                href: "/dashboard/audits",
              },
              {
                icon: Lock,
                title: "Controls",
                description: "Design, test, and monitor controls with intelligent mapping to frameworks and requirements.",
                href: "/dashboard/controls",
              },
              {
                icon: Users,
                title: "Vendor Management",
                description: "Assess and monitor third-party risks with automated vendor questionnaires and scoring.",
                href: "/dashboard/vendors",
              },
            ].map((solution) => (
              <Link
                key={solution.title}
                href={solution.href}
                className="group p-6 bg-white rounded-xl border hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#E85A2B] transition-colors">
                  <solution.icon className="w-6 h-6 text-[#E85A2B] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
                <div className="mt-4 flex items-center text-[#E85A2B] font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="ai" className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">
                <Sparkles className="w-3 h-3 mr-1" />
                AssureAI
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Intelligence That Works for You
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our AI engine analyzes your GRC data to provide predictive insights, 
                automate routine tasks, and help you make informed decisions faster.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Predictive Risk Detection",
                    description: "Identify emerging risks before they impact your business",
                  },
                  {
                    title: "Automated Evidence Mapping",
                    description: "AI maps evidence to controls across multiple frameworks",
                  },
                  {
                    title: "Smart Task Prioritization",
                    description: "Focus on what matters most with AI-ranked priorities",
                  },
                  {
                    title: "Natural Language Queries",
                    description: "Ask questions about your compliance posture in plain English",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{feature.title}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl border p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="w-10 h-10 bg-[#E85A2B] rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">AssureAI Assistant</div>
                    <div className="text-sm text-gray-500">Always learning from your data</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">
                      "Show me controls that are failing across multiple frameworks"
                    </div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#E85A2B] mt-0.5" />
                      <div className="text-sm text-gray-700">
                        Found 3 controls with cross-framework failures:
                        <ul className="mt-2 space-y-1 ml-4 list-disc">
                          <li>Access Review (SOC 2, ISO 27001)</li>
                          <li>Encryption at Rest (PCI DSS, HIPAA)</li>
                          <li>Incident Response (All frameworks)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">
                      "What's my compliance forecast for Q2?"
                    </div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#E85A2B] mt-0.5" />
                      <div className="text-sm text-gray-700">
                        Based on current trends, your compliance score is projected 
                        to reach 96% by end of Q2, up from 94% today.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">Integrations</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Connect Your Entire Stack
            </h2>
            <p className="text-lg text-gray-600">
              Integrate with 100+ tools to automatically collect evidence, 
              sync tasks, and maintain continuous compliance.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {[
              { icon: Globe, name: "AWS" },
              { icon: Lock, name: "Azure" },
              { icon: Cpu, name: "GCP" },
              { icon: Zap, name: "Slack" },
              { icon: Users, name: "Okta" },
              { icon: FileText, name: "Jira" },
            ].map((integration) => (
              <div key={integration.name} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                  <integration.icon className="w-8 h-8 text-gray-600" />
                </div>
                <span className="text-sm text-gray-600">{integration.name}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/dashboard/integrations">
              <Button variant="outline" className="gap-2">
                View All Integrations
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">Pricing</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your organization's needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$499",
                period: "/month",
                description: "For small teams getting started with GRC",
                features: [
                  "Up to 50 users",
                  "5 frameworks",
                  "Basic integrations",
                  "Email support",
                ],
                cta: "Start Free Trial",
                variant: "outline" as const,
              },
              {
                name: "Professional",
                price: "$1,499",
                period: "/month",
                description: "For growing organizations",
                features: [
                  "Up to 200 users",
                  "20 frameworks",
                  "Advanced integrations",
                  "Priority support",
                  "AssureAI features",
                ],
                cta: "Start Free Trial",
                variant: "default" as const,
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large organizations",
                features: [
                  "Unlimited users",
                  "All frameworks",
                  "Custom integrations",
                  "Dedicated support",
                  "Advanced AI features",
                  "On-premise option",
                ],
                cta: "Contact Sales",
                variant: "outline" as const,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-6 rounded-xl border ${
                  plan.popular ? "border-[#E85A2B] ring-2 ring-[#E85A2B] ring-opacity-20" : ""
                } bg-white`}
              >
                {plan.popular && (
                  <Badge className="mb-4 bg-[#E85A2B] text-white">Most Popular</Badge>
                )}
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-6 ${
                    plan.popular
                      ? "bg-[#E85A2B] hover:bg-[#d14d20] text-white"
                      : ""
                  }`}
                  variant={plan.variant}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "AssureGraph reduced our audit preparation time by 70%. The AI features are game-changing.",
                author: "Sarah Chen",
                role: "CISO, TechCorp",
              },
              {
                quote: "Finally, a GRC platform that understands modern compliance needs. Highly recommended.",
                author: "Michael Rodriguez",
                role: "Compliance Director, FinanceHub",
              },
              {
                quote: "The predictive risk analytics helped us prevent a major security incident.",
                author: "Emily Watson",
                role: "Risk Manager, DataSafe",
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your GRC Program?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Join 500+ enterprises using AssureGraph to simplify compliance 
            and reduce risk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/welcome">
              <Button size="lg" className="bg-[#E85A2B] hover:bg-[#d14d20] text-white">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
              <BookOpen className="w-4 h-4 mr-2" />
              Read Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#E85A2B] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AssureGraph</span>
              </Link>
              <p className="text-sm text-gray-600">
                AI-powered GRC platform for modern enterprises.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                <li><Link href="#ai" className="text-gray-600 hover:text-gray-900">AssureAI</Link></li>
                <li><Link href="#integrations" className="text-gray-600 hover:text-gray-900">Integrations</Link></li>
                <li><Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Documentation</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Webinars</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
            © 2024 AssureGraph. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
