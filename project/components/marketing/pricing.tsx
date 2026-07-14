'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { pricingPlans } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Pricing</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade when you need more. Cancel anytime.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={cn('text-sm font-medium', !yearly && 'text-foreground', yearly && 'text-muted-foreground')}>
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative h-6 w-11 rounded-full bg-muted transition-colors data-[on=true]:bg-primary"
            data-on={yearly}
          >
            <span
              className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                yearly ? 'translate-x-5' : 'translate-x-0.5'
              )}
            />
          </button>
          <span className={cn('text-sm font-medium', yearly && 'text-foreground', !yearly && 'text-muted-foreground')}>
            Yearly
          </span>
          <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            Save 20%
          </span>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={cn(
                  'relative flex h-full flex-col p-6 shadow-soft',
                  plan.highlighted && 'border-primary shadow-glow ring-1 ring-primary/20'
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    ${yearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                {yearly && plan.monthly > 0 && (
                  <p className="mt-1 text-xs text-success">Billed annually</p>
                )}
                <Button
                  className="mt-6 w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
