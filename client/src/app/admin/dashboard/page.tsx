/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatCurrency } from "@/utils/currency";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BanknotesIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  FolderIcon,
  UserGroupIcon,
  UsersIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalHours: 0,
  });
  const [loading, setLoading] = useState(true);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [approvalStats, setApprovalStats] = useState({
    pendingApprovals: 0,
    approvedUsers: 0,
    rejectedUsers: 0,
  });
  const [approvalLoading, setApprovalLoading] = useState(false);

  interface ActivityItem {
    id: number;
    action: string;
    user: string;
    time: string;
    type: string;
    icon: ComponentType<{ className?: string }>;
    color: string;
  }

  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    document.title = "RoboBooks-admin";

    fetchStats();
    fetchRecentActivity();
    fetchPendingUsers();
    fetchApprovalStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = (await api("/api/admin/dashboard/stats")) as {
        success: boolean;
        stats: Record<string, number>;
      };

      if (response.success) {
        setStats({
          totalUsers: response.stats.totalUsers ?? 0,
          activeUsers: response.stats.activeUsers ?? 0,
          totalRevenue: response.stats.totalRevenue ?? 0,
          monthlyGrowth: response.stats.monthlyGrowth ?? 0,
          totalProjects: response.stats.totalProjects ?? 0,
          activeProjects: response.stats.activeProjects ?? 0,
          totalHours: response.stats.totalHours ?? 0,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const response = (await api("/api/admin/user-approval/pending-users")) as {
        success: boolean;
        pendingUsers: any[];
      };

      if (response.success) {
        setPendingUsers(response.pendingUsers || []);
      }
    } catch (error) {
      console.error("Error fetching pending users:", error);
    }
  };

  const fetchApprovalStats = async () => {
    try {
      const response = (await api("/api/admin/user-approval/approval-stats")) as {
        success: boolean;
        stats: {
          pendingApprovals: number;
          approvedUsers: number;
          rejectedUsers: number;
        };
      };

      if (response.success) {
        setApprovalStats(response.stats);
      }
    } catch (error) {
      console.error("Error fetching approval stats:", error);
    }
  };

  const handleApproveUser = async (pendingUserId: string) => {
    setApprovalLoading(true);
    try {
      const response = (await api(
        `/api/admin/user-approval/approve-user/${pendingUserId}`,
        {
          method: "POST",
          json: {},
        }
      )) as { success: boolean; message?: string };

      if (response.success) {
        await Promise.all([fetchPendingUsers(), fetchApprovalStats(), fetchStats()]);
        alert("User approved successfully!");
      } else {
        alert("Failed to approve user: " + response.message);
      }
    } catch (error) {
      console.error("Error approving user:", error);
      alert("Error approving user. Please try again.");
    } finally {
      setApprovalLoading(false);
    }
  };

  const handleRejectUser = async (pendingUserId: string) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (!reason?.trim()) {
      alert("Rejection reason is required");
      return;
    }

    setApprovalLoading(true);
    try {
      const response = (await api(
        `/api/admin/user-approval/reject-user/${pendingUserId}`,
        {
          method: "POST",
          json: { rejectionReason: reason },
        }
      )) as { success: boolean; message?: string };

      if (response.success) {
        await Promise.all([fetchPendingUsers(), fetchApprovalStats(), fetchStats()]);
        alert("User rejected successfully!");
      } else {
        alert("Failed to reject user: " + response.message);
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
      alert("Error rejecting user. Please try again.");
    } finally {
      setApprovalLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    const mockActivity: ActivityItem[] = [
      {
        id: 1,
        action: "New user registered",
        user: "TechCorp Inc",
        time: "2 minutes ago",
        type: "user",
        icon: UsersIcon,
        color: "text-sky-500",
      },
      {
        id: 2,
        action: "Invoice generated",
        user: "StartupXYZ",
        time: "15 minutes ago",
        type: "invoice",
        icon: DocumentTextIcon,
        color: "text-emerald-500",
      },
      {
        id: 3,
        action: "Payment received",
        user: "Enterprise Ltd",
        time: "1 hour ago",
        type: "payment",
        icon: BanknotesIcon,
        color: "text-indigo-500",
      },
      {
        id: 4,
        action: "Project created",
        user: "Digital Solutions",
        time: "2 hours ago",
        type: "project",
        icon: FolderIcon,
        color: "text-amber-500",
      },
      {
        id: 5,
        action: "Timesheet submitted",
        user: "Innovation Hub",
        time: "3 hours ago",
        type: "timesheet",
        icon: ClockIcon,
        color: "text-cyan-600",
      },
    ];

    setRecentActivity(mockActivity);
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    change,
    changeType,
    color,
    subtitle,
    href,
  }: {
    title: string;
    value: string | number;
    icon: ComponentType<{ className?: string }>;
    change?: string;
    changeType?: "increase" | "decrease";
    color: string;
    subtitle?: string;
    href?: string;
  }) => (
    <Link
      href={href ?? "#"}
      aria-label={href ? `Open ${title}` : title}
      className={`block rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)] transition ${
        href
          ? "cursor-pointer hover:-translate-y-0.5 hover:border-[#0aa6c9]/30 hover:bg-[#f4fbff]"
          : "cursor-default"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0aa6c9]">
            {title}
          </p>
          <p className="mt-3 text-3xl font-bold text-[#0f2344]">
            {typeof value === "number" && value >= 1000000
              ? `${formatCurrency(value / 1000000)}M`
              : typeof value === "number" && value >= 1000
              ? `${(value / 1000).toFixed(1)}k`
              : typeof value === "number" && title.toLowerCase().includes("revenue")
              ? formatCurrency(value)
              : value}
          </p>
          {subtitle ? (
            <p className="mt-2 text-sm text-[#5d708f]">{subtitle}</p>
          ) : null}
          {change ? (
            <div className="mt-3 flex items-center">
              {changeType === "increase" ? (
                <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-rose-500" />
              )}
              <span
                className={`ml-1 text-sm font-medium ${
                  changeType === "increase" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {change}%
              </span>
              <span className="ml-1 text-sm text-[#5d708f]">from last month</span>
            </div>
          ) : null}
        </div>
        <div className={`rounded-[22px] p-4 shadow-[0_18px_35px_rgba(15,35,68,0.12)] ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Link>
  );

  const Panel = ({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) => (
    <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
      <h3 className="mb-4 text-xl font-bold text-[#0f2344]">{title}</h3>
      {children}
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#0aa6c9] border-t-transparent" />
          <p className="text-[#5d708f]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-[#d8e7f1] bg-[linear-gradient(135deg,#0f2344_0%,#143160_58%,#0aa6c9_100%)] px-7 py-8 text-white shadow-[0_22px_50px_rgba(15,35,68,0.16)]">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#7fe7ff]">
          Control Center
        </p>
        <h1 className="mt-3 text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/80">
          Welcome to your admin dashboard. Monitor approvals, platform activity,
          and business health in one RoboBooks-styled workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={UsersIcon}
          change="12.5"
          changeType="increase"
          color="bg-[linear-gradient(135deg,#0aa6c9_0%,#0088c5_100%)]"
          subtitle="Registered accounts"
          href="/admin/users"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={UserGroupIcon}
          change="8.2"
          changeType="increase"
          color="bg-[linear-gradient(135deg,#22c55e_0%,#16a34a_100%)]"
          subtitle="Currently active"
          href="/admin/users?status=active"
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={CurrencyDollarIcon}
          change="15.3"
          changeType="increase"
          color="bg-[linear-gradient(135deg,#0f2344_0%,#1d4f91_100%)]"
          subtitle="From paid invoices"
          href="/admin/billing?tab=invoices"
        />
        <StatCard
          title="Monthly Growth"
          value={`${stats.monthlyGrowth}%`}
          icon={ChartBarIcon}
          change="-2.1"
          changeType="decrease"
          color="bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_100%)]"
          subtitle="User growth rate"
          href="/admin/reports"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div id="pending-approvals">
        <Panel title="Pending User Approvals">
          <div className="mb-4 flex items-center justify-end">
            <span className="rounded-full bg-[#fff6d8] px-3 py-1 text-xs font-semibold text-[#b7791f]">
              {pendingUsers.length} pending
            </span>
          </div>

          {pendingUsers.length === 0 ? (
            <div className="py-8 text-center">
              <CheckCircleIcon className="mx-auto mb-2 h-12 w-12 text-emerald-400" />
              <p className="text-[#5d708f]">No pending approvals</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user: any) => (
                <div
                  key={user._id}
                  className="rounded-[22px] border border-[#d8e7f1] bg-[#fbfdff] p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-[#0f2344]">
                        {user.companyName}
                      </h4>
                      <p className="text-sm text-[#5d708f]">{user.email}</p>
                      <p className="text-sm text-[#5d708f]">{user.phone}</p>
                    </div>
                    <p className="text-xs text-[#8fa4bf]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveUser(user._id)}
                      disabled={approvalLoading}
                      className="flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#10b981_0%,#059669_100%)] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(5,150,105,0.22)] transition hover:brightness-105 disabled:opacity-50"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectUser(user._id)}
                      disabled={approvalLoading}
                      className="flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#ef4444_0%,#dc2626_100%)] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(220,38,38,0.18)] transition hover:brightness-105 disabled:opacity-50"
                    >
                      <XCircleIcon className="h-4 w-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
        </div>

        <div id="approval-statistics">
        <Panel title="User Approval Statistics">
          <div className="grid grid-cols-3 gap-4">
            <Link
              href="/admin/dashboard#pending-approvals"
              className="rounded-[22px] px-4 py-5 text-center transition hover:bg-[#f4fbff]"
            >
              <div className="text-3xl font-bold text-[#d49b11]">
                {approvalStats.pendingApprovals}
              </div>
              <div className="text-sm text-[#5d708f]">Pending</div>
            </Link>
            <Link
              href="/admin/users?status=active"
              className="rounded-[22px] px-4 py-5 text-center transition hover:bg-[#f4fbff]"
            >
              <div className="text-3xl font-bold text-emerald-600">
                {approvalStats.approvedUsers}
              </div>
              <div className="text-sm text-[#5d708f]">Approved</div>
            </Link>
            <Link
              href="/admin/users?status=inactive"
              className="rounded-[22px] px-4 py-5 text-center transition hover:bg-[#f4fbff]"
            >
              <div className="text-3xl font-bold text-rose-600">
                {approvalStats.rejectedUsers}
              </div>
              <div className="text-sm text-[#5d708f]">Rejected</div>
            </Link>
          </div>
        </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={FolderIcon}
          color="bg-[linear-gradient(135deg,#6366f1_0%,#4f46e5_100%)]"
          subtitle="Created projects"
          href="/admin/reports"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={CalendarIcon}
          color="bg-[linear-gradient(135deg,#14b8a6_0%,#0f766e_100%)]"
          subtitle="Currently running"
          href="/admin/reports"
        />
        <StatCard
          title="Total Hours"
          value={stats.totalHours}
          icon={ClockIcon}
          color="bg-[linear-gradient(135deg,#ec4899_0%,#db2777_100%)]"
          subtitle="Logged time"
          href="/admin/reports"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Revenue Overview">
          <div className="flex h-64 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#eff8ff_0%,#f8fbff_100%)]">
            <div className="text-center">
              <ChartBarIcon className="mx-auto mb-2 h-12 w-12 text-[#8fa4bf]" />
              <p className="text-[#4d5f7c]">Chart placeholder</p>
              <p className="text-sm text-[#8fa4bf]">
                Revenue analytics will be displayed here
              </p>
            </div>
          </div>
        </Panel>

        <Panel title="User Activity">
          <div className="flex h-64 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#eff8ff_0%,#f8fbff_100%)]">
            <div className="text-center">
              <UsersIcon className="mx-auto mb-2 h-12 w-12 text-[#8fa4bf]" />
              <p className="text-[#4d5f7c]">Chart placeholder</p>
              <p className="text-sm text-[#8fa4bf]">
                User activity analytics will be displayed here
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Recent Activity">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${activity.color}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0f2344]">
                    {activity.action}
                  </p>
                  <p className="text-sm text-[#5d708f]">
                    {activity.user} • {activity.time}
                  </p>
                </div>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Quick Actions">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                name: "View Users",
                icon: UsersIcon,
                href: "/admin/users",
                color: "bg-[linear-gradient(135deg,#0aa6c9_0%,#0088c5_100%)]",
                description: "Manage user accounts",
              },
              {
                name: "Generate Report",
                icon: DocumentTextIcon,
                href: "/admin/reports",
                color: "bg-[linear-gradient(135deg,#22c55e_0%,#16a34a_100%)]",
                description: "Create system reports",
              },
              {
                name: "Manage Billing",
                icon: BanknotesIcon,
                href: "/admin/billing",
                color: "bg-[linear-gradient(135deg,#0f2344_0%,#1d4f91_100%)]",
                description: "Handle subscriptions",
              },
            ].map((action) => (
              <a
                key={action.name}
                href={action.href}
                className="group flex items-center rounded-[22px] border border-[#d8e7f1] bg-[#fbfdff] p-3 transition hover:-translate-y-0.5 hover:border-[#0aa6c9]/30 hover:bg-[#f4fbff]"
              >
                <div
                  className={`mr-3 rounded-2xl p-2.5 transition-transform group-hover:scale-110 ${action.color}`}
                >
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-[#0f2344]">
                    {action.name}
                  </span>
                  <span className="text-xs text-[#5d708f]">
                    {action.description}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Panel>

        <Panel title="System Health">
          <div className="space-y-4">
            {[
              { name: "Server Status", status: "Online", color: "text-emerald-600" },
              { name: "Database", status: "Connected", color: "text-emerald-600" },
              { name: "API Response", status: "Normal", color: "text-emerald-600" },
              { name: "Storage", status: "85% Used", color: "text-amber-600" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm text-[#4d5f7c]">{item.name}</span>
                <span className={`text-sm font-semibold ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
