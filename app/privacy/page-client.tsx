"use client";

import { SharedLayout } from "@/components/shared-layout";
import { PageHero } from "@/components/page-hero";
import { useTranslate } from "@/hooks/useTranslate";
import { identity } from "@/lib/config";

export default function PrivacyPageClient() {
  const { t } = useTranslate();

  return (
    <SharedLayout>
      <PageHero
        label={t("privacyPage.label")}
        headline={t("privacyPage.title")}
        description={t("privacyPage.lastUpdated")}
      />

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-neutral max-w-none
            prose-headings:font-serif prose-headings:text-foreground prose-headings:tracking-tight
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:text-muted-foreground">

            <p>{t("privacyPage.intro")}</p>

            <h2>{t("privacyPage.dataController")}</h2>
            <p>{t("privacyPage.dataControllerIntro")}</p>
            <p>
              <strong>{identity.name}</strong><br />
              <a href={`mailto:${identity.contactEmail}`}>{identity.contactEmail}</a>
            </p>

            <h2>{t("privacyPage.dataCollected")}</h2>
            <p>{t("privacyPage.dataCollectedIntro")}</p>
            <ul>
              <li>Name and email address (via the contact form)</li>
              <li>Usage data (via Google Analytics, with consent)</li>
              <li>Technical data (IP address, browser type — collected by hosting provider)</li>
            </ul>

            <h2>{t("privacyPage.purposes")}</h2>
            <p>{t("privacyPage.purposesIntro")}</p>
            <ul>
              <li>Responding to your contact requests</li>
              <li>Improving the website through anonymized analytics</li>
              <li>Sending meetup-related communications (only with explicit consent)</li>
            </ul>

            <h2>{t("privacyPage.legalBasis")}</h2>
            <p>{t("privacyPage.legalBasisIntro")}</p>
            <ul>
              <li>Your consent (analytics, marketing)</li>
              <li>Legitimate interest (contact form responses)</li>
              <li>Legal obligation where applicable</li>
            </ul>

            <h2>{t("privacyPage.retention")}</h2>
            <p>{t("privacyPage.retentionIntro")}</p>

            <h2>{t("privacyPage.rights")}</h2>
            <p>{t("privacyPage.rightsIntro")}</p>
            <ul>
              <li>Right of access to your data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restriction of processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
            <p>
              {t("privacyPage.rightsExercise")}{" "}
              <a href={`mailto:${identity.contactEmail}`}>{identity.contactEmail}</a>
            </p>

            <h2>{t("privacyPage.security")}</h2>
            <p>{t("privacyPage.securityText")}</p>

            <h2>{t("privacyPage.modification")}</h2>
            <p>{t("privacyPage.modificationText")}</p>
          </div>
        </div>
      </section>
    </SharedLayout>
  );
}
