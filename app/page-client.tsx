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
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Check,
  Zap,
  Globe,
  Star,
} from "lucide-react";

import { SharedLayout } from "@/components/shared-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

const playfulEase = [0.22, 1, 0.36, 1] as const;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: playfulEase } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: playfulEase } },
};

function StatCounter({ end, suffix, label, icon: Icon }: { end: number; suffix: string; label: string; icon: React.ElementType }) {
  const { count, ref } = useCounter(end, 2000, true);
  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight tabular-nums">
        {count.toLocaleString()}
        <span className="text-white/60">{suffix}</span>
      </p>
      <p className="text-sm text-white/70 font-medium">{label}</p>
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
      {/* ====== BENTO HERO ====== */}
      <section className="hero-gradient relative pt-8 sm:pt-12 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {/* Main hero card — spans 2 cols */}
            <motion.div
              variants={fadeIn}
              className="lg:col-span-2 lg:row-span-2 bento-card p-6 sm:p-10 flex flex-col justify-between min-h-[340px] sm:min-h-[420px]"
            >
              <div>
                <Badge className="mb-5 rounded-full px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20 gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  {t("hero.label")}
                </Badge>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[1.1] tracking-tight">
                  {t("hero.headline").split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {i === 1 ? (
                        <span className="gradient-text">{line}</span>
                      ) : line}
                    </span>
                  ))}
                </h1>

                <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
                  {t("hero.sub")}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="rounded-full px-6 font-semibold h-11 shadow-lg shadow-primary/25">
                    <Link href="/meetups">
                      {t("hero.cta1")}
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-6 font-semibold h-11">
                    <a href="#features">{t("hero.cta2")}</a>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="rounded-full px-6 font-medium h-11 text-muted-foreground">
                    <Link href="/contact">
                      {t("common.contact")}
                    </Link>
                  </Button>
                </div>

                {badges.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full"
                      >
                        <Check className="w-3 h-3 text-accent" />
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Stats mini card */}
            <motion.div
              variants={scaleIn}
              className="bento-card-primary p-5 sm:p-6 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-white/80" />
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">Live Stats</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-heading text-3xl font-bold text-white">150+</p>
                  <p className="text-xs text-white/60">{t("stats.meetups")}</p>
                </div>
                <Separator className="bg-white/15" />
                <div>
                  <p className="font-heading text-3xl font-bold text-white">3.5K+</p>
                  <p className="text-xs text-white/60">{t("stats.participants")}</p>
                </div>
              </div>
            </motion.div>

            {/* Next event card */}
            <motion.div
              variants={scaleIn}
              className="bento-card p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Next Event</span>
                </div>
                <h3 className="font-heading font-bold text-foreground text-base leading-tight">
                  AI Revolution 2026
                </h3>
                <div className="mt-2 space-y-1.5">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" /> March 15, 2026
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" /> Brussels, Belgium
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" /> 120 attending
                  </p>
                </div>
              </div>
              <Button asChild size="sm" variant="secondary" className="mt-4 rounded-full text-xs font-semibold w-full">
                <Link href="/meetups/ai-revolution-2026">
                  RSVP Now
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== BENTO FEATURES ====== */}
      <section id="features" className="py-16 sm:py-24 dot-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-xl mx-auto mb-12"
          >
            <motion.span variants={fadeIn} className="section-label">
              {t("features.label")}
            </motion.span>
            <motion.h2 variants={fadeIn} className="font-heading mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {(featureItems ?? []).map((item, i) => {
              const Icon = FEATURE_ICONS[i] ?? Presentation;
              // First card spans 2 cols for bento effect
              const isLarge = i === 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={`bento-card p-6 ${isLarge ? "sm:col-span-2 sm:flex sm:gap-6 sm:items-start" : ""}`}
                >
                  <div className={`service-icon shrink-0 ${isLarge ? "sm:w-14 sm:h-14" : ""}`}>
                    <Icon className={`${isLarge ? "sm:w-6 sm:h-6" : ""} w-5 h-5`} />
                  </div>
                  <div className={`min-w-0 ${isLarge ? "" : "mt-4"}`}>
                    <h3 className={`font-heading font-semibold text-foreground mb-1.5 ${isLarge ? "text-lg" : "text-sm"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-muted-foreground leading-relaxed ${isLarge ? "text-base" : "text-sm"}`}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ====== STATS — FULL PRIMARY BG ====== */}
      <section className="section-primary py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 mb-3 bg-white/10 text-white/90 rounded-full">
                Impact
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Growing every day
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {STATS_DATA.map(({ end, suffix, labelKey, icon }) => (
                <motion.div key={labelKey} variants={fadeIn}>
                  <StatCounter end={end} suffix={suffix} label={t(labelKey)} icon={icon} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center max-w-lg mx-auto mb-12"
          >
            <motion.span variants={fadeIn} className="section-label">
              {t("howItWorks.label")}
            </motion.span>
            <motion.h2 variants={fadeIn} className="font-heading mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              {t("howItWorks.headline")}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {(steps ?? []).map((step, i) => {
              const colors = ["bento-card-primary", "bento-card-secondary", "bento-card-accent"];
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={`${colors[i]} p-6 sm:p-8 flex flex-col items-center text-center`}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm opacity-80 max-w-[260px] leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ====== INLINE CTA BENTO ====== */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {/* Main CTA card — spans 3 cols */}
            <motion.div
              variants={fadeIn}
              className="lg:col-span-3 cta-gradient p-8 sm:p-12 flex flex-col justify-center"
              style={{ borderRadius: "var(--radius)" }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                {t("cta.headline")}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
                {t("cta.description")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-7 h-11 text-sm font-semibold bg-white text-foreground hover:bg-white/90 shadow-lg border-0"
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
                  className="rounded-full px-6 h-11 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10"
                >
                  <Link href="/contact">
                    {t("common.contact")}
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Community card */}
            <motion.div
              variants={scaleIn}
              className="lg:col-span-2 bento-card p-6 sm:p-8 flex flex-col justify-center items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">Join the Community</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-[240px]">
                Connect with 3,500+ tech enthusiasts across 15+ countries
              </p>
              <div className="flex -space-x-2 mb-3">
                {["bg-primary", "bg-secondary", "bg-accent", "bg-chart-4", "bg-chart-5"].map((bg, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-card flex items-center justify-center text-[10px] font-bold text-white`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                  +99
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </SharedLayout>
  );
}
