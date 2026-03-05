import * as React from "react";

import { OnboardingStepCard } from "@/components/onboarding/OnboardingStepCard";

export interface CompanyDetailsStepProps {
  onNext: () => void;
}

export function CompanyDetailsStep({ onNext }: CompanyDetailsStepProps) {
  return (
    <OnboardingStepCard
      icon={
        <i
          className="lni lni-home text-xl text-brand-5"
          aria-hidden="true"
        />
      }
      title="Company details"
      description="Fill up basic information about your company."
      onNext={onNext}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-4 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-neutral-400">
              <i className="lni lni-upload text-2xl" aria-hidden="true" />
            </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-[#1C2024]">
              Company Logo
            </p>
            <p className="text-sm text-[#60646C]">
              Upload JPEG or PNG not more than 4MB.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1C2024]">
              Company Name
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <input
                type="text"
                placeholder="Company name"
                className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1C2024]">
              Industry Sector
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <select
                className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select sector
                </option>
                <option value="financial">Financial services</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-[#1C2024]">
            Primary Frameworks (Select all that apply)
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "ISO 27001",
              "SOC 2",
              "PCI-DSS",
              "HIPAA",
              "GDPR",
              "Other frameworks",
            ].map((label) => (
              <label
                key={label}
                className="flex cursor-pointer items-start gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-[#1C2024] hover:bg-neutral-50"
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-neutral-300 focus:ring-brand-5"
                  style={{ accentColor: "var(--brand-5)" }}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1C2024]">
              Company Size
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <select
                className="w-full border-none bg-transparent text-base text-neutral-900 focus:outline-none focus:ring-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select size
                </option>
                <option value="1-50">1 – 50 employees</option>
                <option value="51-200">51 – 200 employees</option>
                <option value="201-1000">201 – 1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1C2024]">
              Next Audit Date
            </label>
            <div className="flex items-center justify-between rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <input
                type="text"
                placeholder="MM-DD-YYYY"
                className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
              />
              <i
                className="lni lni-calendar text-neutral-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </OnboardingStepCard>
  );
}

