import { cn } from '@/lib/utils';
import type { InvoiceStatus } from '@/lib/data';
import { CheckCircle2, Clock, AlertCircle, DollarSign, FileEdit } from 'lucide-react';

interface StatusBadgeProps {
  status: InvoiceStatus | string;
  className?: string;
}

const config: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  paid: {
    label: 'Paid',
    className: 'bg-success/10 text-success border-success/20',
    icon: CheckCircle2,
  },
  pending: {
    label: 'Pending',
    className: 'bg-primary/10 text-primary border-primary/20',
    icon: Clock,
  },
  overdue: {
    label: 'Overdue',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
    icon: AlertCircle,
  },
  partial: {
    label: 'Partial',
    className: 'bg-warning/10 text-warning border-warning/20',
    icon: DollarSign,
  },
  draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground border-border',
    icon: FileEdit,
  },
  completed: {
    label: 'Completed',
    className: 'bg-success/10 text-success border-success/20',
    icon: CheckCircle2,
  },
  failed: {
    label: 'Failed',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
    icon: AlertCircle,
  },
  scheduled: {
    label: 'Scheduled',
    className: 'bg-primary/10 text-primary border-primary/20',
    icon: Clock,
  },
  sent: {
    label: 'Sent',
    className: 'bg-success/10 text-success border-success/20',
    icon: CheckCircle2,
  },
  upcoming: {
    label: 'Upcoming',
    className: 'bg-warning/10 text-warning border-warning/20',
    icon: Clock,
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const c = config[status] ?? config.draft;
  const Icon = c.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        c.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {c.label}
    </span>
  );
}
