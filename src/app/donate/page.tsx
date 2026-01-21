import { getDonationConfig } from "@/lib/sanity";
import { donationCauses, donationFrequencies, donationAmounts } from "@/data/content";
import DonatePageClient from "./DonatePageClient";

export default async function DonatePage() {
  let donationConfig;

  try {
    donationConfig = await getDonationConfig();
  } catch (error) {
    console.log("Using fallback donation config:", error);
  }

  // Transform CMS data or use defaults
  const causes = donationConfig?.donationCategories?.filter((c: { enabled?: boolean }) => c.enabled !== false)?.map((c: {
    id: string;
    name: string;
    description?: string;
    icon?: string;
  }) => ({
    id: c.id,
    title: c.name,
    description: c.description || "",
    icon: c.icon?.toLowerCase() || "heart",
  })) || donationCauses;

  const frequencies = donationConfig?.frequencies?.filter((f: { enabled?: boolean }) => f.enabled !== false)?.map((f: {
    id: string;
    label: string;
  }) => ({
    value: f.id,
    label: f.label,
  })) || donationFrequencies;

  const amounts = donationConfig?.suggestedAmounts?.map((a: { amount: number }) => a.amount) || donationAmounts;

  const bankDetails = donationConfig?.bankDetails || null;

  const impactStats = donationConfig?.impactStats || [
    { amount: 25, impact: "Provides meals for a family for a week" },
    { amount: 50, impact: "Sponsors a child's education for a month" },
    { amount: 100, impact: "Supports community programs" },
    { amount: 250, impact: "Contributes to facility maintenance" },
    { amount: 500, impact: "Funds a scholarship for a student" },
  ];

  return (
    <DonatePageClient
      causes={causes}
      frequencies={frequencies}
      amounts={amounts}
      bankDetails={bankDetails}
      impactStats={impactStats}
    />
  );
}
