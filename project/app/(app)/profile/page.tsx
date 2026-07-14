'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/page-header';
import { Mail, Phone, MapPin, Camera } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Manage your personal information and account details." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar card */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 text-center shadow-soft">
            <div className="relative mx-auto w-fit">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
                JA
              </div>
              <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card shadow-soft">
                <Camera className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
            <p className="mt-4 text-lg font-semibold">Jordan Avery</p>
            <p className="text-sm text-muted-foreground">Freelance Designer</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Pro Plan</span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Verified</span>
            </div>
          </Card>
        </motion.div>

        {/* Details form */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="lg:col-span-2">
          <Card className="p-6 shadow-soft">
            <p className="text-sm font-medium">Personal Information</p>
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue="Jordan" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue="Avery" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="jordan@averystudio.com" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="+1 (415) 555-0199" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="340 Pine St, San Francisco, CA 94104" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <textarea
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={3}
                  defaultValue="Independent designer specializing in brand identity and UI/UX for startups and small businesses."
                />
              </div>
              <div className="flex gap-3">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
