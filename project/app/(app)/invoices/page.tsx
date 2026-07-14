'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { EmptyState } from '@/components/ui/empty-state';
import { LoadingState } from '@/components/ui/loading-state';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { InvoiceDialog } from '@/components/app/invoice-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Plus,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { invoiceRepository } from '@/lib/supabase/repositories/invoice';
import { clientRepository } from '@/lib/supabase/repositories/client';
import { formatCurrency, formatDate, type InvoiceStatus } from '@/lib/data';
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/database.types';

const statusFilters: (InvoiceStatus | 'all')[] = ['all', 'paid', 'pending', 'overdue', 'partial', 'draft'];

type Invoice = Awaited<ReturnType<typeof invoiceRepository.getInvoices>>[0];
type Client = Database['public']['Tables']['clients']['Row'];

export default function InvoicesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const pageSize = 8;

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const [invData, clientData] = await Promise.all([
        invoiceRepository.getInvoices(user.id),
        clientRepository.getClients(user.id),
      ]);
      setInvoices(invData);
      setClients(clientData);
    } catch (err) {
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (invoiceId: string) => {
    setLoading(true);
    try {
      if (!supabase) throw new Error('Supabase not initialized');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      await invoiceRepository.deleteInvoice(invoiceId, user.id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to delete invoice');
    } finally {
      setLoading(false);
    }
  };

  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      inv.number.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientCompany.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Manage and track all your invoices in one place."
        action={<InvoiceDialog clients={clients} onInvoiceUpdated={fetchData} />}
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        {loading ? (
          <LoadingState rows={5} className="p-4" />
        ) : error ? (
          <EmptyState
            icon={AlertCircle}
            title="Error loading invoices"
            description={error}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[140px]">Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <EmptyState
                      icon={FileText}
                      title="No invoices found"
                      description="Try adjusting your search or filters to find what you are looking for."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((inv, i) => (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">{inv.number}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{inv.clientName}</p>
                        <p className="text-xs text-muted-foreground">{inv.clientCompany}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(inv.amount)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(inv.dueDate)}</TableCell>
                    <TableCell>
                      <StatusBadge status={inv.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-1">
                        <InvoiceDialog invoice={inv} clients={clients} onInvoiceUpdated={fetchData} />
                        <ConfirmDialog
                          trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>}
                          title="Delete Invoice"
                          description="Are you sure you want to delete this invoice? This action cannot be undone."
                          onConfirm={() => handleDelete(inv.id)}
                          loading={loading}
                        />
                      </div>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        )}

        {/* Pagination */}
        {!loading && !error && filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Showing {paginated.length} of {filtered.length} invoices
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{page} / {totalPages}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
