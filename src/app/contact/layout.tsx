import type { Metadata } from "next";

export const metadata: Metadata = {
  // Renders as: "24/7 De-Addiction Helpline Uppal | Shraddha Rehab" (49 chars)
  title: "24/7 De-Addiction Helpline Uppal",
  description:
    "Searching for an alcohol or drug abuse treatment center near you? Call Shraddha Rehab in Uppal, Hyderabad at +91 73969 89763 for 24/7 admission & pickup.",
  keywords: [
    "De-addiction helpline Hyderabad",
    "Alcohol abuse treatment center near me contact",
    "Drug abuse treatment centers near me phone number",
    "Rehab home pickup service Hyderabad",
  ],
  alternates: {
    canonical: "https://shraddharehab.in/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}