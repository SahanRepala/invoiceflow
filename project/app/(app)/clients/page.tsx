'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/page-header';
import { Search, Plus, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { clients } from '@/lib/mock-data/clients';
import { formatCurrency } from '@/lib/data';
import { useState } from 'react';

export default function ClientsPage() {
  const [search, setSearch] = useState('');

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
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        }
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((client, i) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link href={`/clients/${client.id}`}>
              <Card className="group h-full p-5 shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium text-white ${client.avatarColor}`}>
                    {client.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{client.company}</p>
                    <p className="text-sm text-muted-foreground">{client.name}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <div className="mt-4 space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    {client.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">{client.address}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-sm font-semibold">{formatCurrency(client.totalRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Outstanding</p>
                    <p className={`text-sm font-semibold ${client.outstandingAmount > 0 ? 'text-warning' : 'text-success'}`}>
                      {formatCurrency(client.outstandingAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Invoices</p>
                    <p className="text-sm font-semibold">{client.invoiceCount}</p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
