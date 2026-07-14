'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowLeft, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  altLink: { text: string; href: string; label: string };
}

export function AuthLayout({ children, title, subtitle, altLink }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-12 lg:flex">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="none">
              <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white">InvoiceFlow</span>
        </Link>

        <div className="relative space-y-6">
          <h2 className="text-3xl font-semibold text-white">
            Get paid faster.
            <br />
            Never chase clients again.
          </h2>
          <div className="space-y-3">
            {[
              'Automated reminder emails before & after due dates',
              'Professional invoices with your branding',
              'Real-time payment tracking & analytics',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-primary-foreground/90">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-3">
          <div className="flex -space-x-2">
            {['bg-blue-400', 'bg-emerald-400', 'bg-amber-400', 'bg-rose-400'].map((c, i) => (
              <div key={i} className={`h-8 w-8 rounded-full border-2 border-primary ${c}`} />
            ))}
          </div>
          <p className="text-sm text-primary-foreground/70">12,000+ freelancers & agencies</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-between p-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm"
          >
            <div className="lg:hidden mb-8 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-lg font-semibold">InvoiceFlow</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {altLink.text}{' '}
              <Link href={altLink.href} className="font-medium text-primary hover:underline">
                {altLink.label}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { Button, Input, Label, Mail, Lock, User };
