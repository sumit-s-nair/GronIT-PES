import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEventRegistrationStatus } from "@/utils/eventUtils";

export async function GET(req: Request) {
  // Extract eventId from query parameters
  const url = new URL(req.url);
  const eventId = url.searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json(
      { message: "Missing eventId query parameter" },
      { status: 400 }
    );
  }

  try {
    // Fetch the event from the database
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Get registration status
    const registrationStatus = getEventRegistrationStatus(event);

    return NextResponse.json({ 
      event,
      registrationStatus 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching event registration status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
