/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";

import { OnboardingHeader } from "@/components/global/OnboardingHeader";
import {
  OnboardingTimeline,
  type TimelineStep,
} from "@/components/onboarding/OnboardingTimeline";
import { CompanyDetailsStep } from "@/components/onboarding/steps/CompanyDetailsStep";
import { CompanyContactStep } from "@/components/onboarding/steps/CompanyContactStep";
import { SuperAdminStep } from "@/components/onboarding/steps/SuperAdminStep";
import { AcknowledgementStep } from "@/components/onboarding/steps/AcknowledgementStep";
import { Loader } from "@/components/global/Loader";

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: "company-details",
    index: 1,
    title: "Company details",
    description: "Fill up basic information about your company.",
  },
  {
    id: "company-contact",
    index: 2,
    title: "Company’s contact",
    description: "Fill up contact details of your company.",
  },
  {
    id: "super-admin",
    index: 3,
    title: "Super Admin details",
    description: "Complete your super-admin profile.",
  },
  {
    id: "acknowledgement",
    index: 4,
    title: "Acknowledgement",
    description: "Agree to our Terms of service and Privacy Policy.",
  },
];

export default function TaskOnboardingPage() {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const [isFinishing, setIsFinishing] = React.useState(false);

  const isLoadingState = isFinishing;

  const handleNext = () => {
    setActiveStepIndex((current) =>
      current < TIMELINE_STEPS.length - 1 ? current + 1 : current,
    );
  };

  const handleBack = () => {
    setActiveStepIndex((current) => (current > 0 ? current - 1 : current));
  };

  const handleFinish = () => {
    setIsFinishing(true);
  };

  const renderStepContent = () => {
    if (isLoadingState) {
      return (
        <section className="flex w-full max-w-[900px] min-h-[520px] flex-col items-center justify-center rounded-2xl bg-white p-16 text-center shadow-[0_8px_40px_-10px_rgba(0,0,0,0.08)]">
          <Loader label="Finishing up, please wait..." />
        </section>
      );
    }

    switch (TIMELINE_STEPS[activeStepIndex]?.id) {
      case "company-details":
        return <CompanyDetailsStep onNext={handleNext} />;
      case "company-contact":
        return (
          <CompanyContactStep onNext={handleNext} onBack={handleBack} />
        );
      case "super-admin":
        return <SuperAdminStep onNext={handleNext} onBack={handleBack} />;
      case "acknowledgement":
        return (
          <AcknowledgementStep onFinish={handleFinish} onBack={handleBack} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <OnboardingHeader />

      <main className="mt-16 flex justify-center px-10 pb-12">
        <div className="flex w-full max-w-[1200px] flex-col gap-12 lg:flex-row lg:items-start">
          <div className="w-full max-w-md shrink-0">
            <OnboardingTimeline
              steps={TIMELINE_STEPS}
              activeStepIndex={activeStepIndex}
            />
          </div>

          <div className="flex w-full justify-center">
            {renderStepContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

