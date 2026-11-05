import type { Metadata } from "next";

export const metadata: Metadata = {
  // Renders as: "Alcohol & Drug Addiction Treatment | Shraddha Rehab" (51 chars)
  title: "Alcohol & Drug Addiction Treatment",
  description:
    "Comprehensive alcohol addiction treatment programme, drug abuse treatment, weed de-addiction & betting rehab in Uppal, Hyderabad. Call +91 73969 89763.",
  keywords: [
    "Alcohol addiction treatment programme",
    "Drug abuse treatment centers near me",
    "Alcohol abuse treatment center near me",
    "Weed addiction treatment Hyderabad",
    "Betting and gambling rehab Hyderabad",
    "12 step de-addiction programme Hyderabad",
  ],
  alternates: {
    canonical: "https://shraddharehab.in/programs",
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}