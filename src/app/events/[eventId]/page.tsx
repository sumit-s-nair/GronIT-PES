"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Sample data for demonstration (replace with real data fetching)
const events = [
  {
    id: "1",
    image: "https://via.placeholder.com/800x400",
    name: "Event 1",
    date: "2023-12-01",
    location: "Main Auditorium",
    description:
      "Join us for an insightful workshop on web development trends.",
    details: "This workshop will cover advanced topics in web development...",
    registerLink: "https://example.com/register/event-1",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/800x400",
    name: "Event 2",
    date: "2023-12-10",
    location: "Innovation Hub",
    description: "Explore the intersection of sustainability and technology.",
    details: "The event will feature key speakers from the tech industry...",
    registerLink: "https://example.com/register/event-2",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/800x400",
    name: "Event 3",
    date: "2023-12-20",
    location: "Virtual (Zoom)",
    description: "Master design principles for modern UI/UX.",
    details: "This session will include hands-on exercises and expert talks...",
    registerLink: "https://example.com/register/event-3",
  },
];

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams(); // Get the eventId from the URL

  // Find the event based on the eventId
  const event = events.find((e) => e.id === eventId);

  // Handle event not found
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link
          href="/events"
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Go Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Event Header */}
      <div className="relative w-full h-64 sm:h-96">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-6">
          <h1 className="text-4xl font-bold">{event.name}</h1>
          <p className="text-gray-400 mt-2">{event.date}</p>
          <p className="text-gray-400">{event.location}</p>
        </div>
      </div>

      {/* Event Content */}
      <div className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%]">
        <p className="text-gray-400 text-lg">{event.description}</p>
        <div className="mt-6 text-gray-300 leading-relaxed">
          {event.details}
        </div>
        {/* Register Button */}
        <div className="mt-8">
          <a
            href={event.registerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* Back to Events */}
      <div className="flex justify-center p-6">
        <Link
          href="/events"
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
};

export default EventDetailsPage;
