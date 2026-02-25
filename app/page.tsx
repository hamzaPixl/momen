import type { Metadata } from "next";
import HomePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Momen meetup | A meetup social platform to elevate you",
  description: "A meetup social platform to elevate you",
};

export default function HomePage() {
  return <HomePageClient />;
}
