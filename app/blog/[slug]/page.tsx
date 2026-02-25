import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { PostHeader } from "@/components/blog/post-header";
import { SharedLayout } from "@/components/shared-layout";
import { MDXRemote } from "./mdx-remote";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Momen meetup`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SharedLayout>
      <article className="py-12 sm:py-16">
        <PostHeader
          post={post}
          backLabel="Back to blog"
          publishedLabel="Published on"
          byLabel="by"
          readTimeLabel="min read"
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-10">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-blockquote:border-primary prose-blockquote:text-muted-foreground
              prose-code:bg-muted prose-code:text-foreground prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
              prose-hr:border-border"
          >
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>
    </SharedLayout>
  );
}
