"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import {
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  BellIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  TableCellsIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface Admin {
  fullName?: string;
  role?: string;
  email?: string;
}

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const authCheckRef = useRef(false);
  const redirectAttemptsRef = useRef(0);

  useEffect(() => {
    // Prevent multiple auth checks
    if (authCheckRef.current) return;
    authCheckRef.current = true;

    if (pathname === "/admin/login") {
      setIsAuthenticated(false);
      setAdmin(null);
      setLoading(false);
      return;
    }
    checkAuth();
  }, [pathname]); // Re-check auth when pathname changes

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== "/admin/login") {
      // Only redirect if we haven't tried too many times
      if (redirectAttemptsRef.current < 1) {
        redirectAttemptsRef.current++;
        console.log(
          `🔄 Admin auth failed, redirect attempt ${redirectAttemptsRef.current}/1`
        );
        // Use window.location to avoid router conflicts
        window.location.href = "/admin/login";
      }
    }
  }, [loading, isAuthenticated, pathname]);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await api<{ success: boolean; admin?: Admin }>(
        "/api/admin/profile"
      );

      console.log("response2", response);
      if (response.success) {
        setAdmin(response.admin || null);
        setIsAuthenticated(true);
        redirectAttemptsRef.current = 0; // Reset attempts on success
      } else {
        setIsAuthenticated(false);
        setAdmin(null);
        // Only redirect if not already on login page
        if (pathname !== "/admin/login") {
          if (redirectAttemptsRef.current < 1) {
            redirectAttemptsRef.current++;
            window.location.href = "/admin/login";
          }
        }
      }
    } catch (error) {
      setIsAuthenticated(false);
      setAdmin(null);
      // Only redirect if not already on login page
      if (pathname !== "/admin/login") {
        if (redirectAttemptsRef.current < 1) {
          redirectAttemptsRef.current++;
          window.location.href = "/admin/login";
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api<unknown>("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setAdmin(null);
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: ChartBarIcon },
    { name: "Users", href: "/admin/users", icon: UsersIcon },
    { name: "Reports", href: "/admin/reports", icon: DocumentTextIcon },
    { name: "Billing", href: "/admin/billing", icon: CurrencyDollarIcon },
    {
      name: "CMS",
      href: "/admin/cms",
      icon: TableCellsIcon,
      children: [
        { name: "Logo Section", href: "/admin/cms/logo" },
        { name: "Hero Section", href: "/admin/cms/hero" },
        { name: "About Section", href: "/admin/cms/about" },
        { name: "Invoice Themes", href: "/admin/cms/invoice-themes" },
        { name: "Services Section", href: "/admin/cms/services" },
        { name: "Industries Section", href: "/admin/cms/industries" },
        { name: "GST Compliance", href: "/admin/cms/gst-compliance" },
        { name: "Features Section", href: "/admin/cms/features" },
        { name: "Usability Section", href: "/admin/cms/usability" },
        { name: "Business Impact", href: "/admin/cms/business-impact" },
        { name: "Team Management", href: "/admin/cms/team-management" },
        { name: "FAQ Section", href: "/admin/cms/faq" },
        { name: "Trusted Partner", href: "/admin/cms/trusted-partner" },
        { name: "App CTA Section", href: "/admin/cms/pre-footer-cta" },
        { name: "Contact Section", href: "/admin/cms/contact-section" },
        { name: "Footer Section", href: "/admin/cms/footer" },
        { name: "Pricing Plans", href: "/admin/cms/pricing-plans" },
        { name: "Testimonials", href: "/admin/cms/testimonials" },
      ],
    },
    { name: "Settings", href: "/admin/settings", icon: CogIcon },
  ];

  const isActiveTab = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }
    return pathname.startsWith(href);
  };

  const NavItem = ({ item }: { item: (typeof navigation)[0] }) => {
    const isActive = isActiveTab(item.href);
    const isExpanded = Boolean(
      item.children && (expandedMenus[item.name] || pathname.startsWith(`${item.href}/`))
    );

    const toggleMenu = () => {
      setExpandedMenus((current) => ({
        ...current,
        [item.name]: !current[item.name],
      }));
    };

    return (
      <div className="space-y-1">
        {item.children ? (
          <button
            type="button"
            onClick={toggleMenu}
            className={`group flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition ${
              isActive || isExpanded
                ? "bg-[linear-gradient(135deg,#eff8ff_0%,#eefbff_100%)] text-[#0f2344] shadow-[0_12px_25px_rgba(10,166,201,0.12)] ring-1 ring-[#b7e9f2]"
                : "text-[#4d5f7c] hover:bg-[#f4fbff] hover:text-[#0f2344]"
            }`}
          >
            <span className="flex items-center">
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive || isExpanded
                    ? "text-[#0aa6c9]"
                    : "text-[#8fa4bf] group-hover:text-[#0088c5]"
                }`}
              />
              {item.name}
            </span>
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        ) : (
          <Link
            href={item.href}
            className={`group flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition ${
              isActive || isExpanded
                ? "bg-[linear-gradient(135deg,#eff8ff_0%,#eefbff_100%)] text-[#0f2344] shadow-[0_12px_25px_rgba(10,166,201,0.12)] ring-1 ring-[#b7e9f2]"
                : "text-[#4d5f7c] hover:bg-[#f4fbff] hover:text-[#0f2344]"
            }`}
          >
            <span className="flex items-center">
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive || isExpanded
                    ? "text-[#0aa6c9]"
                    : "text-[#8fa4bf] group-hover:text-[#0088c5]"
                }`}
              />
              {item.name}
            </span>
          </Link>
        )}

        {item.children && isExpanded ? (
          <div className="ml-10 space-y-1 border-l border-[#d8e7f1] pl-4">
            {item.children.map((child) => {
              const isChildActive = pathname.startsWith(child.href);
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`block rounded-xl px-3 py-2.5 text-sm transition ${
                    isChildActive
                      ? "bg-[#ebfaff] font-semibold text-[#0088c5]"
                      : "text-[#5d708f] hover:bg-[#f4fbff] hover:text-[#0f2344]"
                  }`}
                >
                  {child.name}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };

  // If on login page, just render children without sidebar or loading gate
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#0aa6c9] border-t-transparent"></div>
          <p className="text-[#4d5f7c]">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show passive fallback (redirect handled in effect)
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#0aa6c9] border-t-transparent"></div>
          <p className="text-[#4d5f7c]">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show full layout with sidebar
  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-[#f8fbff] text-[#0f2344]">
      <div className="pointer-events-none absolute left-[-10rem] top-[-8rem] h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-8rem] right-[-10rem] h-80 w-80 rounded-full bg-[#0f2344]/8 blur-3xl" />

      {/* Fixed Sidebar - Only visible when authenticated */}
      <div className="fixed inset-y-0 left-0 z-50 flex w-72 min-h-0 flex-col overflow-hidden border-r border-[#d8e7f1] bg-white/95 shadow-[0_20px_50px_rgba(15,35,68,0.08)] backdrop-blur">
        <div className="relative shrink-0 overflow-hidden border-b border-[#d8e7f1]">
          <div
            className="absolute inset-y-0 left-0 hidden w-full bg-gradient-to-r from-[#08c1c9] via-[#04a6c7] to-[#006fae] lg:block"
            style={{ clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)" }}
          />
          <div className="relative flex h-20 items-center px-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">
                <Image
                  src="/images/logo.png"
                  alt="RoboBooks logo"
                  width={42}
                  height={42}
                  className="h-9 w-9 object-contain"
                  priority
                />
              </div>
              <div className="lg:text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f2344]/70 lg:text-white/80">
                  RoboBooks
                </p>
                <h1 className="text-[1.7rem] font-bold leading-none text-[#0f2344] lg:text-white">
                  Admin Panel
                </h1>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1.5 pr-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </nav>
        <div className="shrink-0 border-t border-[#d8e7f1] p-4">
          <div className="rounded-[20px] border border-[#d8e7f1] bg-[#f8fbff]">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen((current) => !current)}
              className="flex w-full items-center justify-between gap-3 p-3 text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f2344] text-white shadow-[0_10px_20px_rgba(15,35,68,0.18)]">
                  <UserCircleIcon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm text-[#0f2344]">{admin?.fullName || "Admin"}</p>
                </div>
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 text-[#5d708f] transition-transform ${
                  isProfileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileMenuOpen ? (
              <div className="border-t border-[#d8e7f1] px-3 py-2">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-x-2 rounded-xl px-3 py-2 text-sm text-[#0f2344] transition hover:bg-white hover:text-[#0088c5]"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-72 flex-1">
        {/* Top Header */}
        <div className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[76px] items-center gap-x-4 rounded-[28px] border border-[#d8e7f1] bg-white/90 px-5 shadow-[0_16px_40px_rgba(15,35,68,0.06)] backdrop-blur sm:px-6">
            <div className="flex flex-1 items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                  RoboBooks Admin
                </p>
                <p className="mt-1 text-sm text-[#4d5f7c]">
                  {pathname.replace("/admin", "").replaceAll("/", " / ") || " / dashboard"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8e7f1] bg-[#f8fbff] text-[#4d5f7c] transition hover:border-[#0aa6c9]/40 hover:text-[#0088c5]">
                <BellIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="relative z-10 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
