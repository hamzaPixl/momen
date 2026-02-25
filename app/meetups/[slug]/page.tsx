import type { Metadata } from "next";
import MeetupDetailPageClient from "./page-client";

const mockMeetups = [
  { slug: "ai-revolution-2026", title: "AI Revolution 2026", date: "2026-03-15", location: "Brussels, Belgium", attendees: 120, resources: 15, upcoming: true },
  { slug: "react-deep-dive", title: "React Deep Dive", date: "2026-03-28", location: "Antwerp, Belgium", attendees: 85, resources: 12, upcoming: true },
  { slug: "cloud-native-meetup", title: "Cloud Native Meetup", date: "2026-02-10", location: "Ghent, Belgium", attendees: 95, resources: 18, upcoming: false },
  { slug: "design-systems-workshop", title: "Design Systems Workshop", date: "2026-01-20", location: "Brussels, Belgium", attendees: 65, resources: 8, upcoming: false },
  { slug: "typescript-mastery", title: "TypeScript Mastery", date: "2025-12-15", location: "Leuven, Belgium", attendees: 110, resources: 22, upcoming: false },
];

export function generateStaticParams() {
  return mockMeetups.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meetup = mockMeetups.find((m) => m.slug === slug);
  return {
    title: meetup ? `${meetup.title} | Momen meetup` : "Meetup | Momen meetup",
    description: meetup
      ? `Slides, resources, discussions and leaderboard for ${meetup.title} on ${meetup.date} in ${meetup.location}.`
      : "Meetup details, slides and resources.",
  };
}

export default async function MeetupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meetup = mockMeetups.find((m) => m.slug === slug) ?? null;
  return <MeetupDetailPageClient slug={slug} meetup={meetup} />;
}
