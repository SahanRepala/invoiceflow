'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

const tones = [
  { value: 'friendly', label: 'Friendly' },
  { value: 'professional', label: 'Professional' },
  { value: 'firm', label: 'Firm' },
  { value: 'legal', label: 'Legal Notice' },
];

function generateEmail(clientName: string, invoiceNumber: string, amount: string, daysOverdue: string, tone: string): string {
  const subject = `Reminder: Invoice ${invoiceNumber} ${daysOverdue && Number(daysOverdue) > 0 ? `— ${daysOverdue} days overdue` : 'due soon'}`;

  let body = '';
  switch (tone) {
    case 'friendly':
      body = `Hi ${clientName},\n\nI hope you're doing well! Just a friendly reminder that invoice ${invoiceNumber} for ${amount} ${Number(daysOverdue) > 0 ? `was due ${daysOverdue} days ago` : 'is due soon'}. I know things can get busy, so I wanted to send a quick nudge in case it slipped through the cracks.\n\nYou can pay via the link in the original invoice. If you've already sent payment, please disregard this message — thank you!\n\nWarm regards,\nJordan Avery`;
      break;
    case 'professional':
      body = `Dear ${clientName},\n\nThis is a professional reminder regarding invoice ${invoiceNumber} for ${amount}, which ${Number(daysOverdue) > 0 ? `is now ${daysOverdue} days past due` : 'is approaching its due date'}.\n\nPer our agreed payment terms, we kindly request that payment be submitted at your earliest convenience. You can complete payment using the link provided in the original invoice.\n\nIf you have already processed payment, please accept our thanks and disregard this notice. Should you have any questions about the invoice, please don't hesitate to reach out.\n\nBest regards,\nJordan Avery`;
      break;
    case 'firm':
      body = `Dear ${clientName},\n\nWe are writing to follow up on invoice ${invoiceNumber} for ${amount}, which ${Number(daysOverdue) > 0 ? `is now ${daysOverdue} days overdue` : 'has passed its due date'}.\n\nDespite previous reminders, we have not yet received payment. We request that payment be made within 5 business days to avoid further action. Late payments may be subject to additional fees as outlined in our service agreement.\n\nPlease process payment immediately using the link in the original invoice. If there is an issue with the invoice, contact us right away.\n\nRegards,\nJordan Avery`;
      break;
    case 'legal':
      body = `FINAL NOTICE — LEGAL\n\nTo: ${clientName}\nRe: Invoice ${invoiceNumber} — ${amount}\n\nThis is a formal final notice regarding the outstanding balance of ${amount} on invoice ${invoiceNumber}, which is ${daysOverdue} days overdue.\n\nThis is our final attempt to resolve this matter amicably. If payment is not received within 7 days of the date of this notice, we will have no option but to escalate this matter, which may include referral to a collections agency and/or legal proceedings to recover the outstanding amount, plus any applicable costs and interest.\n\nTo avoid this action, please remit payment immediately using the payment link in the original invoice.\n\nThis notice is sent without prejudice to our rights.\n\nJordan Avery`;
      break;
  }

  return `${subject}\n\n${body}`;
}

export default function AIReminderPage() {
  const [clientName, setClientName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [daysOverdue, setDaysOverdue] = useState('');
  const [tone, setTone] = useState('friendly');
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setGenerated('');
    setTimeout(() => {
      setGenerated(generateEmail(clientName || 'Client', invoiceNumber || 'INV-2024-0000', amount || '$0.00', daysOverdue || '0', tone));
      setLoading(false);
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Reminder Writer"
        description="Generate professional reminder emails with AI. Pick a tone, enter invoice details, and get a ready-to-send email."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input form */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">Invoice Details</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input
                  placeholder="e.g. Sarah Chen"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Invoice Number</Label>
                  <Input
                    placeholder="INV-2024-0142"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    placeholder="$4,200"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Days Overdue</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={daysOverdue}
                    onChange={(e) => setDaysOverdue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGenerate} className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Reminder
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Preview */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="flex h-full flex-col p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium">Generated Email Preview</p>
              {generated && (
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="mr-1.5 h-3.5 w-3.5 text-success" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1.5 h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>

            {generated ? (
              <div className="flex-1">
                <Textarea
                  readOnly
                  value={generated}
                  className="h-full min-h-[400px] resize-none font-mono text-sm leading-relaxed"
                />
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
                <Sparkles className="h-10 w-10 text-muted-foreground/40" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Fill in the details and click Generate to see your reminder email here.
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
