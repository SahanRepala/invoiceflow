import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/database.types';

type Invoice = Database['public']['Tables']['invoices']['Row'] & {
  clients: { name: string; company: string } | null;
  items: Database['public']['Tables']['invoice_items']['Row'][];
};

export const invoiceRepository = {
  async getInvoices(userId: string) {
    if (!supabase) throw new Error('Supabase not initialized');

    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        clients (
          name,
          company
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map to UI-friendly structure
    return (data as Invoice[]).map((inv) => ({
      ...inv,
      clientName: inv.clients?.name || 'Unknown',
      clientCompany: inv.clients?.company || 'N/A',
      // Map to UI-friendly snake case to camel case
      number: inv.number,
      amount: Number(inv.amount),
      dueDate: inv.due_date,
      issueDate: inv.issue_date,
      status: inv.status,
    }));
  },
  async createInvoice(
    invoice: Database['public']['Tables']['invoices']['Insert'],
    items: Database['public']['Tables']['invoice_items']['Insert'][]
  ) {
    if (!supabase) throw new Error('Supabase not initialized');

    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .insert(invoice)
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    const itemsWithInvoiceId = items.map(item => ({
      ...item,
      invoice_id: invoiceData.id,
    }));

    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(itemsWithInvoiceId);

    if (itemsError) throw itemsError;

    return invoiceData;
  },
  async updateInvoice(
    id: string,
    invoice: Database['public']['Tables']['invoices']['Update'],
    items: Database['public']['Tables']['invoice_items']['Insert'][]
  ) {
    if (!supabase) throw new Error('Supabase not initialized');

    // Update invoice
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .update(invoice)
      .eq('id', id)
      .select()
      .single();

    if (invoiceError) throw invoiceError;

    // Delete existing items and insert new ones
    const { error: deleteError } = await supabase
      .from('invoice_items')
      .delete()
      .eq('invoice_id', id);

    if (deleteError) throw deleteError;

    const itemsWithInvoiceId = items.map(item => ({
      ...item,
      invoice_id: id,
    }));

    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(itemsWithInvoiceId);

    if (itemsError) throw itemsError;

    return invoiceData;
  },
  async deleteInvoice(id: string, userId: string) {
    if (!supabase) throw new Error('Supabase not initialized');

    // Delete invoice items
    const { error: itemsError } = await supabase
      .from('invoice_items')
      .delete()
      .eq('invoice_id', id);

    if (itemsError) throw itemsError;

    // Delete invoice
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  },
};
