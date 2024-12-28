import type { Metadata } from "next";
import "../../globals.css";

// Sample event data for demonstration (replace with API call)
const events = [
  {
    id: "1",
    image: "https://via.placeholder.com/800x400",
    name: "Event 1",
    date: "2023-12-01",
    location: "Main Auditorium",
    description: "Join us for an insightful workshop on web development trends.",
    details: "This workshop will cover advanced topics in web development...",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/800x400",
    name: "Event 2",
    date: "2023-12-10",
    location: "Innovation Hub",
    description: "Explore the intersection of sustainability and technology.",
    details: "The event will feature key speakers from the tech industry...",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/800x400",
    name: "Event 3",
    date: "2023-12-20",
    location: "Virtual (Zoom)",
    description: "Master design principles for modern UI/UX.",
    details: "This session will include hands-on exercises and expert talks...",
  },
];

type Props = {
  params: Promise<{ eventId: string }>;
}

// Dynamic metadata based on eventId
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const eventId  = (await params).eventId;

  // Find the event based on the eventId
  const event = events.find((e) => e.id === eventId);

  // If the event is found, return dynamic metadata
  if (event) {
    return {
      title: event.name,
      description: event.description,
      openGraph: {
        title: event.name,
        description: event.description,
        images: [
          {
            url: event.image,
            width: 800,
            height: 400,
            alt: event.name,
          },
        ],
      },
    };
  }

  // Fallback to default metadata if no event is found
  return {
    title: "GronIT Events",
    description: "Green computing club of PES",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  console.log("Dynamic Route Params:", eventId);

  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
