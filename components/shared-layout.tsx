"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, X, Sparkles } from "lucide-react";
import { identity } from "@/lib/config";
import { useTranslate } from "@/hooks/useTranslate";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.meetups", href: "/meetups" },
  { key: "nav.blog", href: "/blog" },
  { key: "nav.contact", href: "/contact" },
];

const footerLinks = [
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslate();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-[15px] font-bold tracking-tight">Momen</span>
          </Link>

          {/* Desktop nav — centered */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <LanguageSwitcher compact />
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex rounded-full text-xs font-semibold px-4 h-8"
            >
              <Link href="/meetups">
                {t("nav.cta")}
                <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
              </Link>
            </Button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 bg-background">
            <nav aria-label="Mobile navigation" className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium py-2.5 px-3 rounded-xl transition-colors ${
                      isActive
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
              <Button
                asChild
                size="sm"
                className="mt-2 rounded-full text-xs font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                <Link href="/meetups">
                  {t("nav.cta")}
                  <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* ─── Main ─── */}
      <main id="main-content" className="flex-1">{children}</main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-muted/30 px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-[15px] font-bold tracking-tight">Momen</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Pages */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-3">
                {t("footer.pages")}
              </h4>
              <div className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-3">
                {t("common.contact")}
              </h4>
              <a
                href={`mailto:${identity.contactEmail}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {identity.contactEmail}
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex gap-4">
              {footerLegalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
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
