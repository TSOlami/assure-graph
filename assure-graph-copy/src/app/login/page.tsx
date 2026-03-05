"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/global/Logo";
import { Loader } from "@/components/global/Loader";

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmailStep = step === "email";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEmailStep) {
      if (!email.trim() || isLoading) return;
      setStep("otp");
      return;
    }

    if (!otp.trim() || isLoading) return;

    setIsLoading(true);

    // Simulate verification, then navigate to dashboard after 3 seconds
    window.setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      <section className="relative hidden bg-white p-4 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <Image
            src="/images/login.png"
            alt="AssureGraph login visual"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 0vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="flex w-full items-center justify-center bg-white px-6 py-10">
        <div className="relative w-full max-w-sm">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-[1px]">
              <Loader />
            </div>
          )}

          <div className="space-y-10">
            <header className="space-y-6">
              <Logo />

              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-neutral-900">
                  Welcome!
                </h1>
                <p className="max-w-xs text-base font-normal leading-relaxed text-neutral-500">
                  {isEmailStep
                    ? "Get started with ControlGraph AI and take control of your GRC processes. Sign in with your registered email."
                    : "Enter the OTP code sent to your registered email to sign in."}
                </p>
              </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label
                  htmlFor={isEmailStep ? "email" : "otp"}
                  className="block text-sm font-normal text-neutral-600"
                >
                  {isEmailStep ? "Email" : "One-time password"}
                </label>

                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm focus-within:border-brand-5 focus-within:ring-1 focus-within:ring-brand-5">
                  {isEmailStep ? (
                    <i
                      className="lni lni-envelope text-base text-neutral-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <i
                      className="lni lni-lock-alt text-base text-neutral-400"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="h-5 w-px bg-neutral-200"
                    aria-hidden="true"
                  />
                  {isEmailStep ? (
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Work email"
                      className="w-full border-none bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-0"
                    />
                  ) : (
                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      required
                      value={otp}
                      onChange={(event) => setOtp(event.target.value)}
                      placeholder="OTP code"
                      className="w-full border-none bg-transparent text-sm tracking-[0.3em] text-neutral-900 placeholder:tracking-normal placeholder:text-neutral-400 focus:outline-none focus:ring-0"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-brand-5 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-5 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isEmailStep ? "Get OTP" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

