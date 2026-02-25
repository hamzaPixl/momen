"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { identity } from "@/lib/config";
import { useTranslate } from "@/hooks/useTranslate";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.meetups", href: "/meetups" },
  { key: "nav.blog", href: "/blog" },
  { key: "nav.contact", href: "/contact" },
];

const footerFeatureLinks = [
  { key: "footer.footerLinks.meetups", href: "/meetups" },
  { key: "footer.footerLinks.blog", href: "/blog" },
  { key: "footer.footerLinks.contact", href: "/contact" },
];

const footerLegalLinks = [
  { key: "footer.footerLinks.legalNotice", href: "/legal" },
  { key: "footer.footerLinks.privacyPolicy", href: "/privacy" },
];

interface SharedLayoutProps {
  children: React.ReactNode;
}

export function SharedLayout({ children }: SharedLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { t } = useTranslate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <ScrollProgress />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className="flex justify-center px-4 transition-all duration-500"
          style={{ paddingTop: scrolled ? 8 : 0 }}
        >
          {/* Desktop navbar */}
          <motion.div
            layout
            className={`items-center justify-between w-full transition-all duration-500 hidden md:flex ${
              scrolled
                ? "max-w-4xl nav-pill rounded-full px-5 py-2.5"
                : "max-w-7xl bg-background/80 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3"
            }`}
          >
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className={`font-bold transition-all duration-300 ${scrolled ? "text-base" : "text-lg"}`}>
                Momen
              </span>
            </Link>

            <nav aria-label="Main navigation" className="flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-muted-foreground hover:text-foreground transition-colors font-medium group ${
                    scrolled ? "text-xs" : "text-sm"
                  }`}
                >
                  {t(link.key)}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher compact={scrolled} />
              <Button asChild size={scrolled ? "sm" : "default"} className={scrolled ? "rounded-full text-[11px] px-3.5" : ""}>
                <Link href="/meetups">
                  <ArrowRight className={scrolled ? "w-3 h-3 mr-1" : "w-3.5 h-3.5 mr-1.5"} aria-hidden="true" />
                  {t("nav.cta")}
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Mobile navbar */}
          <div
            className={`flex md:hidden items-center justify-between w-full transition-all duration-300 ${
              scrolled
                ? "bg-background/95 backdrop-blur-xl border border-border rounded-2xl px-4 py-2.5 shadow-lg"
                : "bg-background/80 backdrop-blur-md border-b border-border px-4 py-3"
            }`}
          >
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className={`font-bold transition-all duration-300 ${scrolled ? "text-sm" : "text-base"}`}>
                Momen
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher compact />
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs sm:w-72 flex flex-col">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" onClick={() => setSheetOpen(false)} className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="font-bold">Momen</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <nav aria-label="Mobile navigation" className="flex-1 px-1 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className="text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors py-3 px-3 rounded-md"
                      >
                        {t(link.key)}
                      </Link>
                    ))}
                  </nav>

                  <div className="px-1 py-5 border-t border-border space-y-3">
                    <Button asChild className="w-full" onClick={() => setSheetOpen(false)}>
                      <Link href="/meetups">
                        <ArrowRight className="w-4 h-4 mr-2" aria-hidden="true" />
                        {t("nav.cta")}
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Main Content */}
      <main id="main-content" className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-white px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-lg font-bold text-white">Momen</span>
              </Link>
              <p className="text-sm text-white/70 mb-4">{t("footer.tagline")}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white mb-4">
                {t("footer.pages")}
              </h4>
              <div className="flex flex-col gap-2">
                {footerFeatureLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white mb-4">
                {t("common.contact")}
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${identity.contactEmail}`}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {identity.contactEmail}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex gap-4">
              {footerLegalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/50 hover:text-white/70 transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
