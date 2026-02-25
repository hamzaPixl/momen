"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Clock, Github, Linkedin, Twitter } from "lucide-react";
import { SharedLayout } from "@/components/shared-layout";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslate } from "@/hooks/useTranslate";
import { identity } from "@/lib/config";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/momen-meetup",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/momen-meetup",
    icon: Linkedin,
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/momenmeetup",
    icon: Twitter,
  },
];

export default function ContactPageClient() {
  const { t } = useTranslate();

  return (
    <SharedLayout>
      <PageHero
        label={t("contactPage.label")}
        headline={t("contactPage.headline")}
        description={t("contactPage.description")}
      />

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left column: Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-semibold">
                    {t("common.sendMessage")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

            {/* Right column: Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-semibold">
                    {t("common.contact")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex-shrink-0 w-9 h-9 bg-primary/10 flex items-center justify-center"
                      style={{ borderRadius: "var(--radius)" }}
                      aria-hidden="true"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-0.5">
                        {t("common.email")}
                      </p>
                      <a
                        href={`mailto:${identity.contactEmail}`}
                        className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                        data-testid="contact-email"
                      >
                        {identity.contactEmail}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex-shrink-0 w-9 h-9 bg-primary/10 flex items-center justify-center"
                      style={{ borderRadius: "var(--radius)" }}
                      aria-hidden="true"
                    >
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-0.5">
                        Location
                      </p>
                      <p className="text-sm text-foreground font-medium">
                        Brussels, Belgium
                      </p>
                    </div>
                  </div>

                  {/* Response time */}
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex-shrink-0 w-9 h-9 bg-primary/10 flex items-center justify-center"
                      style={{ borderRadius: "var(--radius)" }}
                      aria-hidden="true"
                    >
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-0.5">
                        Response time
                      </p>
                      <p className="text-sm text-foreground font-medium">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social links card */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-semibold">
                    Follow us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3" aria-label="Social media links">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                          aria-label={`Follow us on ${label}`}
                        >
                          <span
                            className="flex-shrink-0 w-8 h-8 bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors"
                            style={{ borderRadius: "var(--radius)" }}
                            aria-hidden="true"
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="font-medium">{label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
