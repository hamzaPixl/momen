import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Blog | Momen meetup",
  description: "Tips, news, and insights about meetups and community building.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogPageClient posts={posts} />;
}
