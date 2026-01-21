import { getContactInfo, getSiteSettings } from "@/lib/sanity";
import { aicInfo } from "@/data/content";
import ContactPageClient from "./ContactPageClient";

export default async function ContactPage() {
  // Try to fetch from Sanity, fall back to hardcoded data
  let contactData;
  let siteSettings;

  try {
    const [cmsContact, cmsSettings] = await Promise.all([
      getContactInfo(),
      getSiteSettings(),
    ]);
    contactData = cmsContact;
    siteSettings = cmsSettings;
  } catch (error) {
    console.log("Using fallback data:", error);
  }

  // Merge CMS data with fallback
  const contact = {
    phone: contactData?.phone || aicInfo.phone,
    email: contactData?.email || aicInfo.email,
    address: {
      street: contactData?.address || aicInfo.address.street,
      suburb: contactData?.suburb || aicInfo.address.suburb,
      state: contactData?.state || aicInfo.address.state,
      postcode: contactData?.postcode || aicInfo.address.postcode,
      full: contactData
        ? `${contactData.address}, ${contactData.suburb} ${contactData.state} ${contactData.postcode}`
        : aicInfo.address.full,
    },
    openingHours: contactData?.openingHours || [],
  };

  const social = {
    facebook: siteSettings?.socialMedia?.facebook || aicInfo.socialMedia.facebook,
    instagram: siteSettings?.socialMedia?.instagram || aicInfo.socialMedia.instagram,
    youtube: siteSettings?.socialMedia?.youtube || aicInfo.socialMedia.youtube,
  };

  return <ContactPageClient contact={contact} social={social} />;
}
