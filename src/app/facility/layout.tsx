import type { Metadata } from "next";

export const metadata: Metadata = {
  // Renders as: "Rehab Facility in Uppal, Hyderabad | Shraddha Rehab" (51 chars)
  title: "Rehab Facility in Uppal, Hyderabad",
  description:
    "Tour our alcohol and drug abuse treatment center in Parvathapur, Uppal, Hyderabad. View our fellowship hall, homely dining & 5:30 AM–9:00 PM schedule.",
  keywords: [
    "Rehab centre in Uppal Hyderabad",
    "De-addiction facility near me",
    "Residential rehab schedule Hyderabad",
    "Shraddha Rehab Uppal photos",
  ],
  alternates: {
    canonical: "https://shraddharehab.in/facility",
  },
};

export default function FacilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}