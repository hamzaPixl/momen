"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Presentation,
  MessageSquare,
  Trophy,
  BookOpen,
  UserCircle,
  Bell,
  ArrowRight,
  ChevronRight,
  Zap,
} from "lucide-react";

import { SharedLayout } from "@/components/shared-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslate } from "@/hooks/useTranslate";
import { useCounter } from "@/hooks/useCounter";

// -------------------------------------------------------------------
// Constants
// -------------------------------------------------------------------

const FEATURE_ICONS = [
  Presentation,
  MessageSquare,
  Trophy,
  BookOpen,
  UserCircle,
  Bell,
];

const STATS_DATA = [
  { end: 150, suffix: "+", labelKey: "stats.meetups" },
  { end: 3500, suffix: "+", labelKey: "stats.participants" },
  { end: 12000, suffix: "+", labelKey: "stats.resources" },
  { end: 15, suffix: "+", labelKey: "stats.countries" },
];

// -------------------------------------------------------------------
// Animation variants
// -------------------------------------------------------------------

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// -------------------------------------------------------------------
// Sub-components
// -------------------------------------------------------------------

function StatCounter({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCounter(end, 2000, true);

  return (
    <div ref={ref} className="text-center" data-testid="stat-counter">
      <p className="text-4xl sm:text-5xl font-bold text-foreground tabular-nums">
        {count.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground font-medium uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

// -------------------------------------------------------------------
// Main page
// -------------------------------------------------------------------

export default function HomePageClient() {
  const { t, tArray, tRaw } = useTranslate();

  const badges = tArray("hero.badges");
  const featureItems = tRaw<{ title: string; description: string }[]>(
    "features.items"
  );
  const steps = tRaw<{ title: string; description: string }[]>(
    "howItWorks.steps"
  );

  return (
    <SharedLayout>
      {/* ================================================================
          1. HERO SECTION
      ================================================================ */}
      <section
        className="hero-gradient relative min-h-[90vh] flex items-center pt-8 pb-20 sm:pb-28 overflow-hidden"
        aria-label="Hero"
        data-testid="hero-section"
      >
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07] dark:opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, hsl(263 84% 58%) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06] dark:opacity-[0.1]"
          style={{
            background:
              "radial-gradient(circle, hsl(50 96% 49%) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            {/* Label */}
            <motion.div variants={fadeInUp}>
              <span className="section-label inline-flex items-center gap-1.5">
                <Zap className="w-3 h-3" aria-hidden="true" />
                {t("hero.label")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground"
            >
              {t("hero.headline")
                .split("\n")
                .map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="text-primary">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {t("hero.sub")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-3 items-center"
            >
              <Button asChild size="lg" className="rounded-full px-6 font-semibold shadow-md">
                <Link href="/meetups" data-testid="hero-cta1">
                  {t("hero.cta1")}
                  <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 font-semibold"
              >
                <a href="#features" data-testid="hero-cta2">
                  {t("hero.cta2")}
                  <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>

            {/* Badges */}
            {badges.length > 0 && (
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap gap-2"
                aria-label="Feature highlights"
              >
                {badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="outline"
                    className="rounded-full px-3 py-1 text-xs font-medium border-primary/30 text-foreground bg-primary/5"
                  >
                    {badge}
                  </Badge>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          2. FEATURES SECTION
      ================================================================ */}
      <section
        id="features"
        className="py-20 sm:py-28 bg-background"
        aria-labelledby="features-heading"
        data-testid="features-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.span variants={fadeInUp} className="section-label">
              {t("features.label")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              id="features-heading"
              className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
            >
              {t("features.headline")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-muted-foreground text-lg"
            >
              {t("features.description")}
            </motion.p>
          </motion.div>

          {/* Feature cards grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(featureItems ?? []).map((item, index) => {
              const Icon = FEATURE_ICONS[index] ?? Presentation;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="card-hover p-6 flex flex-col gap-4"
                  data-testid={`feature-card-${index}`}
                >
                  <div className="service-icon" aria-hidden="true">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          3. HOW IT WORKS SECTION
      ================================================================ */}
      <section
        className="py-20 sm:py-28 bg-muted/40"
        aria-labelledby="how-it-works-heading"
        data-testid="how-it-works-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-xl mx-auto mb-16"
          >
            <motion.span variants={fadeInUp} className="section-label">
              {t("howItWorks.label")}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              id="how-it-works-heading"
              className="mt-3 text-3xl sm:text-4xl font-bold text-foreground"
            >
              {t("howItWorks.headline")}
            </motion.h2>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0"
          >
            {/* Connecting line — desktop only */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30"
            />

            {(steps ?? []).map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center px-4 sm:px-6"
                data-testid={`step-${index}`}
              >
                {/* Number circle */}
                <div
                  className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-foreground mb-5 shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(50 96% 49% / 0.18), hsl(263 84% 58% / 0.12))",
                    border: "2px solid hsl(50 96% 49% / 0.35)",
                  }}
                  aria-hidden="true"
                >
                  <span className="text-primary font-extrabold">{index + 1}</span>
                </div>

                <h3 className="font-semibold text-foreground text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          4. STATS SECTION
      ================================================================ */}
      <section
        className="py-20 sm:py-28 bg-background"
        aria-label="Platform statistics"
        data-testid="stats-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12"
          >
            {STATS_DATA.map(({ end, suffix, labelKey }) => (
              <motion.div key={labelKey} variants={fadeInUp}>
                <StatCounter
                  end={end}
                  suffix={suffix}
                  label={t(labelKey)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          5. CTA BANNER
      ================================================================ */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6"
        aria-label="Call to action"
        data-testid="cta-section"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="cta-gradient max-w-5xl mx-auto rounded-3xl px-8 sm:px-16 py-16 sm:py-20 text-center overflow-hidden"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t("cta.headline")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            {t("cta.description")}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full px-8 py-3 text-sm font-semibold bg-white text-foreground hover:bg-white/90 shadow-xl border-0"
          >
            <Link href="/meetups" data-testid="cta-button">
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </SharedLayout>
  );
}
