'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { DollarSign, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { monthlyRevenue } from '@/lib/data';

const chartData = monthlyRevenue.slice(-6).map((d) => ({
  month: d.month,
  revenue: d.revenue,
}));

export function DashboardMockup() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-2xl border border-border bg-card p-2 shadow-card">
        <div className="rounded-xl bg-background p-4 sm:p-6">
          {/* Browser bar */}
          <div className="mb-4 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-warning/60" />
              <div className="h-3 w-3 rounded-full bg-success/60" />
            </div>
            <div className="ml-2 flex-1 rounded-md border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
              app.invoiceflow.com/dashboard
            </div>
          </div>

          {/* Mock dashboard */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Revenue', value: '$301,100', icon: DollarSign, color: 'bg-primary/10 text-primary' },
              { label: 'Outstanding', value: '$40,900', icon: FileText, color: 'bg-warning/10 text-warning' },
              { label: 'Overdue', value: '$27,700', icon: TrendingUp, color: 'bg-destructive/10 text-destructive' },
              { label: 'Paid', value: '42 invoices', icon: CheckCircle2, color: 'bg-success/10 text-success' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-lg font-semibold">{stat.value}</p>
                    </div>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4"
          >
            <Card className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium">Revenue Overview</p>
                <span className="text-xs text-success">+14.2% vs last month</span>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="mockGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: '1px solid hsl(var(--border))',
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#mockGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
