import type { Metadata } from "next";
import LegalPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Legal notice | Momen meetup",
  description: "Legal notice and site information for Momen meetup.",
};

export default function LegalPage() {
  return <LegalPageClient />;
}
