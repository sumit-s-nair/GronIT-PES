import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Event from "@/models/Event";

// Connect to MongoDB
connectDB();

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
    const event = await Event.findOne({ _id: eventId });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
