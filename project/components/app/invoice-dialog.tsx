'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Loader2, Pencil, Trash2 } from 'lucide-react';
import { invoiceRepository } from '@/lib/supabase/repositories/invoice';
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/database.types';
import { formatCurrency } from '@/lib/data';

type Invoice = Awaited<ReturnType<typeof invoiceRepository.getInvoices>>[0];
type Client = Database['public']['Tables']['clients']['Row'];

interface InvoiceDialogProps {
  invoice?: Invoice;
  clients: Client[];
  onInvoiceUpdated: () => void;
}

export function InvoiceDialog({ invoice, clients, onInvoiceUpdated }: InvoiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [items, setItems] = useState(invoice ? invoice.items : [{ description: '', quantity: 1, rate: 0 }]);
  const [taxRate, setTaxRate] = useState(invoice?.tax_rate ?? 0);
  const [discount, setDiscount] = useState(invoice?.discount ?? 0);

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount - discount;

  const isEdit = !!invoice;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!supabase) throw new Error('Supabase not initialized');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const formData = new FormData(e.currentTarget);
      
      const invoiceData = {
        user_id: user.id,
        client_id: formData.get('clientId') as string,
        number: isEdit ? invoice.number : `INV-${Date.now()}`,
        amount: total,
        due_date: formData.get('dueDate') as string,
        issue_date: isEdit ? invoice.issueDate : new Date().toISOString().split('T')[0],
        status: 'pending' as const,
        tax_rate: taxRate,
        discount: discount,
      };

      const invoiceItems = items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        invoice_id: 'temp', 
      }));

      if (isEdit) {
        await invoiceRepository.updateInvoice(invoice.id, invoiceData, invoiceItems);
      } else {
        await invoiceRepository.createInvoice(invoiceData, invoiceItems);
      }
      
      setOpen(false);
      onInvoiceUpdated();
    } catch (err) {
      console.error(err);
      alert('Failed to save invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Invoice' : 'Create New Invoice'}</DialogTitle>
        </DialogHeader>
        <form id="invoice-form" onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Client</Label>
              <Select name="clientId" defaultValue={invoice?.client_id} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input name="dueDate" type="date" defaultValue={invoice?.dueDate} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Line Items</Label>
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2">
                <Input className="col-span-6" placeholder="Description" value={item.description} onChange={(e) => {
                  const newItems = [...items];
                  newItems[idx].description = e.target.value;
                  setItems(newItems);
                }} required />
                <Input className="col-span-2" placeholder="Qty" type="number" value={item.quantity} onChange={(e) => {
                  const newItems = [...items];
                  newItems[idx].quantity = Number(e.target.value);
                  setItems(newItems);
                }} required />
                <Input className="col-span-3" placeholder="Rate" type="number" value={item.rate} onChange={(e) => {
                  const newItems = [...items];
                  newItems[idx].rate = Number(e.target.value);
                  setItems(newItems);
                }} required />
                <Button type="button" variant="ghost" size="icon" className="col-span-1" onClick={() => setItems(items.filter((_, i) => i !== idx))}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setItems([...items, { description: '', quantity: 1, rate: 0 }])}>
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tax Rate (%)</Label>
              <Input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label>Discount ($)</Label>
              <Input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} placeholder="0" />
            </div>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" form="invoice-form" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? 'Update Invoice' : 'Create Invoice'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
