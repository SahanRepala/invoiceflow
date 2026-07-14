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
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Plus, Loader2, Pencil, Trash2 } from 'lucide-react';
import { clientRepository } from '@/lib/supabase/repositories/client';
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/database.types';

type Client = Database['public']['Tables']['clients']['Row'];

interface ClientDialogProps {
  client?: Client;
  onClientUpdated: () => void;
}

export function ClientDialog({ client, onClientUpdated }: ClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEdit = !!client;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      if (!supabase) throw new Error('Supabase not initialized');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const clientData = {
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        email: formData.get('email') as string,
      };

      if (isEdit) {
        await clientRepository.updateClient(client.id, clientData, user.id);
      } else {
        await clientRepository.createClient({
          user_id: user.id,
          ...clientData,
        });
      }

      setOpen(false);
      onClientUpdated();
    } catch (err) {
      console.error('Error saving client:', err);
      alert('Error saving client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!client) return;
    setLoading(true);
    try {
      if (!supabase) throw new Error('Supabase not initialized');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      await clientRepository.deleteClient(client.id, user.id);
      setOpen(false);
      onClientUpdated();
    } catch (err: any) {
      console.error('Error deleting client:', err);
      alert(err.message || 'Error deleting client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Client' : 'Add New Client'}</DialogTitle>
        </DialogHeader>
        <form id="client-form" onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={client?.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" defaultValue={client?.company} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={client?.email} required />
          </div>
        </form>
        <DialogFooter className="justify-between">
          {isEdit && (
            <ConfirmDialog
              trigger={<Button variant="ghost" className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</Button>}
              title="Delete Client"
              description="Are you sure you want to delete this client? This action cannot be undone."
              onConfirm={handleDelete}
              loading={loading}
            />
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" form="client-form" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? 'Update Client' : 'Add Client'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
