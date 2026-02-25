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
  Calendar,
  MapPin,
  Users,
  Globe,
} from "lucide-react";

import { SharedLayout } from "@/components/shared-layout";
import { Button } from "@/components/ui/button";
import { useTranslate } from "@/hooks/useTranslate";
import { useCounter } from "@/hooks/useCounter";

const FEATURE_ICONS = [
  Presentation,
  MessageSquare,
  Trophy,
  BookOpen,
  UserCircle,
  Bell,
];

const STATS_DATA = [
  { end: 150, suffix: "+", labelKey: "stats.meetups", icon: Calendar },
  { end: 3500, suffix: "+", labelKey: "stats.participants", icon: Users },
  { end: 12000, suffix: "+", labelKey: "stats.resources", icon: BookOpen },
  { end: 15, suffix: "+", labelKey: "stats.countries", icon: Globe },
];

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

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
    <div ref={ref} className="flex flex-col gap-1">
      <p className="font-serif text-4xl sm:text-5xl font-bold tracking-tight tabular-nums text-primary-foreground">
        {count.toLocaleString()}
        <span className="text-primary-foreground/50">{suffix}</span>
      </p>
      <p className="text-sm text-primary-foreground/60 font-medium">{label}</p>
    </div>
  );
}

export default function HomePageClient() {
  const { t, tArray, tRaw } = useTranslate();

  const badges = tArray("hero.badges");
  const featureItems = tRaw<{ title: string; description: string }[]>("features.items");
  const steps = tRaw<{ title: string; description: string }[]>("howItWorks.steps");

  return (
    <SharedLayout>
      {/* ====== HERO ====== */}
      <section className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.span variants={fadeIn} className="section-label">
              {t("hero.label")}
            </motion.span>

            <motion.h1
              variants={fadeIn}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-2 mb-6"
            >
              {t("hero.headline").split("\n").map((line, i) => (
                <span key={i} className={`block ${i === 1 ? "text-primary" : ""}`}>
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8"
            >
              {t("hero.sub")}
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-3 mb-6">
              <Button asChild size="lg" className="px-7 h-11 font-semibold">
                <Link href="/meetups">
                  {t("hero.cta1")}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-7 h-11 font-semibold"
              >
                <a href="#features">{t("hero.cta2")}</a>
              </Button>
            </motion.div>

            {badges.length > 0 && (
              <motion.div variants={fadeIn} className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Next event strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-12 pt-8 border-t border-border flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="font-semibold text-foreground">Next event:</span>
              <span className="font-bold text-foreground">AI Revolution 2026</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> March 15, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Brussels, Belgium
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> 120 attending
              </span>
            </div>
            <Link
              href="/meetups/ai-revolution-2026"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              View details <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section id="features" className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="max-w-lg mb-12">
              <span className="section-label">{t("features.label")}</span>
              <h2 className="font-serif mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                {t("features.headline")}
              </h2>
              <p className="mt-3 text-muted-foreground text-base sm:text-lg">
                {t("features.description")}
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border"
            >
              {(featureItems ?? []).map((item, i) => {
                const Icon = FEATURE_ICONS[i] ?? Presentation;
                return (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="bg-background p-6 sm:p-8 group hover:bg-muted/40 transition-colors duration-200"
                  >
                    <div className="service-icon mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="section-primary py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight">
                Growing every day
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16"
            >
              {STATS_DATA.map(({ end, suffix, labelKey }) => (
                <motion.div key={labelKey} variants={fadeIn}>
                  <StatCounter end={end} suffix={suffix} label={t(labelKey)} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="max-w-lg mb-12">
              <span className="section-label">{t("howItWorks.label")}</span>
              <h2 className="font-serif mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                {t("howItWorks.headline")}
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12"
            >
              {(steps ?? []).map((step, i) => (
                <motion.div key={i} variants={fadeIn} className="flex flex-col">
                  <span className="font-serif text-5xl font-bold text-primary/20 mb-4 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-16 sm:py-24 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
          >
            <motion.div variants={fadeIn} className="max-w-xl">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-secondary-foreground leading-tight tracking-tight">
                {t("cta.headline")}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-secondary-foreground/50 leading-relaxed">
                {t("cta.description")}
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-3 shrink-0">
              <Button
                asChild
                size="lg"
                className="px-7 h-11 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/meetups">
                  {t("cta.button")}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="px-7 h-11 font-semibold text-secondary-foreground/60 hover:text-secondary-foreground hover:bg-secondary-foreground/10"
              >
                <Link href="/contact">{t("common.contact")}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </SharedLayout>
  );
}
