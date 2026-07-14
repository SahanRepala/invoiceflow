'use client';

import { motion } from 'framer-motion';
import { trustedByLogos } from '@/lib/data';

export function TrustedBy() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Trusted by Freelancers, Agencies &amp; Consultants
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {trustedByLogos.map((logo, i) => (
            <motion.span
              key={logo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="text-lg font-semibold text-muted-foreground/60 grayscale transition-opacity hover:text-muted-foreground"
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
