"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const COMPLIANCE_BADGES = [
  {
    text: "AI-Powered Compliance",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 10L13.25 11.75L15 12.5L13.25 13.25L12.5 15L11.75 13.25L10 12.5L11.75 11.75L12.5 10Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "Role-Based Access Control",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          d="M10.5 16C10.5 15.1716 11.1716 14.5 12 14.5C12.8284 14.5 13.5 15.1716 13.5 16V17.5C13.5 18.3284 12.8284 19 12 19C11.1716 19 10.5 18.3284 10.5 17.5V16Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.75 7.25C6.75 4.3505 9.10051 2 12 2C14.8995 2 17.25 4.35051 17.25 7.25V9.125H18.5C19.7426 9.125 20.75 10.1324 20.75 11.375V17.2495C20.75 19.8729 18.6234 21.9995 16 21.9995H8C5.37665 21.9995 3.25 19.8729 3.25 17.2495V11.375C3.25 10.1324 4.25736 9.125 5.5 9.125H6.75V7.25ZM8.25 9.125H15.75V7.25C15.75 5.17893 14.0711 3.5 12 3.5C9.92893 3.5 8.25 5.17893 8.25 7.25V9.125ZM5.5 10.625C5.08579 10.625 4.75 10.9608 4.75 11.375V17.2495C4.75 19.0444 6.20507 20.4995 8 20.4995H16C17.7949 20.4995 19.25 19.0444 19.25 17.2495V11.375C19.25 10.9608 18.9142 10.625 18.5 10.625H5.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    text: "Complete Audit Logs",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.33301 5.5C7.33301 4.25736 8.34037 3.25 9.58301 3.25H11.1663C12.3908 3.25 13.3868 4.22809 13.4157 5.44559C13.6431 5.27137 13.9077 5.13795 14.2016 5.0592L16.4554 4.45529C17.6557 4.13367 18.8894 4.84598 19.2111 6.04628L21.9287 16.1885C22.2503 17.3888 21.538 18.6226 20.3377 18.9442L18.0838 19.5481C16.8835 19.8697 15.6498 19.1574 15.3282 17.9571L13.4163 10.8221V17.25C13.4163 18.4926 12.409 19.5 11.1663 19.5H9.58301C9.00682 19.5 8.48122 19.2834 8.08317 18.9272C7.68512 19.2834 7.15952 19.5 6.58333 19.5H4.25C3.00736 19.5 2 18.4926 2 17.25V7.75C2 6.50736 3.00736 5.5 4.25 5.5H6.58333C6.84619 5.5 7.09852 5.54507 7.33301 5.62791V5.5ZM7.33301 17.25V7.72768C7.3212 7.32379 6.99008 7 6.58333 7H4.25C3.83579 7 3.5 7.33579 3.5 7.75V17.25C3.5 17.6642 3.83579 18 4.25 18H6.58333C6.99108 18 7.32283 17.6746 7.33309 17.2693L7.33301 17.25ZM9.58301 18C9.17526 18 8.84351 17.6746 8.83325 17.2693L8.83333 17.25V7.75C8.83333 7.73708 8.83322 7.72419 8.83301 7.71133V5.5C8.83301 5.08579 9.16879 4.75 9.58301 4.75H11.1663C11.5806 4.75 11.9163 5.08579 11.9163 5.5V17.25C11.9163 17.6642 11.5806 18 11.1663 18H9.58301ZM14.0595 7.42665C13.9522 7.02655 14.1897 6.6153 14.5898 6.50809L16.8436 5.90418C17.2437 5.79697 17.655 6.03441 17.7622 6.43451L20.4798 16.5767C20.587 16.9768 20.3495 17.3881 19.9494 17.4953L17.6956 18.0992C17.2955 18.2064 16.8843 17.969 16.7771 17.5689L14.0595 7.42665Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    text: "SOC 2 Type II",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.1385 2.29633C11.6899 2.06789 12.3094 2.06789 12.8608 2.29633L19.409 5.00923C20.1849 5.33068 20.7473 6.07313 20.7701 6.95597C20.8871 11.5013 19.4296 17.7631 13.067 21.5139C12.4101 21.9012 11.5955 21.9047 10.9353 21.5237C4.43153 17.7707 3.09402 11.4935 3.22752 6.95318C3.2534 6.07287 3.81392 5.33089 4.59034 5.00922L11.1385 2.29633ZM12.2867 3.68211C12.1029 3.60596 11.8964 3.60596 11.7126 3.68211L5.16447 6.395C4.89602 6.50622 4.73423 6.74708 4.72687 6.99727C4.60224 11.2358 5.84237 16.853 11.685 20.2245C11.8771 20.3354 12.1143 20.3343 12.3052 20.2218C18.0304 16.8467 19.3795 11.223 19.2706 6.99458C19.2642 6.74684 19.1038 6.50643 18.8349 6.39501L12.2867 3.68211Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const DASHBOARD_STATS = [
  { value: "78%", label: "Compliance Score", valueColor: "text-white",},
  { value: "156", label: "Enabled Rules", valueColor: "text-green-500" },
  { value: "12", label: "Active Policies", valueColor: "text-amber-500" },
  { value: "80", label: "Passed Rules", valueColor: "text-purple-500" },
];

const DASHBOARD_BADGES = [
  {
    label: "Fresh Evidence",
    color: "bg-emerald-100 text-[#047857] border-2 border-emerald-200",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          d="M15.5071 10.5245C15.8 10.2316 15.8 9.75674 15.5071 9.46384C15.2142 9.17095 14.7393 9.17095 14.4464 9.46384L10.9649 12.9454L9.55359 11.5341C9.2607 11.2412 8.78582 11.2412 8.49293 11.5341C8.20004 11.827 8.20004 12.3019 8.49294 12.5947L10.4346 14.5364C10.7275 14.8293 11.2023 14.8292 11.4952 14.5364L15.5071 10.5245Z"
          fill="#047857"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12Z"
          fill="#047857"
        />
      </svg>
    ),
  },
  {
    label: "Expiring Soon",
    color: "bg-amber-100 text-[#B45309] border-2 border-amber-200",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          d="M9.74902 2.75C9.74902 2.33579 10.0848 2 10.499 2H13.499C13.9132 2 14.249 2.33579 14.249 2.75C14.249 3.16421 13.9132 3.5 13.499 3.5H10.499C10.0848 3.5 9.74902 3.16421 9.74902 2.75Z"
          fill="#B45309"
        />
        <path
          d="M11.2485 13.2507C11.2485 13.6649 11.5843 14.0007 11.9985 14.0007C12.4128 14.0007 12.7485 13.6649 12.7485 13.2507V8.49454C12.7485 8.08033 12.4128 7.74454 11.9985 7.74454C11.5843 7.74454 11.2485 8.08033 11.2485 8.49454V13.2507Z"
          fill="#B45309"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.999 4.50192C7.16707 4.50192 3.25 8.41899 3.25 13.2509C3.25 18.0829 7.16707 22 11.999 22C16.831 22 20.748 18.0829 20.748 13.2509C20.748 11.1048 19.9753 9.13916 18.6929 7.61704L20.0316 6.27838C20.3244 5.98548 20.3244 5.51061 20.0316 5.21772C19.7387 4.92482 19.2638 4.92482 18.9709 5.21772L17.6322 6.55644C16.1102 5.2744 14.1448 4.50192 11.999 4.50192ZM4.75 13.2509C4.75 9.24742 7.99549 6.00192 11.999 6.00192C16.0025 6.00192 19.248 9.24742 19.248 13.2509C19.248 17.2545 16.0025 20.5 11.999 20.5C7.99549 20.5 4.75 17.2545 4.75 13.2509Z"
          fill="#B45309"
        />
      </svg>
    ),
  },
  {
    label: "AI powered",
    color: "bg-brand-5/90 text-white",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="#FFFFFF"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 10L13.25 11.75L15 12.5L13.25 13.25L12.5 15L11.75 13.25L10 12.5L11.75 11.75L12.5 10Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function LandingHero() {
  return (
    <section className="bg-linear-to-t from-[#FFF8F5] to-[#FFFFFF] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1152px]">
        {/* Top bar - compliance badges */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:mb-8 sm:gap-3">
          {COMPLIANCE_BADGES.map((item) => (
            <span
              key={item.text}
              className="inline-flex items-center rounded-full border shadow-xs border-[#F3F4F6] bg-white px-3 py-1 text-xs font-medium text-[#637381] sm:px-4 sm:py-1.5 sm:text-sm"
            >
              <span className="mr-2 text-brand-5">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>

        <div className="space-y-4 text-center sm:space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-[#212B36] sm:text-4xl md:text-5xl lg:text-6xl">
            Stop the audit scramble
          </h1>
          <p className="mx-auto max-w-2xl text-base text-[#637381] sm:text-lg md:text-xl">
            AI-powered compliance that makes audits easy.{" "}
            <span className="text-brand-5">Connect data, prove everywhere</span>
          </p>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              asChild
              className="h-11 w-full min-w-[200px] rounded-md px-6 text-base font-medium text-white bg-linear-to-r from-[#E85A2B] to-[#FF6B3D] hover:from-[#FF6B3D] hover:to-[#E85A2B] sm:w-auto"
            >
              <Link href="/get-started">Request a Demo</Link>
            </Button>
            <Link
              href="#"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md text-base font-normal text-[#637381] transition-colors hover:text-brand-5 sm:w-auto"
            >
              See how it works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Hero card - dashboard */}
        <div className="mt-8 overflow-hidden rounded-xl p-4 sm:mt-12 sm:p-6 md:p-8 bg-linear-to-r from-[#1A1F36] to-[#2D3748]">
          <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="font-logo text-lg font-medium text-white">
                assuregraph
              </span>
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              {DASHBOARD_BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className={`rounded-full px-2.5 py-0.5 flex items-center gap-2 text-[10px] font-medium sm:px-3 sm:py-1 sm:text-xs ${badge.color}`}
                >
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
            {DASHBOARD_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-white/5 flex flex-col items-center justify-center p-3 sm:p-3"
              >
                <p
                  className={`text-xl font-semibold ${stat.valueColor} sm:text-2xl md:text-3xl`}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
