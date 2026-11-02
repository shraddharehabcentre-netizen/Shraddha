import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { siteConfig } from "@/config/siteConfig";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
// Add these 2 imports at the top of src/app/layout.tsx:
import { Analytics } from "@vercel/analytics/react";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

const baseUrl = siteConfig.brand.url || "https://www.shraddharehab.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default:
      "Shraddha Rehabilitation Centre | De-Addiction & Recovery Centre in Uppal, Hyderabad",
    template: "%s | Shraddha Rehabilitation Centre Hyderabad",
  },
  description:
    "Shraddha Rehabilitation Centre (Shraddha Rehab) in Uppal, Hyderabad offers 24/7 medically supervised alcohol, drug, weed, and betting de-addiction, 12-Step A.A. recovery, and family counselling. Founded by D. Sreekanth Chary.",
  keywords: [
    "Shraddha Rehab",
    "Sharddha Rehab",
    "Shradha Rehab",
    "Shraddha Rehabilitation Centre",
    "Shraddha De-addiction Center Hyderabad",
    "Shraddha Rehab Uppal",
    "Alcohol rehabilitation centre Hyderabad",
    "Betting addiction treatment Hyderabad",
    "Weed de-addiction centre Hyderabad",
    "D. Sreekanth Chary Shraddha Rehab",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "LocalBusiness", "MedicalClinic"],
    name: "Shraddha Rehabilitation Centre",
    alternateName: [
      "Shraddha Rehab",
      "Sharddha Rehab",
      "Shradha Rehab",
      "Shraddha De-addiction Center",
    ],
    url: baseUrl,
    telephone: ["+917396989763", "+919182489763"],
    founder: {
      "@type": "Person",
      name: "D. Sreekanth Chary",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "H.No. 1-89, Mallikarjuna Nagar, Parvathapur, Uppal",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500098",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/shraddha_rehab/",
      "https://www.justdial.com/Hyderabad/Shraddha-De-Addiction-Rehabilitation-Centre-Uppal",
    ],
  };

  return (
    <html lang="en" className={`${lora.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-background text-ink-900 min-h-screen flex flex-col selection:bg-brand-100">
        <SiteConfigProvider>
          <AnalyticsTracker />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
        </SiteConfigProvider>
        <Analytics />
      </body>
    </html>
  );
}