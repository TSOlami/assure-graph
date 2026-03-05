import * as React from "react";

import { OnboardingStepCard } from "@/components/onboarding/OnboardingStepCard";

export interface AcknowledgementStepProps {
  onFinish: () => void;
  onBack: () => void;
}

const ITEMS: { id: string; text: string }[] = [
  {
    id: "tos",
    text: "By clicking the checkbox, you acknowledge that you’ve read and agree to abide by the Terms of Service, which outline your responsibilities and acceptable use of this platform.",
  },
  {
    id: "privacy",
    text: "By clicking the checkbox, you confirm that you understand how your personal information is collected, used, and protected. We process your data in line with our Privacy Policy.",
  },
  {
    id: "nda",
    text: "To protect confidential company and client information, you must review and agree to our Non Disclosure Agreement (NDA). This agreement ensures that sensitive information remains private and secure.",
  },
];

export function AcknowledgementStep({
  onFinish,
  onBack,
}: AcknowledgementStepProps) {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({
    tos: false,
    privacy: false,
    nda: false,
  });

  const allChecked = React.useMemo(
    () => ITEMS.every((item) => checked[item.id]),
    [checked],
  );

  return (
    <OnboardingStepCard
      icon={
        <i
          className="lni lni-file text-xl text-[#8B8D98]"
          aria-hidden="true"
        />
      }
      title="Acknowledgement"
      description="Agree to our Terms of service and Privacy Policy."
      showBack
      isLastStep
      onBack={onBack}
      onNext={onFinish}
      nextLabel="Finish"
    >
      <div className="space-y-4">
        <div className="rounded-lg bg-[#EDF6FF] px-4 py-3 text-sm text-[#003393]">
          <div className="mb-1.5 flex items-center gap-2 text-sm font-medium">
            <i className="lni lni-shield text-base" aria-hidden="true" />
            <span>Audit-Aware Acknowledgement</span>
          </div>
          <p className="text-xs text-[#0078E0]">
            All agreements are mapped to controls and audit-logged for
            compliance purposes.
          </p>
        </div>

        <div className="space-y-3">
          {ITEMS.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50"
            >
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-neutral-300 focus:ring-brand-5"
                style={{ accentColor: "var(--brand-5)" }}
                checked={checked[item.id]}
                onChange={(event) =>
                  setChecked((prev) => ({
                    ...prev,
                    [item.id]: event.target.checked,
                  }))
                }
              />
              <span className="leading-relaxed">
                {item.id === "tos" && (
                  <>
                    By clicking the checkbox, you acknowledge that you’ve read
                    and agree to abide by the{" "}
                    <button
                      type="button"
                      className="font-medium text-brand-5 underline underline-offset-2"
                    >
                      Terms of Service
                    </button>
                    , which outline your responsibilities and acceptable use of
                    this platform.
                  </>
                )}
                {item.id === "privacy" && (
                  <>
                    By clicking the checkbox, you confirm that you understand
                    how your personal information is collected, used, and
                    protected. We process your data in line with our{" "}
                    <button
                      type="button"
                      className="font-medium text-brand-5 underline underline-offset-2"
                    >
                      Privacy Policy
                    </button>
                    .
                  </>
                )}
                {item.id === "nda" && (
                  <>
                    To protect confidential company and client information, you
                    must review and agree to our{" "}
                    <button
                      type="button"
                      className="font-medium text-brand-5 underline underline-offset-2"
                    >
                      Non Disclosure Agreement (NDA)
                    </button>
                    . This agreement ensures that sensitive information remains
                    private and secure.
                  </>
                )}
              </span>
            </label>
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-700">
          <i className="lni lni-lock text-base" aria-hidden="true" />
          <p className="leading-relaxed">
            This acknowledgement will be recorded in the audit log with
            timestamp.
          </p>
        </div>

        <p className="text-sm text-neutral-500">
          You must agree to all statements above before finishing onboarding.
        </p>
      </div>
    </OnboardingStepCard>
  );
}

