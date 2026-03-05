import * as React from "react";

import { OnboardingStepCard } from "@/components/onboarding/OnboardingStepCard";

export interface CompanyContactStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function CompanyContactStep({
  onNext,
  onBack,
}: CompanyContactStepProps) {
  return (
    <OnboardingStepCard
      icon={
        <i
          className="lni lni-help text-xl text-brand-5"
          aria-hidden="true"
        />
      }
      title="Company’s contact"
      description="Fill up contact details your company to complete your onboarding."
      showBack
      onBack={onBack}
      onNext={onNext}
    >
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-800">
              Country
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <select
                className="w-full border-none bg-transparent text-base text-neutral-900 focus:outline-none focus:ring-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select country
                </option>
                <option value="ng">Nigeria</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="de">Germany</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-800">
              State / Province
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <select
                className="w-full border-none bg-transparent text-base text-neutral-900 focus:outline-none focus:ring-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select state
                </option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja (FCT)</option>
                <option value="rivers">Rivers</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-800">
              City / Region
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <select
                className="w-full border-none bg-transparent text-base text-neutral-900 focus:outline-none focus:ring-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select city
                </option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="port-harcourt">Port Harcourt</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-800">
              Postal code
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <input
                type="text"
                placeholder="Postal code"
                className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-neutral-800">
            Address
          </label>
          <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
            <input
              type="text"
              placeholder="Apartment No, Street Name"
              className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-800">
                Email
              </label>
              <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
                <input
                  type="email"
                  placeholder="company@email.com"
                  className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-800">
                Phone Number
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2">
                <span className="text-sm text-neutral-600">+234</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-px bg-neutral-200"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-800">
              Website
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <input
                type="url"
                placeholder="https://"
                className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
    </OnboardingStepCard>
  );
}

