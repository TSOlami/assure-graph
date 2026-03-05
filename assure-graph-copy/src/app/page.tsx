import type { Metadata } from "next";
import {
  LandingHeader,
  LandingHero,
  LandingBenefits,
  LandingSolutions,
  LandingFeatures,
  LandingIntegrations,
  LandingContact,
  LandingFooter,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "AssureGraph | AI-Powered Compliance & GRC Platform",
  description:
    "Stop the audit scramble. AI-powered compliance that makes auditors happy. Connect once, prove everywhere.",
};

export default function RootPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <LandingHeader />
      <LandingHero />
      <LandingBenefits />
      <LandingSolutions />
      <LandingFeatures />
      <LandingIntegrations />
      <LandingContact />
      <LandingFooter />
    </main>
  );
}

