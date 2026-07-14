'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/stat-card';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Plus,
  CreditCard,
  BellRing,
  UserPlus,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  dashboardStats,
  monthlyRevenue,
  invoiceStatusData,
  recentActivity,
  upcomingReminders,
  recentPayments,
  formatCurrency,
  formatDate,
} from '@/lib/data';

const activityIcons: Record<string, React.ElementType> = {
  payment: CreditCard,
  reminder: BellRing,
  invoice: FileText,
  client: UserPlus,
};

const activityColors: Record<string, string> = {
  payment: 'bg-success/10 text-success',
  reminder: 'bg-primary/10 text-primary',
  invoice: 'bg-warning/10 text-warning',
  client: 'bg-violet-500/10 text-violet-500',
};

export default function DashboardPage() {
  const chartData = monthlyRevenue.slice(-6).map((d) => ({
    month: d.month,
    revenue: d.revenue,
    collected: d.collected,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back, Jordan. Here's your billing overview."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        }
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Total Revenue" value={formatCurrency(dashboardStats.totalRevenue)} change="14.2%" trend="up" icon={DollarSign} />
        <StatCard title="Outstanding" value={formatCurrency(dashboardStats.outstandingAmount)} change="8.1%" trend="down" icon={FileText} iconClassName="bg-warning/10 text-warning" />
        <StatCard title="Overdue" value={formatCurrency(dashboardStats.overdueAmount)} change="3.2%" trend="down" icon={AlertCircle} iconClassName="bg-destructive/10 text-destructive" />
        <StatCard title="Invoices Sent" value={String(dashboardStats.invoicesSent)} change="12%" trend="up" icon={TrendingUp} iconClassName="bg-primary/10 text-primary" />
        <StatCard title="Invoices Paid" value={String(dashboardStats.invoicesPaid)} change="9%" trend="up" icon={CheckCircle2} iconClassName="bg-success/10 text-success" />
        <StatCard title="Payment Rate" value={`${dashboardStats.paymentRate}%`} change="5%" trend="up" icon={CheckCircle2} iconClassName="bg-success/10 text-success" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Revenue Overview</p>
                <p className="text-xs text-muted-foreground">Billed vs collected revenue</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Billed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-success" /> Collected
                </span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="billedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="collectedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid hsl(var(--border))',
                      background: 'hsl(var(--card))',
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#billedGrad)" />
                  <Area type="monotone" dataKey="collected" stroke="hsl(var(--success))" strokeWidth={2} fill="url(#collectedGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-6 shadow-soft">
            <p className="text-sm font-medium">Invoice Status</p>
            <p className="text-xs text-muted-foreground">Distribution by status</p>
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={invoiceStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {invoiceStatusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid hsl(var(--border))',
                      background: 'hsl(var(--card))',
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {invoiceStatusData.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    {s.name}
                  </span>
                  <span className="font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Activity + Reminders + Payments */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Activity timeline */}
        <Card className="p-6 shadow-soft">
          <p className="text-sm font-medium">Latest Activity</p>
          <div className="mt-4 space-y-4">
            {recentActivity.map((activity, i) => {
              const Icon = activityIcons[activity.type] ?? FileText;
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className="relative flex flex-col items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activityColors[activity.type] ?? 'bg-muted'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {i < recentActivity.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-sm font-medium leading-tight">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground/70">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming reminders */}
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Upcoming Reminders</p>
            <BellRing className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-3">
            {upcomingReminders.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{r.clientCompany}</p>
                  <p className="text-xs text-muted-foreground">{r.type} · {formatCurrency(r.amount)}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-medium ${r.daysLeft < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {r.daysLeft < 0 ? `${Math.abs(r.daysLeft)}d overdue` : `${r.daysLeft}d left`}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(r.dueDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent payments */}
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Recent Payments</p>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-3">
            {recentPayments.map((p) => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/10 text-success">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{p.clientCompany}</p>
                    <p className="text-xs text-muted-foreground">{p.invoiceNumber} · {formatDate(p.date)}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-success">{formatCurrency(p.amount)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
