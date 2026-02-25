"use client";

import Link from "next/link";
import { SharedLayout } from "@/components/shared-layout";
import { PageHero } from "@/components/page-hero";
import { useTranslate } from "@/hooks/useTranslate";
import { identity } from "@/lib/config";

export default function LegalPageClient() {
  const { t } = useTranslate();

  return (
    <SharedLayout>
      <PageHero
        label={t("legalPage.label")}
        headline={t("legalPage.title")}
        description={t("legalPage.lastUpdated")}
      />

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-neutral max-w-none
            prose-headings:font-serif prose-headings:text-foreground prose-headings:tracking-tight
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground">

            <h2>{t("legalPage.siteEditor")}</h2>
            <p>{t("legalPage.siteEditorIntro")}</p>
            <p>
              <strong>{identity.name}</strong><br />
              {identity.address.city && <>{identity.address.city}, {identity.address.country}<br /></>}
              <a href={`mailto:${identity.contactEmail}`}>{identity.contactEmail}</a>
            </p>

            <h2>{t("legalPage.hosting")}</h2>
            <p>{t("legalPage.hostingIntro")}</p>
            <p>
              <strong>Netlify, Inc.</strong><br />
              44 Montgomery Street, Suite 300<br />
              San Francisco, CA 94104, USA<br />
              <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">www.netlify.com</a>
            </p>

            <h2>{t("legalPage.intellectualProperty")}</h2>
            <p>{t("legalPage.intellectualPropertyText")}</p>

            <h2>{t("legalPage.liability")}</h2>
            <p>{t("legalPage.liabilityText1")}</p>
            <p>{t("legalPage.liabilityText2")}</p>

            <h2>{t("legalPage.gdpr")}</h2>
            <p>{t("legalPage.gdprText1")}</p>
            <p>
              {t("legalPage.gdprText2")}{" "}
              <Link href="/privacy">{t("legalPage.privacyPolicyLink")}</Link>.
            </p>

            <h2>{t("legalPage.cookies")}</h2>
            <p>{t("legalPage.cookiesText")}</p>

            <h2>{t("legalPage.applicableLaw")}</h2>
            <p>{t("legalPage.applicableLawText")}</p>
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
