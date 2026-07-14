'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { features } from '@/lib/data';
import * as Icons from 'lucide-react';

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to get paid
          </h2>
          <p className="mt-4 text-muted-foreground">
            From invoice creation to automated reminders and payment tracking — InvoiceFlow handles the entire billing lifecycle.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = (Icons as unknown as Record<string, React.ElementType>)[feature.icon] ?? Icons.FileText;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className="group h-full p-6 shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-success" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
