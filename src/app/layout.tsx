import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
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

const baseUrl = "https://shraddharehab.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    // 57 chars — Targets "Best De-Addiction Centre in Hyderabad" + Brand
    default: "Shraddha Rehab | Best De-Addiction Centre in Hyderabad",
    template: "%s | Shraddha Rehab",
  },
  description:
    "Looking for the best de-addiction centre near you in Hyderabad? Shraddha Rehab in Uppal offers 24/7 alcohol addiction treatment programmes & drug abuse care.",
  keywords: [
    // Brand & Typo Variations
    "Shraddha Rehab",
    "Sharddha Rehab",
    "Shradha Rehab",
    "Shraddha Rehabilitation Centre",
    "Shraddha De-addiction Center Uppal",
    // High-Volume Commercial & "Near Me" Keywords
    "Best De-addiction centres in Hyderabad",
    "Best De-addiction centres near me",
    "Alcohol addiction treatment programme",
    "Drug abuse treatment centers near me",
    "Alcohol abuse treatment center near me",
    "Best rehabilitation centre in Hyderabad",
    "Alcohol de-addiction centre near me",
    "Drug rehab center in Hyderabad",
    "Weed and ganja de-addiction centre Hyderabad",
    "Online betting and gambling addiction treatment Hyderabad",
    // Hyper-Local Hyderabad & Telangana Areas
    "Rehab centre in Uppal Hyderabad",
    "De-addiction centre near LB Nagar",
    "De-addiction centre near Secunderabad",
    "Rehab centre in Telangana",
    "D. Sreekanth Chary Shraddha Rehab",
  ],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Shraddha Rehabilitation Centre",
    title: "Shraddha Rehab | Best De-Addiction Centre in Hyderabad",
    description:
      "Top-rated alcohol addiction treatment programme and drug abuse treatment center in Uppal, Hyderabad. 24/7 medical detox & safe home pickup.",
    images: [
      {
        url: "/images/hero-statue.jpg",
        width: 1200,
        height: 630,
        alt: "Shraddha Rehabilitation Centre - Best De-Addiction Centre in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shraddha Rehab | Best De-Addiction Centre in Hyderabad",
    description:
      "24/7 Alcohol & Drug Abuse Treatment Center in Uppal, Hyderabad. Call +91 73969 89763.",
    images: ["/images/hero-statue.jpg"],
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. MedicalClinic + LocalBusiness Schema with "Near Me" GeoRadius & Service Catalog
  const medicalOrgSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "MedicalClinic", "LocalBusiness"],
    "@id": `${baseUrl}/#organization`,
    name: "Shraddha Rehabilitation Centre",
    alternateName: [
      "Shraddha Rehab",
      "Sharddha Rehab",
      "Shraddha De-Addiction Centre Hyderabad",
      "Best De-Addiction Centre in Uppal Hyderabad",
    ],
    description:
      "Leading alcohol addiction treatment programme and drug abuse treatment center in Uppal, Hyderabad, offering 24/7 medical detoxification, 12-Step A.A. rehabilitation, and safe home pickup.",
    url: baseUrl,
    telephone: ["+917396989763", "+919182489763"],
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: "D. Sreekanth Chary",
      jobTitle: "Founder & Senior Recovery Mentor",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "H.No. 1-89, Mallikarjuna Nagar, Parvathapur, Uppal",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500098",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.4065,
      longitude: 78.5983,
    },
    // Signals to Google "Near Me" searches across Hyderabad & Telangana
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "Place", name: "Uppal" },
      { "@type": "Place", name: "LB Nagar" },
      { "@type": "Place", name: "Dilsukhnagar" },
      { "@type": "Place", name: "Secunderabad" },
      { "@type": "Place", name: "ECIL" },
      { "@type": "Place", name: "Habsiguda" },
      { "@type": "Place", name: "Nacharam" },
      { "@type": "Place", name: "Boduppal" },
      { "@type": "Place", name: "Medipally" },
      { "@type": "Place", name: "Kukatpally" },
      { "@type": "City", name: "Warangal" },
      { "@type": "City", name: "Suryapet" },
      { "@type": "City", name: "Nalgonda" },
      { "@type": "State", name: "Telangana" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "De-Addiction & Rehabilitation Programmes",
      itemListElement: [
        {
          "@type": "MedicalTherapy",
          name: "Alcohol Addiction Treatment Programme",
          description:
            "24/7 medically supervised alcohol detoxification and 12-Step Alcoholics Anonymous (A.A.) residential rehabilitation.",
        },
        {
          "@type": "MedicalTherapy",
          name: "Drug Abuse Treatment Programme",
          description:
            "Comprehensive chemical, narcotic, opioid, and prescription drug abuse rehabilitation.",
        },
        {
          "@type": "MedicalTherapy",
          name: "Weed & Cannabis De-Addiction Programme",
          description:
            "Psychiatric stabilization and cognitive behavioural therapy for ganja/cannabis addiction and psychosis.",
        },
        {
          "@type": "MedicalTherapy",
          name: "Betting & Gambling Addiction Treatment",
          description:
            "Behavioural therapy and impulse-control rehabilitation for online cricket betting, rummy, and gambling addiction.",
        },
      ],
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.instagram.com/shraddha_rehab/",
      "https://www.justdial.com/Hyderabad/Shraddha-De-Addiction-Rehabilitation-Centre-Uppal",
    ],
  };

  // 2. FAQPage Schema so Shraddha Rehab captures expandable FAQ boxes on Google Page 1
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which is the best de-addiction centre in Hyderabad for alcohol and drug recovery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shraddha Rehabilitation Centre in Uppal, Hyderabad is widely trusted for its 24/7 medically supervised detox, A.A. 12-Step programme, and 13+ years of lived recovery mentorship by Founder D. Sreekanth Chary.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in your alcohol addiction treatment programme?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our alcohol addiction treatment programme includes safe 7–21 day medical detoxification, 30–90 day residential 12-Step rehabilitation, daily yoga and meditation, individual psychotherapy, and family counselling.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide safe home pickup if the patient refuses to visit the rehab centre?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide 24/7 safe, non-violent, medically supervised home pickup across all areas of Hyderabad and Telangana in unmarked vehicles to protect family privacy.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${lora.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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