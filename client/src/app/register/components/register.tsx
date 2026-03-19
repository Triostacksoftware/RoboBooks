"use client";

import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { ALL_PHONE_OPTIONS, flagEmoji, shortLabel } from "../../../lib/phone-codes";

type FormData = {
  companyName: string;
  email: string;
  phoneDialCode: string;
  phoneIso2: string;
  phoneNumber: string;
  password: string;
  passwordVisible: boolean;
  country: string;
  state: string;
  agree: boolean;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "We moved invoicing, GST prep, and reconciliation into one workflow, so month-end is faster and far less manual.",
    author: "CA Sanjeev Archak",
    role: "Practice Partner | Integrabooks",
    avatar: "/images/testimonial1.jpg",
  },
  {
    quote:
      "Our accounts team closes books quicker, tracks receivables better, and gets cleaner visibility into business cash flow.",
    author: "Shruti Mehta",
    role: "CFO | Diginest",
    avatar: "/images/testimonial2.jpg",
  },
  {
    quote:
      "From billing to reports, the setup feels purpose-built for finance operations instead of another generic business tool.",
    author: "Ankit Yadav",
    role: "Founder | Pixeldesk",
    avatar: "/images/testimonial3.jpg",
  },
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
];

export default function Register() {
  const router = useRouter();
  const defaultIN = useMemo(
    () => ALL_PHONE_OPTIONS.find((option) => option.iso2 === "IN" && option.dial === "+91"),
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [form, setForm] = useState<FormData>({
    companyName: "",
    email: "",
    phoneDialCode: defaultIN?.dial ?? "+91",
    phoneIso2: defaultIN?.iso2 ?? "IN",
    phoneNumber: "",
    password: "",
    passwordVisible: false,
    country: "India",
    state: "Uttar Pradesh",
    agree: false,
  });

  useEffect(() => {
    const handleGoogleCallback = async (code: string) => {
      setLoading(true);
      setError("");
      try {
        const response = await api<{ success: boolean; message?: string }>(
          "/api/auth/google/callback",
          {
            method: "POST",
            json: {
              code,
              redirectUri: `${window.location.origin}/register`,
              type: "register",
            },
          }
        );

        if (response.success) {
          if (typeof window !== "undefined" && (window as any).showToast) {
            (window as any).showToast("Google registration successful! Welcome to Robo Books.", "success");
          }
          window.history.replaceState({}, document.title, window.location.pathname);
          setTimeout(() => router.push("/dashboard"), 500);
        } else {
          setError(response.message || "Google registration failed. Please try again.");
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Google registration failed. Please try again.");
        window.history.replaceState({}, document.title, window.location.pathname);
      } finally {
        setLoading(false);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    if (code && state === "register") {
      handleGoogleCallback(code);
    }
  }, [router]);

  useEffect(() => {
    if (paused) {
      return;
    }
    timerRef.current = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [paused]);

  const onChange =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value as never }));
    };

  const onPhoneCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [dial, iso2] = e.target.value.split("|");
    setForm((prev) => ({ ...prev, phoneDialCode: dial, phoneIso2: iso2 }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.companyName.trim()) return setError("Please enter your company name.");
    if (!/^\S+@\S+\.\S+?$/.test(form.email)) return setError("Please enter a valid email address.");
    if (!form.phoneNumber.trim()) return setError("Please enter your mobile number.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (!form.agree) return setError("You must agree to the Terms of Service and Privacy Policy.");
    if (loading) return;

    try {
      setLoading(true);
      const response = await api<{ success: boolean; message?: string }>("/api/auth/register", {
        method: "POST",
        json: {
          companyName: form.companyName.trim(),
          email: form.email.trim(),
          phoneNumber: form.phoneNumber.trim(),
          phoneDialCode: form.phoneDialCode,
          phoneIso2: form.phoneIso2,
          password: form.password,
          country: form.country,
          state: form.state,
        },
      });

      if (response.success) {
        if (typeof window !== "undefined" && (window as any).showToast) {
          (window as any).showToast(
            "Registration submitted successfully! Please wait for admin approval.",
            "success"
          );
        }
        alert("Registration submitted successfully! Your account will be activated after admin approval. You will be able to login once approved.");
        router.push("/signin");
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(0,166,201,0.14), transparent 28%), radial-gradient(circle at 82% 10%, rgba(23,129,191,0.12), transparent 25%), radial-gradient(circle at 90% 82%, rgba(10,166,201,0.1), transparent 26%)",
        }}
      />

      <section className="relative mx-auto max-w-[1700px] px-4 pb-10 pt-8 md:px-8 lg:px-10 lg:pb-14 lg:pt-10">
        <section className="overflow-hidden rounded-[36px] border border-[#d9eef5] bg-white shadow-[0_40px_120px_rgba(15,35,68,0.14)]">
          <div className="h-1.5 bg-gradient-to-r from-[#0aa6c9] via-[#1781bf] to-[#20c5af]" />
          <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
            <aside className="relative overflow-hidden bg-[#0f2344] px-6 py-7 text-white sm:px-7 lg:px-9 lg:py-8">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 18% 18%, rgba(10,166,201,0.24), transparent 32%), radial-gradient(circle at 82% 14%, rgba(255,255,255,0.1), transparent 22%), linear-gradient(180deg, rgba(15,35,68,0.9) 0%, rgba(16,43,84,0.96) 58%, rgba(8,33,66,1) 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 opacity-25">
                <svg viewBox="0 0 800 800" className="h-full w-full" preserveAspectRatio="none">
                  <path d="M-10,210 C220,380 470,140 820,300" fill="none" stroke="#0aa6c9" strokeWidth="3" />
                  <path d="M-20,470 C260,620 510,350 850,540" fill="none" stroke="#1781bf" strokeWidth="3" />
                </svg>
              </div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm text-cyan-100 backdrop-blur">
                  <Sparkles size={16} />
                  Built for accounting teams
                </div>
                <h2 className="mt-4 max-w-md text-[2rem] font-bold leading-tight sm:text-[2.35rem]">
                  Accounting SaaS for invoicing, GST workflows, and real-time finance control
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-200">
                  RoboBooks helps businesses and accountants manage receivables, reconciliation, compliance, and reporting from one organized workspace.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["GST ready", "Compliance-first workflows"],
                    ["Invoices", "Billing and collections control"],
                    ["Reports", "Cash flow and close visibility"],
                  ].map(([value, label]) => (
                    <div key={value} className="rounded-[22px] border border-white/10 bg-white/10 p-3 backdrop-blur">
                      <p className="text-[1.2rem] font-bold leading-none">{value}</p>
                      <p className="mt-2 text-[13px] leading-5 text-slate-300">{label}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-5 rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">Customer voice</p>
                  <p className="mt-4 text-base leading-7 text-white/95">{testimonials[active].quote}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Image
                      src={testimonials[active].avatar}
                      alt={testimonials[active].author}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full border-2 border-cyan-300/70 object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold">{testimonials[active].author}</p>
                      <p className="text-sm text-slate-300">{testimonials[active].role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-white" : "w-2 bg-white/50"}`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </aside>

            <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fcff_100%)] px-6 py-7 sm:px-7 lg:px-9 lg:py-8">
              <div className="flex items-center gap-3">
                <Image src="/images/logo.png" alt="Robo Books logo" width={42} height={42} className="h-10 w-auto object-contain" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">RoboBooks</p>
                  <p className="text-sm text-slate-500">Smart finance setup for modern teams</p>
                </div>
              </div>

              <div className="mt-5 rounded-[28px] border border-[#d9eef5] bg-white p-5 shadow-[0_24px_60px_rgba(15,35,68,0.08)] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[2rem] font-bold tracking-tight text-[#0f2344]">Create your account</h3>
                    <p className="mt-1.5 text-[15px] leading-7 text-slate-600">
                      Start your 14-day free trial with a cleaner and more branded onboarding experience.
                    </p>
                  </div>
                  <span className="hidden rounded-2xl bg-[#eaf9fc] p-3 text-[#0aa6c9] sm:inline-flex">
                    <ShieldCheck size={24} />
                  </span>
                </div>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#1d3354]">Company name</span>
                    <input
                      value={form.companyName}
                      onChange={onChange("companyName")}
                      placeholder="e.g. Robo Innovations Pvt Ltd"
                      className="w-full rounded-2xl border border-[#d7e7f0] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#0aa6c9] focus:ring-4 focus:ring-[#0aa6c9]/15"
                      disabled={loading}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#1d3354]">Email address</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      placeholder="you@company.com"
                      className="w-full rounded-2xl border border-[#d7e7f0] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#0aa6c9] focus:ring-4 focus:ring-[#0aa6c9]/15"
                      disabled={loading}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#1d3354]">Mobile number</span>
                    <div className="rounded-2xl border border-[#d7e7f0] bg-white transition focus-within:border-[#0aa6c9] focus-within:ring-4 focus-within:ring-[#0aa6c9]/15">
                      <div className="flex items-stretch">
                        <div className="relative">
                          <select
                            aria-label="Country code"
                            value={`${form.phoneDialCode}|${form.phoneIso2}`}
                            onChange={onPhoneCountryChange}
                            className="min-w-[120px] appearance-none rounded-l-2xl border-0 bg-transparent px-3 py-3.5 pr-8 text-slate-900 outline-none sm:min-w-[155px]"
                            disabled={loading}
                          >
                            <optgroup label="Popular">
                              {["IN|+91", "US|+1", "GB|+44", "AU|+61", "AE|+971"].map((item) => {
                                const [iso2, dial] = item.split("|");
                                return (
                                  <option key={item} value={`${dial}|${iso2}`}>
                                    {shortLabel(iso2, dial)}
                                  </option>
                                );
                              })}
                            </optgroup>
                            <optgroup label="All countries (A-Z)">
                              {ALL_PHONE_OPTIONS.map((option) => (
                                <option key={`${option.iso2}-${option.dial}`} value={`${option.dial}|${option.iso2}`}>
                                  {shortLabel(option.iso2, option.dial)}
                                </option>
                              ))}
                            </optgroup>
                          </select>
                          <span className="pointer-events-none absolute right-0 top-1/2 h-7 w-px -translate-y-1/2 bg-[#d7e7f0]" />
                        </div>
                        <input
                          value={form.phoneNumber}
                          onChange={onChange("phoneNumber")}
                          placeholder="98765 43210"
                          className="flex-1 rounded-r-2xl border-0 bg-transparent px-4 py-3.5 text-slate-900 outline-none"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-xs font-medium text-slate-500">
                      {flagEmoji(form.phoneIso2)} {form.phoneIso2} | {form.phoneDialCode}
                    </p>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#1d3354]">Password</span>
                    <div className="relative">
                      <input
                        type={form.passwordVisible ? "text" : "password"}
                        value={form.password}
                        onChange={onChange("password")}
                        placeholder="At least 6 characters"
                        className="w-full rounded-2xl border border-[#d7e7f0] bg-white px-4 py-3.5 pr-12 text-slate-900 outline-none transition focus:border-[#0aa6c9] focus:ring-4 focus:ring-[#0aa6c9]/15"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500"
                        onClick={() => setForm((prev) => ({ ...prev, passwordVisible: !prev.passwordVisible }))}
                      >
                        {form.passwordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-[#1d3354]">Country</span>
                      <select
                        value={form.country}
                        onChange={onChange("country")}
                        className="w-full rounded-2xl border border-[#d7e7f0] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#0aa6c9] focus:ring-4 focus:ring-[#0aa6c9]/15"
                        disabled={loading}
                      >
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                        <option>United Arab Emirates</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-[#1d3354]">State</span>
                      <select
                        value={form.state}
                        onChange={onChange("state")}
                        className="w-full rounded-2xl border border-[#d7e7f0] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#0aa6c9] focus:ring-4 focus:ring-[#0aa6c9]/15"
                        disabled={loading}
                      >
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                      <p className="text-sm font-medium text-red-600">{error}</p>
                    </div>
                  )}

                  <label className="flex items-start gap-3 rounded-2xl border border-[#d9eef5] bg-[#f8fdff] px-4 py-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={onChange("agree")}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0aa6c9] focus:ring-[#0aa6c9]"
                      disabled={loading}
                    />
                    <span>
                      I agree to the <Link href="/legal/terms" className="font-semibold text-[#007fb4] hover:underline">Terms of Service</Link> and{" "}
                      <Link href="/legal/privacy" className="font-semibold text-[#007fb4] hover:underline">Privacy Policy</Link>.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0aa6c9] via-[#0088c5] to-[#0f6ead] px-5 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,136,197,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>{loading ? "Creating your account..." : "Create my account"}</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="flex flex-col gap-3 border-t border-[#e6f0f5] pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-slate-500">No credit card required</p>
                    <p className="text-slate-600">
                      Already have an account?{" "}
                      <Link href="/signin" className="font-semibold text-[#007fb4] hover:underline">Sign in</Link>
                    </p>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
