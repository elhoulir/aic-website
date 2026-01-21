import { getServices, getContactInfo } from "@/lib/sanity";
import { aicInfo } from "@/data/content";
import ServicesPageClient from "./ServicesPageClient";

// Default services data
const defaultServices = [
  {
    id: "religious",
    title: "Religious Services",
    subtitle: "Comprehensive Islamic Guidance",
    description: "We provide comprehensive religious services including advice and guidance on all aspects of Islamic practice, ceremonies related to births, marriages, and deaths, and general religious consultation.",
    image: "/images/aic start.jpg",
    features: [
      "Religious advice and consultation",
      "Birth ceremonies and aqiqah",
      "Shahada (conversion) guidance",
      "General Islamic guidance",
    ],
    schedule: "Available by appointment",
    contact: aicInfo.email,
    icon: "BookOpen",
  },
  {
    id: "funeral",
    title: "Funeral Services",
    subtitle: "Compassionate Care",
    description: "During difficult times, we provide comprehensive and compassionate funeral services according to Islamic traditions, supporting families through the entire process with dignity and care.",
    image: "/images/aic end.jpg",
    features: [
      "Ghusl (ritual washing) services",
      "Janazah (funeral) prayers",
      "Burial arrangement assistance",
      "Grief counselling and support",
    ],
    schedule: "24/7 Emergency service available",
    contact: aicInfo.phone,
    icon: "HandHeart",
  },
  {
    id: "nikah",
    title: "Nikah Services",
    subtitle: "Islamic Marriage Ceremonies",
    description: "We provide complete Islamic marriage services including nikah ceremonies, official Islamic Law certificates, pre-marital counselling, and all necessary documentation for a blessed union.",
    image: "/images/aic 5.jpg",
    features: [
      "Traditional nikah ceremonies",
      "Official Islamic Law certificates",
      "Pre-marital counselling sessions",
      "Venue available for ceremonies",
    ],
    schedule: "By appointment",
    contact: aicInfo.email,
    icon: "Heart",
  },
  {
    id: "counselling",
    title: "Counselling & Support",
    subtitle: "Islamic Guidance & Care",
    description: "Our qualified counsellors provide confidential Islamic counselling for individuals and families, addressing spiritual, personal, and relationship challenges with compassion and wisdom.",
    image: "/images/aic 1.jpg",
    features: [
      "Individual counselling",
      "Family & marriage counselling",
      "Youth guidance and mentoring",
      "Confidential and supportive sessions",
    ],
    schedule: "By appointment",
    contact: aicInfo.email,
    icon: "Users",
  },
];

export default async function ServicesPage() {
  let services;
  let contactInfo;

  try {
    const [cmsServices, cmsContact] = await Promise.all([
      getServices(),
      getContactInfo(),
    ]);

    if (cmsServices && cmsServices.length > 0) {
      services = cmsServices.map((service: {
        _id: string;
        title: string;
        subtitle?: string;
        description: string;
        image?: { asset?: { url?: string } };
        features?: string[];
        schedule?: string;
        contactEmail?: string;
        contactPhone?: string;
        icon?: string;
      }) => ({
        id: service._id,
        title: service.title,
        subtitle: service.subtitle || "",
        description: service.description,
        image: service.image?.asset?.url || "/images/aic 1.jpg",
        features: service.features || [],
        schedule: service.schedule || "Contact for availability",
        contact: service.contactEmail || service.contactPhone || aicInfo.email,
        icon: service.icon || "BookOpen",
      }));
    }

    contactInfo = cmsContact;
  } catch (error) {
    console.log("Using fallback services data:", error);
  }

  const displayServices = services && services.length > 0 ? services : defaultServices;
  const phone = contactInfo?.phone || aicInfo.phone;

  return <ServicesPageClient services={displayServices} phone={phone} />;
}
