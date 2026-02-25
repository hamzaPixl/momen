import { baseUrl } from "@/lib/config";
import type { Locale } from "@/lib/language-context";

interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
}

type PageKey = "home" | "contact" | "legal" | "privacy" | "about" | "services" | "blog" | "faq";

const seoData: Record<Locale, Record<PageKey, PageSeo>> = {
  en: {
    home: {
      title: "Momen meetup | A meetup social platform to elevate you",
      description: "A meetup social platform to elevate you",
      keywords: ["momen-meetup"],
    },
    about: {
      title: "About | Momen meetup",
      description: "Learn more about Momen meetup. Discover our team, mission, and values.",
      keywords: ["about momen-meetup", "momen-meetup team"],
    },
    services: {
      title: "Services | Momen meetup",
      description: "Explore the services offered by Momen meetup. A meetup social platform to elevate you",
      keywords: ["momen-meetup services"],
    },
    blog: {
      title: "Blog | Momen meetup",
      description: "Insights, news, and articles from Momen meetup.",
      keywords: ["momen-meetup blog", "momen-meetup articles"],
    },
    faq: {
      title: "FAQ | Momen meetup",
      description: "Frequently asked questions about Momen meetup and our services.",
      keywords: ["momen-meetup faq", "momen-meetup questions"],
    },
    contact: {
      title: "Contact | Momen meetup",
      description: "Get in touch with Momen meetup. We would love to hear from you.",
      keywords: ["contact momen-meetup"],
    },
    legal: {
      title: "Legal Notice | Momen meetup",
      description: "Legal notice of Momen meetup.",
      keywords: [],
    },
    privacy: {
      title: "Privacy Policy | Momen meetup",
      description: "Privacy policy and data protection of Momen meetup.",
      keywords: [],
    },
  },
  fr: {
    home: {
      title: "Momen meetup | A meetup social platform to elevate you",
      description: "A meetup social platform to elevate you",
      keywords: ["momen-meetup"],
    },
    about: {
      title: "A propos | Momen meetup",
      description: "Decouvrez Momen meetup. Notre equipe, notre mission et nos valeurs.",
      keywords: ["a propos momen-meetup", "equipe momen-meetup"],
    },
    services: {
      title: "Services | Momen meetup",
      description: "Decouvrez les services proposes par Momen meetup. A meetup social platform to elevate you",
      keywords: ["services momen-meetup"],
    },
    blog: {
      title: "Blog | Momen meetup",
      description: "Conseils, actualites et articles de Momen meetup.",
      keywords: ["blog momen-meetup", "articles momen-meetup"],
    },
    faq: {
      title: "FAQ | Momen meetup",
      description: "Questions frequemment posees sur Momen meetup et nos services.",
      keywords: ["faq momen-meetup", "questions momen-meetup"],
    },
    contact: {
      title: "Contact | Momen meetup",
      description: "Contactez Momen meetup. Nous serions ravis de vous entendre.",
      keywords: ["contact momen-meetup"],
    },
    legal: {
      title: "Mentions legales | Momen meetup",
      description: "Mentions legales de Momen meetup.",
      keywords: [],
    },
    privacy: {
      title: "Politique de confidentialite | Momen meetup",
      description: "Politique de confidentialite et protection des donnees de Momen meetup.",
      keywords: [],
    },
  },
  nl: {
    home: {
      title: "Momen meetup | A meetup social platform to elevate you",
      description: "A meetup social platform to elevate you",
      keywords: ["momen-meetup"],
    },
    about: {
      title: "Over ons | Momen meetup",
      description: "Ontdek Momen meetup. Ons team, onze missie en onze waarden.",
      keywords: ["over momen-meetup", "team momen-meetup"],
    },
    services: {
      title: "Diensten | Momen meetup",
      description: "Ontdek de diensten van Momen meetup. A meetup social platform to elevate you",
      keywords: ["diensten momen-meetup"],
    },
    blog: {
      title: "Blog | Momen meetup",
      description: "Inzichten, nieuws en artikelen van Momen meetup.",
      keywords: ["blog momen-meetup", "artikelen momen-meetup"],
    },
    faq: {
      title: "FAQ | Momen meetup",
      description: "Veelgestelde vragen over Momen meetup en onze diensten.",
      keywords: ["faq momen-meetup", "vragen momen-meetup"],
    },
    contact: {
      title: "Contact | Momen meetup",
      description: "Neem contact op met Momen meetup. We horen graag van u.",
      keywords: ["contact momen-meetup"],
    },
    legal: {
      title: "Juridische vermeldingen | Momen meetup",
      description: "Juridische vermeldingen van Momen meetup.",
      keywords: [],
    },
    privacy: {
      title: "Privacybeleid | Momen meetup",
      description: "Privacybeleid en gegevensbescherming van Momen meetup.",
      keywords: [],
    },
  },
};

export function getLocalizedMetadata(locale: Locale, page: PageKey): PageSeo {
  return seoData[locale]?.[page] ?? seoData.en[page];
}

export function getAlternateUrls(path: string) {
  const cleanPath = path === "/" ? "" : path;
  return {
    "en": `${baseUrl}${cleanPath}`,
    "fr": `${baseUrl}${cleanPath}`,
    "nl": `${baseUrl}${cleanPath}`,
    "x-default": `${baseUrl}${cleanPath}`,
  };
}
