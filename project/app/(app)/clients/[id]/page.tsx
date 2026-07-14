'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Mail,
  Phone,
  MapPin,
  StickyNote,
  ArrowLeft,
  Plus,
  FileText,
  DollarSign,
  Receipt,
} from 'lucide-react';
import Link from 'next/link';
import { clients, invoices, formatCurrency, formatDate } from '@/lib/data';

export default function ClientProfilePage() {
  const params = useParams();
  const client = clients.find((c) => c.id === params.id);

  if (!client) {
    return (
      <div className="space-y-6">
        <Link href="/clients" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to clients
        </Link>
        <p className="text-muted-foreground">Client not found.</p>
      </div>
    );
  }

  const clientInvoices = invoices.filter((inv) => inv.clientId === client.id);

  return (
    <div className="space-y-6">
      <Link href="/clients" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to clients
      </Link>

      <PageHeader
        title={client.company}
        description={client.name}
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Client info */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-medium text-white ${client.avatarColor}`}>
                {client.initials}
              </div>
              <div>
                <p className="text-lg font-semibold">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.company}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                {client.email}
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                {client.phone}
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                {client.address}
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <StickyNote className="mt-0.5 h-4 w-4 flex-shrink-0" />
                {client.notes}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2 sm:grid-cols-3">
          {[
            { label: 'Total Revenue', value: formatCurrency(client.totalRevenue), icon: DollarSign, color: 'bg-primary/10 text-primary' },
            { label: 'Outstanding', value: formatCurrency(client.outstandingAmount), icon: Receipt, color: 'bg-warning/10 text-warning' },
            { label: 'Invoices', value: String(client.invoiceCount), icon: FileText, color: 'bg-success/10 text-success' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Invoices table */}
      <Card>
        <div className="p-6 pb-4">
          <p className="text-sm font-medium">Invoice History</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Invoice #</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Issued</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">{inv.number}</TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(inv.amount)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(inv.issueDate)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(inv.dueDate)}</TableCell>
                <TableCell>
                  <StatusBadge status={inv.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
