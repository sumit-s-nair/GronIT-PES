"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Event {
  _id: string;
  name: string;
  content: string;
  author: string;
  description: string;
  registrationLink: string;
  image: Buffer;
  imageType: string;
  date: Date;
}

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(
            `/api/events/getEvent?eventId=${eventId}`,
            {
              method: "GET",
            }
          );
          if (!response.ok) {
            throw new Error("Event not found");
          }
          const data = await response.json();
          setEvent(data);
        } catch {
          setError("Failed to fetch event details");
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  // Handle error or event not found
  if (error || !event) {
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

  const imageDataURL = event.image
    ? `data:${event.imageType};base64,${Buffer.from(event.image).toString(
        "base64"
      )}`
    : "/assets/logo_black.png";

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Event Header */}
      <div className="relative w-full h-64 sm:h-96">
        <Image
          src={imageDataURL}
          alt={event.name}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-6">
          <h1 className="text-4xl font-bold">{event.name}</h1>
          <p className="text-gray-400 mt-2">{formattedDate}</p>
        </div>
      </div>

      {/* Event Content */}
      <div className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%]">
        <p className="text-gray-400 text-lg">{event.description}</p>
        <div className="mt-6 text-gray-300 leading-relaxed">
          {event.content}
        </div>
      </div>

      {/* Back to Events */}
      <div className="flex flex-col justify-center p-6 mx-auto gap-8">
        <Link
          href={event.registrationLink}
          className="px-6 py-3 bg-blue-500 text-center text-white rounded-lg"
        >
          Register Now
        </Link>
        <Link
          href="/events"
          className="px-6 py-3 bg-green-500 text-center text-white rounded-lg"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
};

export default EventDetailsPage;
