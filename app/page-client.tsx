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
  Zap,
  Check,
} from "lucide-react";

import { SharedLayout } from "@/components/shared-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  { end: 150, suffix: "+", labelKey: "stats.meetups" },
  { end: 3500, suffix: "+", labelKey: "stats.participants" },
  { end: 12000, suffix: "+", labelKey: "stats.resources" },
  { end: 15, suffix: "+", labelKey: "stats.countries" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(end, 2000, true);
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground tabular-nums">
        {count.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-1.5 text-sm text-muted-foreground font-medium">
        {label}
      </p>
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
      {/* ═══ HERO ═══ */}
      <section className="hero-gradient relative pt-16 sm:pt-24 pb-20 sm:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-semibold border-primary/30 bg-primary/5 text-foreground gap-1.5">
                <Zap className="w-3 h-3 text-primary" />
                {t("hero.label")}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight"
            >
              {t("hero.headline").split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mt-5 text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              {t("hero.sub")}
            </motion.p>

            <motion.div variants={fadeIn} className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6 font-semibold h-11">
                <Link href="/meetups">
                  {t("hero.cta1")}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6 font-semibold h-11">
                <a href="#features">{t("hero.cta2")}</a>
              </Button>
            </motion.div>

            {badges.length > 0 && (
              <motion.div variants={fadeIn} className="mt-8 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                  >
                    <Check className="w-3.5 h-3.5 text-primary" />
                    {badge}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="max-w-xl mb-14"
          >
            <motion.span variants={fadeIn} className="section-label">
              {t("features.label")}
            </motion.span>
            <motion.h2 variants={fadeIn} className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t("features.headline")}
            </motion.h2>
            <motion.p variants={fadeIn} className="mt-3 text-muted-foreground text-lg">
              {t("features.description")}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {(featureItems ?? []).map((item, i) => {
              const Icon = FEATURE_ICONS[i] ?? Presentation;
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="card-hover p-5 flex gap-4"
                >
                  <div className="service-icon shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-foreground mb-1">
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

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 sm:py-28 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-lg mx-auto mb-14"
          >
            <motion.span variants={fadeIn} className="section-label">
              {t("howItWorks.label")}
            </motion.span>
            <motion.h2 variants={fadeIn} className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t("howItWorks.headline")}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {(steps ?? []).map((step, i) => (
              <motion.div key={i} variants={fadeIn} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-lg font-extrabold text-primary mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {STATS_DATA.map(({ end, suffix, labelKey }) => (
              <motion.div key={labelKey} variants={fadeIn}>
                <StatCounter end={end} suffix={suffix} label={t(labelKey)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pb-20 sm:pb-28 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="cta-gradient max-w-4xl mx-auto rounded-3xl px-8 sm:px-14 py-14 sm:py-18 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {t("cta.headline")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/75 max-w-md mx-auto">
            {t("cta.description")}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 rounded-full px-7 h-11 text-sm font-semibold bg-white text-foreground hover:bg-white/90 shadow-lg border-0"
          >
            <Link href="/meetups">
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </SharedLayout>
  );
}
