import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { EventType } from "@/types";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'desc'
      }
    });

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
    console.log("User creating event:", decodedToken.email);

    const formData = await req.formData();

    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const author = decodedToken.name;
    const description = formData.get("description")?.toString();
    const imageFile = formData.get("image") as File | null;
    const registrationLink = formData.get("registrationLink")?.toString();
    const dateString = formData.get("date")?.toString();
    const registrationStartDateString = formData.get("registrationStartDate")?.toString();
    const registrationEndDateString = formData.get("registrationEndDate")?.toString();
    const maxParticipantsString = formData.get("maxParticipants")?.toString();
    const location = formData.get("location")?.toString();
    const eventType = formData.get("eventType")?.toString() as EventType || EventType.ONLINE;
    const tagsString = formData.get("tags")?.toString();

    if (
      !title ||
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
            "Required fields: title, content, author, image, description, registrationLink, date",
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

    // Parse optional dates
    let registrationStartDate: Date | null = null;
    let registrationEndDate: Date | null = null;

    if (registrationStartDateString) {
      registrationStartDate = new Date(registrationStartDateString);
      if (isNaN(registrationStartDate.getTime())) {
        return NextResponse.json(
          { message: "Invalid registration start date format" },
          { status: 400 }
        );
      }
    }

    if (registrationEndDateString) {
      registrationEndDate = new Date(registrationEndDateString);
      if (isNaN(registrationEndDate.getTime())) {
        return NextResponse.json(
          { message: "Invalid registration end date format" },
          { status: 400 }
        );
      }
    }

    // Parse max participants
    let maxParticipants: number | null = null;
    if (maxParticipantsString) {
      maxParticipants = parseInt(maxParticipantsString);
      if (isNaN(maxParticipants) || maxParticipants <= 0) {
        return NextResponse.json(
          { message: "Invalid max participants value" },
          { status: 400 }
        );
      }
    }

    // Parse tags
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    // Upload image to Cloudinary
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadResult = await uploadImage(imageBuffer, 'gronit/events');

    const newEvent = await prisma.event.create({
      data: {
        title,
        content,
        author,
        description,
        registrationLink,
        imageUrl: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
        date,
        registrationStartDate,
        registrationEndDate,
        maxParticipants,
        location,
        eventType,
        tags,
      }
    });

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

    // Get event to delete image from Cloudinary
    const event = await prisma.event.findUnique({
      where: { id }
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Delete image from Cloudinary
    await deleteImage(event.imagePublicId);

    // Delete event from database
    const deletedEvent = await prisma.event.delete({
      where: { id }
    });

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
