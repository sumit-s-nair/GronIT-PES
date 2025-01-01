import Event from "@/models/Event";
import connectDB from "@/lib/mongoDb";
import { auth } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

connectDB();

interface UpdatedEventFields {
  title?: string;
  content?: string;
  description?: string;
  image?: Buffer;
  date?: Date;
  registrationLink?: string;
  imageType?: string;
}

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// GET Handler for Events
export async function GET(req: NextRequest) {
  const eventId = req.nextUrl.searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json(
      { message: "Event ID is required in the URL" },
      { status: 400 }
    );
  }

  try {
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching event", error },
      { status: 500 }
    );
  }
}

// PATCH Handler for Events
export async function PATCH(req: NextRequest) {
  try {
    const eventId = req.nextUrl.searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required in the URL" },
        { status: 400 }
      );
    }

    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - Token is missing" },
        { status: 401 }
      );
    }

    const decodedToken = await auth.verifyIdToken(token);
    console.log("User editing event:", decodedToken.email);

    // Parse form data using FormData API
    const formData = await req.formData();

    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const description = formData.get("description")?.toString();
    const registrationLink = formData.get("registrationLink")?.toString();
    const date = formData.get("date")?.toString();
    const imageFile = formData.get("image") as File | null;

    if (!title || !content || !description || !registrationLink || !date) {
      return NextResponse.json(
        {
          message:
            "All fields (name, content, description, registrationLink, date) are required",
        },
        { status: 400 }
      );
    }

    const updatedFields: UpdatedEventFields = {
      title,
      content,
      description,
      registrationLink,
      date: new Date(date),
    };

    // Handle image upload
    if (imageFile) {
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const imageType = imageFile.type;

      updatedFields.image = imageBuffer;
      updatedFields.imageType = imageType;
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedFields, {
      new: true,
    });

    if (!updatedEvent) {
      return NextResponse.json(
        { message: "Event not found or could not be updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event updated successfully", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: "Failed to update event", error: (error as Error).message },
      { status: 500 }
    );
  }
}
