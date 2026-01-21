import { getAllEvents } from "@/lib/sanity";
import { upcomingEvents } from "@/data/content";
import EventsPageClient from "./EventsPageClient";

export default async function EventsPage() {
  let events;

  try {
    const cmsEvents = await getAllEvents();
    if (cmsEvents && cmsEvents.length > 0) {
      // Transform CMS events to match expected format
      events = cmsEvents.map((event: {
        _id: string;
        title: string;
        description?: string;
        startDate: string;
        endDate?: string;
        location?: string;
        category?: string;
        image?: { asset?: { url?: string } };
        isRecurring?: boolean;
        recurrencePattern?: string;
      }) => ({
        id: event._id,
        title: event.title,
        description: event.description || "",
        date: event.startDate,
        time: new Date(event.startDate).toLocaleTimeString("en-AU", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        location: event.location || "Australian Islamic Centre",
        category: event.category || "Community",
        image: event.image?.asset?.url || "/images/aic 1.jpg",
        recurring: event.isRecurring || false,
        recurringDay: event.recurrencePattern,
      }));
    }
  } catch (error) {
    console.log("Using fallback events data:", error);
  }

  // Use CMS events or fallback to hardcoded
  const displayEvents = events && events.length > 0 ? events : upcomingEvents;

  return <EventsPageClient events={displayEvents} />;
}
