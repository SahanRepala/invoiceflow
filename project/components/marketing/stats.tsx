'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '$2.4B+', label: 'Invoices processed' },
  { value: '89%', label: 'Faster payment collection' },
  { value: '12,000+', label: 'Freelancers & agencies' },
  { value: '4.9/5', label: 'Average rating' },
];

export function Stats() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
