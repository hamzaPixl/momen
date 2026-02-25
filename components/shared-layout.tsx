"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, X } from "lucide-react";
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      {/* --- Header: solid bar, editorial --- */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-foreground/10 bg-background">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 bg-primary flex items-center justify-center" style={{ borderRadius: "var(--radius)" }}>
              <span className="text-primary-foreground font-bold text-sm leading-none">M</span>
            </div>
            <span className="font-heading text-[15px] font-bold tracking-tight">Momen</span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
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
              className="hidden sm:inline-flex text-xs font-semibold px-4 h-8"
              style={{ borderRadius: "var(--radius)" }}
            >
              <Link href="/meetups">
                {t("nav.cta")}
                <ArrowRight className="w-3 h-3 ml-1" aria-hidden="true" />
              </Link>
            </Button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
              style={{ borderRadius: "var(--radius)" }}
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
          <div className="md:hidden border-t border-border bg-background">
            <nav aria-label="Mobile navigation" className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium py-2.5 px-3 transition-colors ${
                      isActive
                        ? "text-primary font-semibold bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
              <Button
                asChild
                size="sm"
                className="mt-2 text-xs font-semibold"
                style={{ borderRadius: "var(--radius)" }}
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

      {/* --- Main --- */}
      <main id="main-content" className="flex-1">{children}</main>

      {/* --- Footer: dark, high-contrast, editorial --- */}
      <footer className="bg-foreground text-background px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 bg-primary flex items-center justify-center" style={{ borderRadius: "var(--radius)" }}>
                  <span className="text-primary-foreground font-bold text-sm leading-none">M</span>
                </div>
                <span className="font-heading text-[15px] font-bold tracking-tight text-background">Momen</span>
              </Link>
              <p className="text-sm text-background/60 max-w-sm leading-relaxed">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Pages */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                {t("footer.pages")}
              </h4>
              <div className="flex flex-col gap-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                {t("common.contact")}
              </h4>
              <a
                href={`mailto:${identity.contactEmail}`}
                className="text-sm text-background/60 hover:text-background transition-colors"
              >
                {identity.contactEmail}
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-background/40">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex gap-4">
              {footerLegalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-background/40 hover:text-background/70 transition-colors"
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
