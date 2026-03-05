"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, ArrowRight, BookOpen } from "lucide-react";

const plans = [
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
    popular: false,
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
    popular: false,
  },
];

const testimonials = [
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
];

export function LandingContact() {
  return (
    <>
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">Pricing</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your organization&apos;s needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
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

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-orange-100 text-[#E85A2B] hover:bg-orange-100">Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&quot;{testimonial.quote}&quot;</p>
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
            <Link href="/login">
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
    </>
  );
}
