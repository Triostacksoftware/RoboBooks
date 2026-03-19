"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

const highlights = [
  ["Fast access", "Jump back into invoicing and finance workflows quickly."],
  ["Secure auth", "Protected login flow with role-based access support."],
  ["One workspace", "Manage books, GST, reports, and operations together."],
];

export default function SignIn() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state === "signin") {
      handleGoogleCallback(code);
    }
  }, []);

  const handleGoogleCallback = async (code) => {
    setLoading(true);
    setErr("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/callback`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          redirectUri: `${window.location.origin}/signin`,
          type: "signin",
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (typeof window !== "undefined" && window.showToast) {
          window.showToast("Google sign-in successful! Welcome to Robo Books.", "success");
        }
        window.history.replaceState({}, document.title, window.location.pathname);
        router.push("/dashboard");
      } else {
        setErr("Google sign-in failed. Please try again.");
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      setErr(error.message || "Google sign-in failed. Please try again.");
      window.history.replaceState({}, document.title, window.location.pathname);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setErr("");
    setLoading(true);

    try {
      const success = await login(emailOrPhone, password);

      if (success) {
        if (typeof window !== "undefined" && window.showToast) {
          window.showToast("Login successful! Welcome to Robo Books.", "success");
        }
        router.push("/dashboard");
      } else {
        setErr("Invalid email/phone or password. Please try again.");
      }
    } catch (error) {
      if (error.message.includes("Invalid email/phone or password")) {
        setErr("Invalid email/phone or password. Please try again.");
      } else if (error.message.includes("Account is deactivated")) {
        setErr("Your account has been deactivated. Please contact support.");
      } else if (error.message.includes("pending approval")) {
        setErr("Your account is pending approval. Please wait for admin approval.");
      } else if (error.message.includes("rejected")) {
        setErr("Your registration has been rejected. Please contact support.");
      } else {
        setErr(error.message || "Login failed. Please try again.");
      }
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
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
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
                  Branded sign in
                </div>

                <h2 className="mt-4 max-w-md text-[2rem] font-bold leading-tight sm:text-[2.35rem]">
                  Sign back in with the same polished RoboBooks experience
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-200">
                  A cleaner sign-in surface, stronger brand styling, and the same fast access to your accounting workspace.
                </p>

                <div className="mt-5 grid gap-3">
                  {highlights.map(([title, copy]) => (
                    <div key={title} className="rounded-[22px] border border-white/10 bg-white/10 p-4 backdrop-blur">
                      <p className="text-base font-semibold">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{copy}</p>
                    </div>
                  ))}
                </div>

              </div>
            </aside>

            <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fcff_100%)] px-6 py-7 sm:px-7 lg:px-9 lg:py-8">
              <div className="flex items-center gap-3">
                <Image src="/images/logo.png" alt="Robo Books" width={42} height={42} className="h-10 w-auto object-contain" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">RoboBooks</p>
                  <p className="text-sm text-slate-500">Welcome back to your finance workspace</p>
                </div>
              </div>

              <div className="mt-5 rounded-[28px] border border-[#d9eef5] bg-white p-5 shadow-[0_24px_60px_rgba(15,35,68,0.08)] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[2rem] font-bold tracking-tight text-[#0f2344]">Sign in</h3>
                    <p className="mt-1.5 text-[15px] leading-7 text-slate-600">
                      Access invoices, GST workflows, reports, and your full RoboBooks dashboard.
                    </p>
                  </div>
                  <span className="hidden rounded-2xl bg-[#eaf9fc] p-3 text-[#0aa6c9] sm:inline-flex">
                    <ShieldCheck size={24} />
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#1d3354]">Email or mobile</span>
                    <input
                      required
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="Email or mobile"
                      className="w-full rounded-2xl border border-[#d7e7f0] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#0aa6c9] focus:ring-4 focus:ring-[#0aa6c9]/15"
                      disabled={loading}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#1d3354]">Password</span>
                    <div className="relative">
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full rounded-2xl border border-[#d7e7f0] bg-white px-4 py-3.5 pr-12 text-slate-900 outline-none transition focus:border-[#0aa6c9] focus:ring-4 focus:ring-[#0aa6c9]/15"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500"
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </label>

                  {err && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                      <p className="text-sm font-medium text-red-600">{err}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0aa6c9] via-[#0088c5] to-[#0f6ead] px-5 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,136,197,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>{loading ? "Signing in..." : "Sign in"}</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="rounded-2xl border border-[#d7ebff] bg-[#f4f9ff] px-4 py-3">
                    <p className="text-sm font-semibold text-[#0f4d63]">Test credentials</p>
                    <p className="mt-1 text-sm text-[#35627d]">Email: test@example.com</p>
                    <p className="text-sm text-[#35627d]">Password: password123</p>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-[#e6f0f5] pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-slate-500">Need a new workspace?</p>
                    <p className="text-slate-600">
                      Don&apos;t have an account?{" "}
                      <Link href="/register" className="font-semibold text-[#007fb4] hover:underline">
                        Sign up
                      </Link>
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
