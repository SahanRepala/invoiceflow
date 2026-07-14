'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { testimonials } from '@/lib/data';

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Testimonials</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Loved by billing teams everywhere
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white ${t.avatarColor}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.content}&rdquo;</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
