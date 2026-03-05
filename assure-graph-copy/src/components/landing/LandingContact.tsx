"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTA_BULLETS = [
  "Free 14-day trial",
  "Access to all features",
  "Set up a demo with our experts",
  "Onboard in 30 minutes",
  "24/7 customer support",
];

export function LandingContact() {
  return (
    <section
      id="contact"
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-[1152px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-[#212B36] sm:text-2xl md:text-3xl">
                Contact sales
              </h2>
              <p className="mt-4 text-[#637381]">
                Fill out the form below to connect with a member of our team to
                discuss your compliance needs.
              </p>
            </div>
            <div className="space-y-4">
              <a
                href="tel:1-800-456-7890"
                className="flex min-h-[44px] items-center gap-4 rounded-lg text-[#637381] transition-colors hover:text-[#212B36]"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-0-5">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(0 0 0)"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.26534 3.25728C5.54121 1.98143 7.69866 2.37266 8.4453 4.01527L10.0666 7.58207C10.4662 8.46115 10.3393 9.47941 9.7603 10.2298C9.57069 10.4755 9.33228 10.6266 9.14342 10.7234L6.34328 12.1589C7.02276 13.246 7.83521 14.2739 8.78072 15.2194C9.72626 16.1649 10.7541 16.9774 11.8412 17.6569L13.2768 14.8567C13.3736 14.6679 13.5247 14.4295 13.7704 14.2399C14.5208 13.6608 15.539 13.534 16.4181 13.9336L19.9849 15.5549C21.6275 16.3015 22.0187 18.459 20.7429 19.7348L19.6747 20.803C19.1484 21.3293 18.3886 21.603 17.6192 21.4643C13.993 20.8106 10.5219 19.0819 7.72006 16.28C4.91826 13.4782 3.18949 10.0071 2.53579 6.38098C2.39708 5.61151 2.6708 4.85172 3.19715 4.32541C3.19715 4.32541 3.19715 4.32541 3.19715 4.32541M4.26534 3.25728C4.26533 3.25729 4.26534 3.25728 4.26534 3.25728V3.25728ZM13.148 18.3959C14.656 19.1633 16.2534 19.694 17.8853 19.9881C18.1347 20.0331 18.4082 19.9481 18.614 19.7424L19.6822 18.6742C20.2175 18.1389 20.0534 17.2337 19.3642 16.9204L15.7974 15.2991C15.4288 15.1316 15.0014 15.1846 14.6867 15.4274C14.6868 15.4274 14.6869 15.4273 14.6867 15.4274C14.6855 15.4284 14.6781 15.4349 14.6657 15.4513C14.6513 15.4704 14.6332 15.499 14.6116 15.5411L13.148 18.3959ZM5.60427 10.8522L8.4591 9.38858C8.50118 9.367 8.52978 9.34884 8.54888 9.33445C8.56744 9.32046 8.57309 9.31298 8.57276 9.31341C8.81555 8.99879 8.86856 8.57137 8.70102 8.20278L7.07975 4.63597C6.76648 3.94679 5.86129 3.78265 5.32598 4.31796L4.25778 5.3861C4.05198 5.59188 3.96702 5.86538 4.01199 6.11487C4.30617 7.74671 4.83685 9.34411 5.60427 10.8522Z"
                      fill="#E85A2B"
                    />
                    <path
                      d="M3.19715 4.32541L4.26534 3.25728L3.19715 4.32541Z"
                      fill="#E85A2B"
                    />
                  </svg>
                </div>
                <span className="font-medium text-[#212B36]">
                  Call us: 1-800-456-7890
                </span>
              </a>
              <a
                href="mailto:info@assuregraph.com"
                className="flex min-h-[44px] items-center gap-4 rounded-lg text-[#637381] transition-colors hover:text-[#212B36]"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-0-5">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(0 0 0)"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22 6.25649V17.25C22 18.4926 20.9926 19.5 19.75 19.5H4.25C3.00736 19.5 2 18.4926 2 17.25V6.23398C2 6.22372 2.00021 6.2135 2.00061 6.20334C2.01781 5.25972 2.78812 4.5 3.73592 4.5H20.2644C21.2229 4.5 22 5.27697 22.0001 6.23549C22.0001 6.24249 22.0001 6.24949 22 6.25649ZM3.5 8.187V17.25C3.5 17.6642 3.83579 18 4.25 18H19.75C20.1642 18 20.5 17.6642 20.5 17.25V8.18747L13.2873 13.2171C12.5141 13.7563 11.4866 13.7563 10.7134 13.2171L3.5 8.187ZM20.5 6.2286L20.5 6.23398V6.24336C20.4976 6.31753 20.4604 6.38643 20.3992 6.42905L12.4293 11.9867C12.1716 12.1664 11.8291 12.1664 11.5713 11.9867L3.60116 6.42885C3.538 6.38481 3.50035 6.31268 3.50032 6.23568C3.50028 6.10553 3.60577 6 3.73592 6H20.2644C20.3922 6 20.4963 6.10171 20.5 6.2286Z"
                      fill="#E85A2B"
                    />
                  </svg>
                </div>
                <span className="font-medium text-[#212B36]">
                  Email us: info@assuregraph.com
                </span>
              </a>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ backgroundColor: "#1A1F36" }}
          >
            <h3 className="text-lg font-semibold text-white sm:text-xl md:text-2xl">
              Be audit-ready in weeks, not weekends
            </h3>
            <ul className="mt-6 space-y-4">
              {CTA_BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-3 text-white/90"
                >
                  <span className="flex size-6 shrink-0 items-center text-white justify-center rounded-full bg-brand-5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 25"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0 0 0)"
                    >
                      <path
                        d="M2 12.3906C2 6.86778 6.47715 2.39062 12 2.39062C17.5228 2.39062 22 6.86778 22 12.3906C22 17.9135 17.5228 22.3906 12 22.3906C6.47715 22.3906 2 17.9135 2 12.3906ZM15.5071 9.85447C15.2142 9.56158 14.7393 9.56158 14.4464 9.85447L10.9649 13.336L9.55359 11.9247C9.2607 11.6318 8.78582 11.6318 8.49293 11.9247C8.20004 12.2176 8.20004 12.6925 8.49294 12.9854L10.4346 14.927C10.7275 15.2199 11.2023 15.2199 11.4952 14.927L15.5071 10.9151C15.8 10.6222 15.8 10.1474 15.5071 9.85447Z"
                        fill="currentcolor"
                      />
                    </svg>
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="mt-6 h-11 w-full rounded-md px-6 text-base font-medium text-white bg-brand-5 hover:bg-brand-6 sm:mt-8 sm:w-auto"
            >
              <Link href="/get-started">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
