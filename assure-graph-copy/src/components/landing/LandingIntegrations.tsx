"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INTEGRATIONS } from "@/data/integrations";

const LANDING_INTEGRATIONS = [
  "salesforce",
  "jira",
  "aws",
  "slack",
  "azure",
  "github",
].map((id) => INTEGRATIONS.find((i) => i.id === id)).filter(Boolean);

export function LandingIntegrations() {
  return (
    <section id="integrations" className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-[1152px]">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="text-2xl font-semibold text-[#212B36] sm:text-3xl md:text-4xl">
            Integrations
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#637381] sm:mt-4 sm:text-base">
            We match your existing tech stack and allow you to unify all your
            data and achieve a single source of truth.
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
          {LANDING_INTEGRATIONS.map((integration) =>
            integration ? (
              <div
                key={integration.id}
                className="flex h-16 w-16 shrink-0 snap-center flex-col items-center justify-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:h-20 sm:w-20 sm:gap-2 sm:p-4"
              >
                <Image
                  src={integration.logoUrl}
                  alt={integration.name}
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                />
                <span className="text-[10px] font-medium text-[#637381] sm:text-xs">
                  {integration.name}
                </span>
              </div>
            ) : null
          )}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 w-full min-w-[200px] border-brand-5 bg-white text-brand-5 hover:bg-brand-0-5 hover:text-brand-6 sm:w-auto"
          >
            <Link href="/integrations">See all integrations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
