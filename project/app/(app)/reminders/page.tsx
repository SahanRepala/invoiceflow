'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, CalendarClock, X, BellRing, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { reminders, formatCurrency, formatDate } from '@/lib/data';

const typeLabels: Record<string, string> = {
  'pre-due': 'Pre-due reminder',
  'due': 'Due date reminder',
  'post-due': 'Post-due reminder',
  'final-notice': 'Final notice',
};

const toneColors: Record<string, string> = {
  friendly: 'bg-success/10 text-success',
  professional: 'bg-primary/10 text-primary',
  firm: 'bg-warning/10 text-warning',
  legal: 'bg-destructive/10 text-destructive',
};

export default function RemindersPage() {
  const [tab, setTab] = useState('upcoming');

  const counts = {
    upcoming: reminders.filter((r) => r.status === 'upcoming').length,
    scheduled: reminders.filter((r) => r.status === 'scheduled').length,
    sent: reminders.filter((r) => r.status === 'sent').length,
    failed: reminders.filter((r) => r.status === 'failed').length,
  };

  const filtered = reminders.filter((r) => r.status === tab);

  const statusIcons: Record<string, React.ElementType> = {
    upcoming: Clock,
    scheduled: CalendarClock,
    sent: CheckCircle2,
    failed: AlertCircle,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reminder Automation"
        description="Automated email reminders for unpaid invoices."
        action={
          <Button>
            <Send className="mr-2 h-4 w-4" />
            New Reminder
          </Button>
        }
      />

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Upcoming', value: counts.upcoming, icon: Clock, color: 'bg-warning/10 text-warning' },
          { label: 'Scheduled', value: counts.scheduled, icon: CalendarClock, color: 'bg-primary/10 text-primary' },
          { label: 'Sent', value: counts.sent, icon: CheckCircle2, color: 'bg-success/10 text-success' },
          { label: 'Failed', value: counts.failed, icon: AlertCircle, color: 'bg-destructive/10 text-destructive' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="flex items-center gap-4 p-5 shadow-soft">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <Card className="shadow-soft">
            <div className="divide-y divide-border">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <BellRing className="h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-3 text-sm text-muted-foreground">No reminders in this category.</p>
                </div>
              ) : (
                filtered.map((r, i) => {
                  const Icon = statusIcons[r.status] ?? Clock;
                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${toneColors[r.tone]}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{r.clientCompany}</p>
                          <p className="text-xs text-muted-foreground">
                            {r.invoiceNumber} · {formatCurrency(r.amount)} · {typeLabels[r.type]}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {r.sentDate ? `Sent: ${formatDate(r.sentDate)}` : `Scheduled: ${formatDate(r.scheduledDate)}`}
                            {r.daysOverdue > 0 && ` · ${r.daysOverdue}d overdue`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${toneColors[r.tone]}`}>
                          {r.tone}
                        </span>
                        <Button variant="outline" size="sm">
                          <Send className="mr-1.5 h-3.5 w-3.5" />
                          Send Now
                        </Button>
                        <Button variant="ghost" size="sm">
                          <CalendarClock className="mr-1.5 h-3.5 w-3.5" />
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
