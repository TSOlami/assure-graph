import * as React from "react";

import { OnboardingStepCard } from "@/components/onboarding/OnboardingStepCard";

export interface SuperAdminStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function SuperAdminStep({ onNext, onBack }: SuperAdminStepProps) {
  return (
    <OnboardingStepCard
      icon={
        <i
          className="lni lni-user text-xl text-brand-5"
          aria-hidden="true"
        />
      }
      title="Super Admin details"
      description="Complete your super-admin profile."
      showBack
      onBack={onBack}
      onNext={onNext}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-4 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-neutral-400">
            <i className="lni lni-upload text-2xl" aria-hidden="true" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-base font-medium text-neutral-900">
              Profile photo
            </p>
            <p className="text-sm text-neutral-500">
              Upload JPEG or PNG not more than 4MB.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-800">
              Name
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <input
                type="text"
                placeholder="Full name"
                className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-800">
              Email
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <input
                type="email"
                placeholder="admin@email.com"
                className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-800">
              Position
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <select
                className="w-full border-none bg-transparent text-base text-neutral-900 focus:outline-none focus:ring-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select position
                </option>
                <option value="ciso">CISO</option>
                <option value="compliance-manager">Compliance Manager</option>
                <option value="cto">CTO</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-800">
              Role
            </label>
            <div className="rounded-lg border border-neutral-300 bg-white px-3 py-2">
              <select
                className="w-full border-none bg-transparent text-base text-neutral-900 focus:outline-none focus:ring-0"
                defaultValue="super-admin"
              >
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </OnboardingStepCard>
  );
}

