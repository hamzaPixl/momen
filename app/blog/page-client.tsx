"use client";

import { motion } from "motion/react";
import { SharedLayout } from "@/components/shared-layout";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/blog/post-card";
import { useTranslate } from "@/hooks/useTranslate";
import type { BlogPost } from "@/lib/blog";

interface BlogPageClientProps {
  posts: BlogPost[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const { t } = useTranslate();

  return (
    <SharedLayout>
      <PageHero
        label={t("blogPage.label")}
        headline={t("blogPage.headline")}
        description={t("blogPage.description")}
      />

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              {t("blogPage.noPosts")}
            </p>
          ) : (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Blog posts"
            >
              {posts.map((post) => (
                <motion.li key={post.slug} variants={cardVariants}>
                  <PostCard
                    post={post}
                    readMoreLabel={t("blogPage.readMore")}
                    readTimeLabel={t("blogPage.readTime")}
                  />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </section>
    </SharedLayout>
  );
}
