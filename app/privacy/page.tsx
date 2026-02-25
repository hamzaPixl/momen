import type { Metadata } from "next";
import PrivacyPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Privacy policy | Momen meetup",
  description: "How Momen meetup collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
