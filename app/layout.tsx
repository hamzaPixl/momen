import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { StructuredData } from "@/components/structured-data";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieBanner } from "@/components/cookie-banner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const baseUrl = "https://meetup.momen.be";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7c3aed",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Momen meetup | A meetup social platform to elevate you",
    template: "%s | Momen meetup",
  },
  description: "A meetup social platform to elevate you",
  keywords: ["momen-meetup"],
  authors: [{ name: "Momen meetup", url: baseUrl }],
  creator: "Momen meetup",
  publisher: "Momen meetup",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en",
    url: baseUrl,
    siteName: "Momen meetup",
    title: "Momen meetup | A meetup social platform to elevate you",
    description: "A meetup social platform to elevate you",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Momen meetup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momen meetup | A meetup social platform to elevate you",
    description: "A meetup social platform to elevate you",
    images: ["/og-image.png"],
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
  manifest: "/site.webmanifest",
  alternates: {
    canonical: baseUrl,
    languages: {
      "en": baseUrl,
      "x-default": baseUrl,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Analytics />
            <CookieBanner />
            <StructuredData />
            <BreadcrumbSchema />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
