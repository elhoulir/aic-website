import { getDonationCauses } from "@/sanity/lib/fetch";
import { SanityDonationCause } from "@/types/sanity";
import DonateContent from "./DonateContent";

export const metadata = {
  title: "Donate | Australian Islamic Centre",
  description: "Support our mission. Your generosity helps us maintain our centre, run educational programs, and support those in need.",
};

export default async function DonatePage() {
  const donationCauses = await getDonationCauses() as SanityDonationCause[];

  return <DonateContent donationCauses={donationCauses} />;
}
