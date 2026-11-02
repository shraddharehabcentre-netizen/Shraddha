import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { siteConfig } from "@/config/siteConfig";

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

const baseUrl = siteConfig.brand.url || "https://shraddha-rehab.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default:
      "Shraddha Rehabilitation Centre | De-Addiction & Recovery Centre in Uppal, Hyderabad",
    template: "%s | Shraddha Rehabilitation Centre Hyderabad",
  },
  description:
    "Shraddha Rehabilitation Centre (Shraddha Rehab) in Uppal, Hyderabad offers 24/7 medically supervised alcohol & drug de-addiction, 12-Step A.A. recovery, and family counselling. Founded by D. Sreekanth Chary.",
  keywords: [
    "Shraddha Rehab",
    "Sharddha Rehab",
    "Shradha Rehab",
    "Shraddha Rehabilitation Centre",
    "Shraddha De-addiction Center Hyderabad",
    "Shraddha Rehab Uppal",
    "Rehab centre in Uppal Hyderabad",
    "De-addiction centre in Hyderabad",
    "Alcohol rehabilitation centre Hyderabad",
    "D. Sreekanth Chary Shraddha Rehab",
    "Best rehab center in Telangana",
    "12 step recovery center Hyderabad",
  ],
  authors: [{ name: "D. Sreekanth Chary - Shraddha Rehabilitation Centre" }],
  creator: "Shraddha Rehabilitation Centre",
  publisher: "Shraddha Rehabilitation Centre",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    siteName: "Shraddha Rehabilitation Centre",
    title:
      "Shraddha Rehabilitation Centre (Shraddha Rehab) | Uppal, Hyderabad",
    description:
      "24/7 Medically Supervised Alcohol & Substance De-Addiction Centre in Parvathapur, Uppal, Hyderabad. 100% Confidential Care & Assisted Pickup.",
    images: [
      {
        url: "/images/hero-statue.jpg",
        width: 1200,
        height: 630,
        alt: "Shraddha Rehabilitation Centre - Uppal, Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shraddha Rehabilitation Centre | De-Addiction Centre in Hyderabad",
    description:
      "Safe, dignified alcohol and drug rehabilitation in Uppal, Hyderabad. Call +91 73969 89763 for 24/7 confidential help.",
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
  // JSON-LD Structured Data for Google Local Pack & #1 Brand Search Ranking
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "LocalBusiness", "MedicalClinic"],
    name: "Shraddha Rehabilitation Centre",
    alternateName: [
      "Shraddha Rehab",
      "Sharddha Rehab",
      "Shradha Rehab",
      "Shraddha De-addiction Center",
      "Shraddha Rehab Uppal",
    ],
    description:
      "24/7 Medically Supervised Alcohol and Drug De-Addiction & Rehabilitation Centre in Uppal, Hyderabad, guided by Founder D. Sreekanth Chary.",
    url: baseUrl,
    telephone: ["+917396989763", "+919182489763"],
    email: siteConfig.contact.email,
    founder: {
      "@type": "Person",
      name: "D. Sreekanth Chary",
      jobTitle: "Founder",
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
    medicalSpecialty: [
      "Addiction Medicine",
      "Alcohol De-Addiction",
      "Substance Abuse Rehabilitation",
      "Psychiatric Counselling",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}