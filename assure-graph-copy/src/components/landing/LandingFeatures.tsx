"use client";

import Link from "next/link";
import { features } from "process";

const FEATURES: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.75 2C5.50736 2 4.5 3.00736 4.5 4.25V6.25H3.25C2.83579 6.25 2.5 6.58579 2.5 7C2.5 7.41421 2.83579 7.75 3.25 7.75H4.5V11.25H3.25C2.83579 11.25 2.5 11.5858 2.5 12C2.5 12.4142 2.83579 12.75 3.25 12.75H4.5V16.25H3.25C2.83579 16.25 2.5 16.5858 2.5 17C2.5 17.4142 2.83579 17.75 3.25 17.75H4.5V19.75C4.5 20.9926 5.50736 22 6.75 22H17.25C18.4926 22 19.5 20.9926 19.5 19.75V4.25C19.5 3.00736 18.4926 2 17.25 2H6.75ZM6 17.75V19.75C6 20.1642 6.33579 20.5 6.75 20.5H17.25C17.6642 20.5 18 20.1642 18 19.75V4.25C18 3.83579 17.6642 3.5 17.25 3.5H6.75C6.33579 3.5 6 3.83579 6 4.25V6.25H7.25C7.66421 6.25 8 6.58579 8 7C8 7.41421 7.66421 7.75 7.25 7.75H6V11.25H7.25C7.66421 11.25 8 11.5858 8 12C8 12.4142 7.66421 12.75 7.25 12.75H6V16.25H7.25C7.66421 16.25 8 16.5858 8 17C8 17.4142 7.66421 17.75 7.25 17.75H6Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "AI Evidence Provenance Engine",
    description:
      "Full traceability from evidence → controls → requirements. AI maps evidence based on control descriptions with explainable confidence scores.",
    href: "/evidence",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
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
    title: "Integration AI Mapping",
    description:
      "AI automatically maps your controls to all major compliance frameworks, including SOC 2, ISO 27001, HIPAA, GDPR, & more.",
    href: "/integrations",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 25"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          opacity="0.4"
          d="M9.01822 3.89964C9.37694 3.69254 9.49985 3.23384 9.29274 2.87513C9.08563 2.51641 8.62694 2.3935 8.26822 2.60061C4.14079 4.98358 2.72663 10.2613 5.1096 14.3887C6.46665 16.7392 8.76248 18.2098 11.25 18.6002V21.0004H7.25003C6.83582 21.0004 6.50003 21.3362 6.50003 21.7504C6.50003 22.1646 6.83582 22.5004 7.25003 22.5004H16.75C17.1642 22.5004 17.5 22.1646 17.5 21.7504C17.5 21.3362 17.1642 21.0004 16.75 21.0004H12.75V18.7035C14.1623 18.6774 15.5879 18.3036 16.8977 17.5473C17.2564 17.3402 17.3794 16.8815 17.1722 16.5228C16.9651 16.1641 16.5064 16.0412 16.1477 16.2483C12.7377 18.2171 8.3774 17.0487 6.40864 13.6387C4.43988 10.2287 5.60823 5.8684 9.01822 3.89964Z"
          fill="currentColor"
        />
        <path
          d="M17.4154 7.28476C15.8747 4.61619 12.4624 3.70186 9.79379 5.24257C7.12522 6.78327 6.2109 10.1956 7.7516 12.8641C9.2923 15.5327 12.7046 16.447 15.3732 14.9063C18.0417 13.3656 18.9561 9.95333 17.4154 7.28476Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Auto-Global Compliance Mapout",
    description:
      "Continuously monitor controls across your infrastructure. Receive alerts for out-of-compliance controls & take action in real-time.",
    href: "/dashboard",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 25 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.0234 7.625C9.60719 7.625 7.64844 9.58375 7.64844 12C7.64844 14.4162 9.60719 16.375 12.0234 16.375C14.4397 16.375 16.3984 14.4162 16.3984 12C16.3984 9.58375 14.4397 7.625 12.0234 7.625ZM9.14844 12C9.14844 10.4122 10.4356 9.125 12.0234 9.125C13.6113 9.125 14.8984 10.4122 14.8984 12C14.8984 13.5878 13.6113 14.875 12.0234 14.875C10.4356 14.875 9.14844 13.5878 9.14844 12Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.0234 4.5C7.71145 4.5 3.99772 7.05632 2.30101 10.7351C1.93091 11.5375 1.93091 12.4627 2.30101 13.2652C3.99772 16.9439 7.71145 19.5002 12.0234 19.5002C16.3353 19.5002 20.049 16.9439 21.7458 13.2652C22.1159 12.4627 22.1159 11.5375 21.7458 10.7351C20.049 7.05633 16.3353 4.5 12.0234 4.5ZM3.66311 11.3633C5.12472 8.19429 8.32017 6 12.0234 6C15.7266 6 18.922 8.19429 20.3836 11.3633C20.5699 11.7671 20.5699 12.2331 20.3836 12.6369C18.922 15.59 15.7266 18.0002 12.0234 18.0002C8.32017 18.0002 5.12472 15.8059 3.66311 12.6369C3.47688 12.2331 3.47688 11.7671 3.66311 11.3633Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Noise-Reduced Monitoring",
    description:
      "Hone in on critical alerts, not noise. Our AI engine prioritizes what matters most and presents actionable insights.",
    href: "/monitoring",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 25 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.1864 3.75C15.9591 2.74801 15.063 2 13.9922 2H10.0547C8.98389 2 8.08781 2.74801 7.86044 3.75H6.77344C5.5308 3.75 4.52344 4.75736 4.52344 6V19.75C4.52344 20.9926 5.5308 22 6.77344 22H17.2734C18.5161 22 19.5234 20.9926 19.5234 19.75L19.5234 6C19.5234 4.75736 18.5161 3.75 17.2734 3.75H16.1864ZM9.30469 4.25C9.30469 3.83579 9.64047 3.5 10.0547 3.5H13.9922C14.4064 3.5 14.7422 3.83578 14.7422 4.25L14.7422 4.71875C14.7422 5.13296 14.4064 5.46875 13.9922 5.46875H10.0547C9.64047 5.46875 9.30469 5.13296 9.30469 4.71875V4.25ZM7.86777 5.25H6.77344C6.35922 5.25 6.02344 5.58579 6.02344 6V19.75C6.02344 20.1642 6.35922 20.5 6.77344 20.5H17.2734C17.6877 20.5 18.0234 20.1642 18.0234 19.75L18.0234 6C18.0234 5.58579 17.6876 5.25 17.2734 5.25H16.1791C15.9404 6.23626 15.0518 6.96875 13.9922 6.96875H10.0547C8.99506 6.96875 8.10651 6.23626 7.86777 5.25Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Auditor-Ready Reports",
    description:
      "Export all your evidence and controls in a clean, auditor-ready package. Say goodbye to manual evidence collection.",
    href: "/audit/reports",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(0 0 0)"
      >
        <path
          d="M3.5 5.25C3.5 4.83579 3.16421 4.5 2.75 4.5C2.33579 4.5 2 4.83579 2 5.25V17.25C2 18.4926 3.00736 19.5 4.25 19.5H21.25C21.6642 19.5 22 19.1642 22 18.75C22 18.3358 21.6642 18 21.25 18H4.25C3.83579 18 3.5 17.6642 3.5 17.25V5.25Z"
          fill="#343C54"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7 10.2773C5.89543 10.2773 5 11.1728 5 12.2773V15.7501C5 16.1643 5.33579 16.5001 5.75 16.5001H8.25C8.66421 16.5001 9 16.1643 9 15.7501V12.2773C9 11.1728 8.10457 10.2773 7 10.2773ZM6.5 12.2773C6.5 12.0012 6.72386 11.7773 7 11.7773C7.27614 11.7773 7.5 12.0012 7.5 12.2773V15.0001H6.5V12.2773Z"
          fill="#343C54"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.5 6.5C10.5 5.39543 11.3954 4.5 12.5 4.5C13.6046 4.5 14.5 5.39543 14.5 6.5V15.7501C14.5 16.1643 14.1642 16.5001 13.75 16.5001H11.25C10.8358 16.5001 10.5 16.1643 10.5 15.7501V6.5ZM12.5 6C12.2239 6 12 6.22386 12 6.5V15.0001H13V6.5C13 6.22386 12.7761 6 12.5 6Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 8.05859C16.8954 8.05859 16 8.95402 16 10.0586V15.7501C16 16.1643 16.3358 16.5001 16.75 16.5001H19.25C19.6642 16.5001 20 16.1643 20 15.7501V10.0586C20 8.95402 19.1046 8.05859 18 8.05859ZM17.5 10.0586C17.5 9.78245 17.7239 9.55859 18 9.55859C18.2761 9.55859 18.5 9.78245 18.5 10.0586V15.0001H17.5V10.0586Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "AI Generated Dashboards",
    description:
      "Generate custom dashboards and reports with our AI engine. Get insights into your compliance posture instantly.",
    href: "/dashboard",
  },
];

export function LandingFeatures() {
  return (
    <section
      id="features"
      className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12"
      style={{ backgroundColor: "#1A1F36" }}
    >
      <div className="mx-auto max-w-[1152px]">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Our Features
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:mt-4 sm:text-base">
            Intelligent, AI-powered features that connect policies, data,
            controls, and evidence automatically.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group flex flex-col rounded-xl border backdrop-blur-3xl border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 sm:p-6"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg text-brand-5 bg-brand-5/20">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-white sm:text-base">
                {feature.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-white/70 leading-relaxed">
                {feature.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-5 transition-colors group-hover:text-brand-2">
                Explore
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 25 25"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(0 0 0)"
                >
                  <path
                    d="M21.0791 12.519C21.0744 12.7044 21.0013 12.8884 20.8599 13.0299L14.8639 19.0301C14.5711 19.3231 14.0962 19.3233 13.8032 19.0305C13.5103 18.7377 13.5101 18.2629 13.8029 17.9699L18.5233 13.2461L4.32813 13.2461C3.91391 13.2461 3.57813 12.9103 3.57812 12.4961C3.57812 12.0819 3.91391 11.7461 4.32812 11.7461L18.5158 11.7461L13.8029 7.03016C13.5101 6.73718 13.5102 6.2623 13.8032 5.9695C14.0962 5.6767 14.5711 5.67685 14.8639 5.96984L20.813 11.9228C20.976 12.0603 21.0795 12.2661 21.0795 12.4961C21.0795 12.5038 21.0794 12.5114 21.0791 12.519Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
