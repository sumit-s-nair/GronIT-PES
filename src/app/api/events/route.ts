import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
import connectDB from "@/lib/mongoDb";
import Event from "@/models/Event";

connectDB();

export async function GET() {
  try {
    const events = await Event.find();

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - Token is missing" },
        { status: 401 }
      );
    }

    const decodedToken = await auth.verifyIdToken(token);
    console.log("User creating blog:", decodedToken.email);

    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const content = formData.get("content")?.toString();
    const author = decodedToken.name;
    const description = formData.get("description")?.toString();
    const imageFile = formData.get("image") as File | null;
    const registrationLink = formData.get("registrationLink")?.toString();
    const dateString = formData.get("date")?.toString();

    if (
      !name ||
      !content ||
      !author ||
      !description ||
      !imageFile ||
      !registrationLink ||
      !dateString
    ) {
      return NextResponse.json(
        {
          message:
            "All fields (title, content, author, image, description, registrationLink, date) are required",
        },
        { status: 400 }
      );
    }

    // Parse the date from the formData
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageType = imageFile.type;

    const newEvent = new Event({
      name,
      content,
      author,
      description,
      registrationLink,
      image: imageBuffer,
      imageType,
      date,
    });

    await newEvent.save();

    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await auth.verifyIdToken(token);
    console.log("User deleting event:", decodedToken.email);

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event deleted successfully", event: deletedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { message: "Failed to delete event" },
      { status: 500 }
    );
  }
}
