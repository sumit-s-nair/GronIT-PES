import type { Metadata } from "next";
import "../../globals.css";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
};

// Fetch event details based on eventId
const fetchEvent = async (eventId: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const url = `${apiUrl}/api/events/getEvent?eventId=${eventId}`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error("Event not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch event details:", error);
    return null;
  }
};

// Dynamic metadata based on eventId
export async function generateMetadata(
  { params }: { params: Promise<{ eventId: string }> }
): Promise<Metadata> {
  const { eventId } = await params;

  const event = await fetchEvent(eventId); 

  // If the event is found, return dynamic metadata
  if (event) {
    const imageUrl = event.image
      ? `data:${event.imageType || "image/jpeg"};base64,${Buffer.from(
          event.image
        ).toString("base64")}`
      : "/assets/logo_black.png";

    return {
      title: event.title,
      description: event.description,
      openGraph: {
        title: event.title,
        description: event.description,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 400,
            alt: event.title,
          },
        ],
      },
    };
  }

  // Fallback to default metadata if no event is found
  return {
    title: "Event Details",
    description: "Discover upcoming events and register for them",
  };
}

export default async function EventDetailsLayout({
  children,
  params,
}: LayoutProps) {
  const { eventId } = await params;

  await fetchEvent(eventId);

  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
