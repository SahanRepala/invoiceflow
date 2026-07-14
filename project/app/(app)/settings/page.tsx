'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/page-header';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your company, billing, and notification preferences." />

      <Tabs defaultValue="company">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Company */}
        <TabsContent value="company" className="mt-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="max-w-2xl p-6 shadow-soft">
              <p className="text-sm font-medium">Company Information</p>
              <p className="text-xs text-muted-foreground">This appears on your invoices and emails.</p>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input defaultValue="Avery Studio" />
                  </div>
                  <div className="space-y-2">
                    <Label>Invoice Prefix</Label>
                    <Input defaultValue="INV-2024-" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD — US Dollar</SelectItem>
                        <SelectItem value="eur">EUR — Euro</SelectItem>
                        <SelectItem value="gbp">GBP — British Pound</SelectItem>
                        <SelectItem value="cad">CAD — Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific (PST)</SelectItem>
                        <SelectItem value="est">Eastern (EST)</SelectItem>
                        <SelectItem value="cet">Central European (CET)</SelectItem>
                        <SelectItem value="gmt">Greenwich (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Billing Address</Label>
                  <Textarea defaultValue="340 Pine St, San Francisco, CA 94104" rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Default Email Template</Label>
                  <Textarea
                    defaultValue="Hi {{client_name}}, please find your invoice {{invoice_number}} attached. Payment of {{amount}} is due by {{due_date}}. Thank you for your business."
                    rows={3}
                  />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Reminders */}
        <TabsContent value="reminders" className="mt-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="max-w-2xl p-6 shadow-soft">
              <p className="text-sm font-medium">Reminder Settings</p>
              <p className="text-xs text-muted-foreground">Configure automated reminder schedules.</p>
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Pre-due reminder', desc: 'Send reminder 3 days before due date', defaultChecked: true },
                  { label: 'Due date reminder', desc: 'Send reminder on the due date', defaultChecked: true },
                  { label: 'Post-due reminder', desc: 'Send reminder 3 days after due date', defaultChecked: true },
                  { label: 'Final notice', desc: 'Send final notice 30 days after due date', defaultChecked: false },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="text-sm font-medium">{r.label}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                    <Switch defaultChecked={r.defaultChecked} />
                  </div>
                ))}
                <div className="space-y-2">
                  <Label>Default Reminder Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="firm">Firm</SelectItem>
                      <SelectItem value="legal">Legal Notice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Reminder Settings</Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="max-w-2xl p-6 shadow-soft">
              <p className="text-sm font-medium">Notification Preferences</p>
              <p className="text-xs text-muted-foreground">Choose what you want to be notified about.</p>
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Payment received', desc: 'Get notified when a client pays an invoice', defaultChecked: true },
                  { label: 'Invoice overdue', desc: 'Get notified when an invoice becomes overdue', defaultChecked: true },
                  { label: 'Reminder sent', desc: 'Get notified when an automated reminder is sent', defaultChecked: false },
                  { label: 'Reminder failed', desc: 'Get notified when a reminder fails to send', defaultChecked: true },
                  { label: 'New client onboarded', desc: 'Get notified when a new client is added', defaultChecked: false },
                  { label: 'Weekly summary', desc: 'Receive a weekly billing summary email', defaultChecked: true },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="text-sm font-medium">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <Switch defaultChecked={n.defaultChecked} />
                  </div>
                ))}
                <Button>Save Preferences</Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
