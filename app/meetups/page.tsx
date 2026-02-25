import type { Metadata } from "next";
import MeetupsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Meetups | Momen meetup",
  description: "Browse upcoming and past meetups, access slides and resources.",
};

export default function MeetupsPage() {
  return <MeetupsPageClient />;
}
