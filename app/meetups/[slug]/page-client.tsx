"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Presentation,
  Link as LinkIcon,
  MessageCircle,
  Trophy,
  Download,
  ExternalLink,
} from "lucide-react";

import { SharedLayout } from "@/components/shared-layout";
import { useTranslate } from "@/hooks/useTranslate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { staggerContainer, fadeInScale, fadeInUp } from "@/lib/animations";

interface Meetup {
  slug: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  resources: number;
  upcoming: boolean;
}

interface MeetupDetailPageClientProps {
  slug: string;
  meetup: Meetup | null;
}

const mockSlides = [
  { id: 1, title: "Introduction to AI Tools in 2026", presenter: "Sophie Laurent", slides: 42, downloadUrl: "#" },
  { id: 2, title: "Practical LLM Integration Patterns", presenter: "Pieter Van den Berg", slides: 35, downloadUrl: "#" },
  { id: 3, title: "AI Ethics & the Belgian Tech Scene", presenter: "Marie Dubois", slides: 28, downloadUrl: "#" },
];

const mockResources = [
  { id: 1, title: "State of AI Report 2026", url: "https://example.com/ai-report", type: "Report", sharedBy: "Sophie Laurent" },
  { id: 2, title: "LangChain Documentation", url: "https://example.com/langchain", type: "Docs", sharedBy: "Pieter Van den Berg" },
  { id: 3, title: "Awesome AI Tools GitHub Repo", url: "https://example.com/awesome-ai", type: "Repo", sharedBy: "Marie Dubois" },
  { id: 4, title: "EU AI Act Summary", url: "https://example.com/eu-ai-act", type: "Article", sharedBy: "Thomas Hermans" },
];

const mockDiscussions = [
  {
    id: 1,
    author: "Alex Maes",
    avatar: "AM",
    title: "What LLM framework are you currently using in production?",
    replies: 12,
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Julie Claes",
    avatar: "JC",
    title: "Resources for getting started with local LLMs?",
    replies: 7,
    time: "4 hours ago",
  },
  {
    id: 3,
    author: "Remi Fontaine",
    avatar: "RF",
    title: "Follow-up on the AI Ethics talk — great points raised!",
    replies: 5,
    time: "6 hours ago",
  },
];

const mockLeaderboard = [
  { rank: 1, name: "Sophie Laurent", points: 340, badge: "Speaker" },
  { rank: 2, name: "Pieter Van den Berg", points: 295, badge: "Speaker" },
  { rank: 3, name: "Alex Maes", points: 180, badge: "Top contributor" },
  { rank: 4, name: "Julie Claes", points: 155, badge: null },
  { rank: 5, name: "Thomas Hermans", points: 120, badge: null },
];

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-yellow-500 font-bold text-lg" aria-label="1st place">1st</span>;
  if (rank === 2) return <span className="text-slate-400 font-bold text-lg" aria-label="2nd place">2nd</span>;
  if (rank === 3) return <span className="text-amber-700 font-bold text-lg" aria-label="3rd place">3rd</span>;
  return <span className="text-muted-foreground font-semibold text-base" aria-label={`${rank}th place`}>{rank}</span>;
}

export default function MeetupDetailPageClient({ meetup }: MeetupDetailPageClientProps) {
  const { t } = useTranslate();

  if (!meetup) {
    return (
      <SharedLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
          <p className="text-muted-foreground mb-6">Meetup not found.</p>
          <Button asChild variant="outline">
            <Link href="/meetups">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              {t("meetupsPage.label")}
            </Link>
          </Button>
        </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout>
      {/* Hero */}
      <section className="py-12 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
              <Link href="/meetups">
                <ArrowLeft className="w-4 h-4 mr-1.5" aria-hidden="true" />
                {t("meetupsPage.label")}
              </Link>
            </Button>

            <div className="flex flex-wrap items-start gap-3 mb-4">
              <p className="section-label">{t("meetupsPage.label")}</p>
              {meetup.upcoming && (
                <Badge variant="default">Upcoming</Badge>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-6">
              {meetup.title}
            </h1>

            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{formatDate(meetup.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{meetup.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-foreground">{meetup.attendees}</span>{" "}
                  {t("meetupsPage.attendees")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Tabs defaultValue="slides">
          <TabsList
            className="mb-8 flex-wrap h-auto gap-1"
            aria-label="Meetup sections"
          >
            <TabsTrigger value="slides" className="flex items-center gap-1.5">
              <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
              {t("meetupsPage.slides")}
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
              {t("meetupsPage.allResources")}
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              {t("meetupsPage.discussions")}
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
              {t("meetupsPage.leaderboard")}
            </TabsTrigger>
          </TabsList>

          {/* Slides tab */}
          <TabsContent value="slides">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {mockSlides.map((deck) => (
                <motion.div key={deck.id} variants={fadeInUp}>
                  <Card className="hover:shadow-sm transition-shadow">
                    <CardContent className="flex items-center justify-between gap-4 py-5">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Presentation className="w-5 h-5 text-primary" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm leading-snug">{deck.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {deck.presenter} &middot; {deck.slides} slides
                          </p>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="shrink-0">
                        <a href={deck.downloadUrl} download aria-label={`Download slides for ${deck.title}`}>
                          <Download className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                          Download
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Resources tab */}
          <TabsContent value="resources">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {mockResources.map((resource) => (
                <motion.div key={resource.id} variants={fadeInUp}>
                  <Card className="hover:shadow-sm transition-shadow">
                    <CardContent className="flex items-center justify-between gap-4 py-5">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center shrink-0">
                          <LinkIcon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm leading-snug">{resource.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Shared by {resource.sharedBy}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className="hidden sm:inline-flex">
                          {resource.type}
                        </Badge>
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${resource.title} in a new tab`}
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                            Open
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Discussions tab */}
          <TabsContent value="discussions">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {mockDiscussions.map((thread) => (
                <motion.div key={thread.id} variants={fadeInUp}>
                  <Card className="hover:shadow-sm transition-shadow cursor-pointer group" tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click(); }}>
                    <CardContent className="flex items-start gap-4 py-5">
                      <div
                        className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0 text-primary text-xs font-bold"
                        style={{ borderRadius: "var(--radius)" }}
                        aria-hidden="true"
                      >
                        {thread.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors leading-snug">
                          {thread.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs text-muted-foreground">{thread.author}</span>
                          <span className="text-xs text-muted-foreground">&middot;</span>
                          <span className="text-xs text-muted-foreground">{thread.time}</span>
                          <span className="text-xs text-muted-foreground">&middot;</span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageCircle className="w-3 h-3" aria-hidden="true" />
                            {thread.replies} replies
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Leaderboard tab */}
          <TabsContent value="leaderboard">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {mockLeaderboard.map((participant) => (
                <motion.div key={participant.rank} variants={fadeInScale}>
                  <Card
                    className={`transition-shadow ${participant.rank <= 3 ? "border-primary/20 bg-primary/5" : ""}`}
                  >
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="w-10 text-center shrink-0">
                        <RankMedal rank={participant.rank} />
                      </div>

                      <div
                        className="w-9 h-9 bg-muted flex items-center justify-center shrink-0 text-xs font-bold text-muted-foreground"
                        style={{ borderRadius: "var(--radius)" }}
                        aria-hidden="true"
                      >
                        {participant.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-sm text-foreground">{participant.name}</p>
                          {participant.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {participant.badge}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="font-bold text-foreground">{participant.points}</span>
                        <span className="text-xs text-muted-foreground ml-1">{t("meetupsPage.points")}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-8"
            >
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                    <Trophy className="w-4 h-4" aria-hidden="true" />
                    How points are earned
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>Attending a meetup — <span className="font-semibold text-foreground">+50 pts</span></li>
                    <li>Sharing a resource — <span className="font-semibold text-foreground">+20 pts</span></li>
                    <li>Starting a discussion — <span className="font-semibold text-foreground">+15 pts</span></li>
                    <li>Replying to a thread — <span className="font-semibold text-foreground">+5 pts</span></li>
                    <li>Presenting a talk — <span className="font-semibold text-foreground">+100 pts</span></li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>
    </SharedLayout>
  );
}
