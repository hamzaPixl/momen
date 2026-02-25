import type { Metadata } from "next";
import ContactPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Contact | Momen meetup",
  description: "Get in touch with the Momen meetup team.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
