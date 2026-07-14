'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, Percent, Clock, ArrowUpRight } from 'lucide-react';
import { monthlyRevenue, analyticsData, formatCurrency } from '@/lib/data';

export default function AnalyticsPage() {
  const chartData = monthlyRevenue.map((d) => ({
    month: d.month,
    revenue: d.revenue,
    collected: d.collected,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Deep insights into your billing performance and cash flow."
      />

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Collection Rate" value={`${analyticsData.collectionRate}%`} change="6%" trend="up" icon={Percent} iconClassName="bg-success/10 text-success" />
        <StatCard title="Late Payment Rate" value={`${analyticsData.latePaymentRate}%`} change="2%" trend="down" icon={TrendingUp} iconClassName="bg-destructive/10 text-destructive" />
        <StatCard title="Avg. Days to Pay" value={`${analyticsData.averageDaysToPay}d`} change="3d" trend="up" icon={Clock} iconClassName="bg-primary/10 text-primary" />
        <StatCard title="Monthly Growth" value={`+${analyticsData.monthlyGrowth}%`} change="14.2%" trend="up" icon={ArrowUpRight} iconClassName="bg-success/10 text-success" />
      </div>

      {/* Revenue chart */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Monthly Revenue</p>
              <p className="text-xs text-muted-foreground">Billed vs collected over the year</p>
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
                  <linearGradient id="billedGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="collectedGrad2" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#billedGrad2)" />
                <Area type="monotone" dataKey="collected" stroke="hsl(var(--success))" strokeWidth={2} fill="url(#collectedGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Top & Outstanding clients */}
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 shadow-soft">
            <p className="text-sm font-medium">Top Clients by Revenue</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.topClients} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid hsl(var(--border))',
                      background: 'hsl(var(--card))',
                      fontSize: 12,
                    }}
                    formatter={(v: number) => formatCurrency(v)}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="p-6 shadow-soft">
            <p className="text-sm font-medium">Outstanding Clients</p>
            <div className="mt-4 space-y-3">
              {analyticsData.outstandingClients.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-warning/10 text-xs font-medium text-warning">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.company}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-warning">{formatCurrency(c.amount)}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
