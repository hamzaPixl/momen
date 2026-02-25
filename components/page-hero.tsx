"use client";

import { motion } from "motion/react";

interface PageHeroProps {
  label: string;
  headline: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHero({ label, headline, description, children }: PageHeroProps) {
  return (
    <section className="py-14 sm:py-20 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] as const }}
          className="max-w-2xl"
        >
          <span className="section-label">{label}</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            {headline}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
