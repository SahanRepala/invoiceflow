'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/page-header';
import { EmptyState } from '@/components/ui/empty-state';
import { LoadingState } from '@/components/ui/loading-state';
import { ClientDialog } from '@/components/app/client-dialog';
import { Search, Mail, Phone, MapPin, Users, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/data';
import { clientRepository } from '@/lib/supabase/repositories/client';
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/database.types';

type Client = Database['public']['Tables']['clients']['Row'];

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchClients() {
    setLoading(true);
    setError(null);
    try {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const data = await clientRepository.getClients(user.id);
      setClients(data);
    } catch (err) {
      setError('Failed to load clients. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Manage your client relationships and billing details."
        action={<ClientDialog onClientUpdated={fetchClients} />}
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <LoadingState rows={3} />
      ) : error ? (
        <EmptyState
          icon={AlertCircle}
          title="Error loading clients"
          description={error}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No clients found"
          description="Get started by adding your first client."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="group h-full p-5 transition-all hover:shadow-card hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium text-white ${client.avatar_color ?? 'bg-primary'}`}>
                    {client.initials ?? client.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <Link href={`/clients/${client.id}`}>
                      <p className="font-semibold">{client.company}</p>
                      <p className="text-sm text-muted-foreground">{client.name}</p>
                    </Link>
                  </div>
                  <ClientDialog client={client} onClientUpdated={fetchClients} />
                </div>

                <div className="mt-4 space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    {client.phone ?? 'N/A'}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">{client.address ?? 'N/A'}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-semibold">{client.email}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
