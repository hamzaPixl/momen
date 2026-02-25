"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Calendar, MapPin, Users, FileText, ArrowRight } from "lucide-react";

import { SharedLayout } from "@/components/shared-layout";
import { PageHero } from "@/components/page-hero";
import { useTranslate } from "@/hooks/useTranslate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { staggerContainer, fadeInScale } from "@/lib/animations";

const mockMeetups = [
  {
    slug: "ai-revolution-2026",
    title: "AI Revolution 2026",
    date: "2026-03-15",
    location: "Brussels, Belgium",
    attendees: 120,
    resources: 15,
    upcoming: true,
  },
  {
    slug: "react-deep-dive",
    title: "React Deep Dive",
    date: "2026-03-28",
    location: "Antwerp, Belgium",
    attendees: 85,
    resources: 12,
    upcoming: true,
  },
  {
    slug: "cloud-native-meetup",
    title: "Cloud Native Meetup",
    date: "2026-02-10",
    location: "Ghent, Belgium",
    attendees: 95,
    resources: 18,
    upcoming: false,
  },
  {
    slug: "design-systems-workshop",
    title: "Design Systems Workshop",
    date: "2026-01-20",
    location: "Brussels, Belgium",
    attendees: 65,
    resources: 8,
    upcoming: false,
  },
  {
    slug: "typescript-mastery",
    title: "TypeScript Mastery",
    date: "2025-12-15",
    location: "Leuven, Belgium",
    attendees: 110,
    resources: 22,
    upcoming: false,
  },
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface MeetupCardProps {
  meetup: (typeof mockMeetups)[number];
  attendeesLabel: string;
  resourcesLabel: string;
  viewDetailsLabel: string;
}

function MeetupCard({ meetup, attendeesLabel, resourcesLabel, viewDetailsLabel }: MeetupCardProps) {
  return (
    <motion.div variants={fadeInScale}>
      <Card className="h-full flex flex-col hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="font-serif text-lg leading-snug">{meetup.title}</CardTitle>
            {meetup.upcoming && (
              <Badge className="shrink-0" variant="default">
                Upcoming
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{formatDate(meetup.date)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{meetup.location}</span>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                <span className="font-semibold text-foreground">{meetup.attendees}</span>{" "}
                {attendeesLabel}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                <span className="font-semibold text-foreground">{meetup.resources}</span>{" "}
                {resourcesLabel}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button asChild variant="outline" className="w-full group" size="sm">
            <Link href={`/meetups/${meetup.slug}`}>
              {viewDetailsLabel}
              <ArrowRight
                className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function MeetupsPageClient() {
  const { t } = useTranslate();

  const upcomingMeetups = mockMeetups.filter((m) => m.upcoming);
  const pastMeetups = mockMeetups.filter((m) => !m.upcoming);

  const attendeesLabel = t("meetupsPage.attendees");
  const resourcesLabel = t("meetupsPage.resources");
  const viewDetailsLabel = t("meetupsPage.viewDetails");

  return (
    <SharedLayout>
      <PageHero
        label={t("meetupsPage.label")}
        headline={t("meetupsPage.headline")}
        description={t("meetupsPage.description")}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-8" aria-label="Filter meetups by status">
            <TabsTrigger value="upcoming">
              {t("meetupsPage.upcoming")}
              <span className="ml-2 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold">
                {upcomingMeetups.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="past">
              {t("meetupsPage.past")}
              <span className="ml-2 rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-xs font-semibold">
                {pastMeetups.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingMeetups.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">
                {t("meetupsPage.noMeetups")}
              </p>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {upcomingMeetups.map((meetup) => (
                  <MeetupCard
                    key={meetup.slug}
                    meetup={meetup}
                    attendeesLabel={attendeesLabel}
                    resourcesLabel={resourcesLabel}
                    viewDetailsLabel={viewDetailsLabel}
                  />
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastMeetups.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">
                {t("meetupsPage.noMeetups")}
              </p>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {pastMeetups.map((meetup) => (
                  <MeetupCard
                    key={meetup.slug}
                    meetup={meetup}
                    attendeesLabel={attendeesLabel}
                    resourcesLabel={resourcesLabel}
                    viewDetailsLabel={viewDetailsLabel}
                  />
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </SharedLayout>
  );
}
