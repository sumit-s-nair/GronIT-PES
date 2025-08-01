import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { EventType } from "@/types";

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
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });
    
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
    const registrationStartDateString = formData.get("registrationStartDate")?.toString();
    const registrationEndDateString = formData.get("registrationEndDate")?.toString();
    const maxParticipantsString = formData.get("maxParticipants")?.toString();
    const currentParticipantsString = formData.get("currentParticipants")?.toString();
    const isRegistrationOpenString = formData.get("isRegistrationOpen")?.toString();
    const location = formData.get("location")?.toString();
    const eventType = formData.get("eventType")?.toString() as EventType;
    const tagsString = formData.get("tags")?.toString();
    const imageFile = formData.get("image") as File | null;

    if (!title || !content || !description || !registrationLink || !date) {
      return NextResponse.json(
        {
          message: "Required fields: title, content, description, registrationLink, date",
        },
        { status: 400 }
      );
    }

    // Get existing event
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!existingEvent) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Parse dates
    let eventDate: Date;
    let registrationStartDate: Date | null = null;
    let registrationEndDate: Date | null = null;

    try {
      eventDate = new Date(date);
      if (isNaN(eventDate.getTime())) throw new Error("Invalid event date");

      if (registrationStartDateString) {
        registrationStartDate = new Date(registrationStartDateString);
        if (isNaN(registrationStartDate.getTime())) throw new Error("Invalid registration start date");
      }

      if (registrationEndDateString) {
        registrationEndDate = new Date(registrationEndDateString);
        if (isNaN(registrationEndDate.getTime())) throw new Error("Invalid registration end date");
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid date format" },
        { status: 400 }
      );
    }

    // Parse other optional fields
    let maxParticipants: number | null = null;
    let currentParticipants: number | null = existingEvent.currentParticipants;
    let isRegistrationOpen = existingEvent.isRegistrationOpen;

    if (maxParticipantsString) {
      maxParticipants = parseInt(maxParticipantsString);
      if (isNaN(maxParticipants) || maxParticipants <= 0) {
        return NextResponse.json(
          { message: "Invalid max participants value" },
          { status: 400 }
        );
      }
    }

    if (currentParticipantsString) {
      currentParticipants = parseInt(currentParticipantsString);
      if (isNaN(currentParticipants) || currentParticipants < 0) {
        return NextResponse.json(
          { message: "Invalid current participants value" },
          { status: 400 }
        );
      }
    }

    if (isRegistrationOpenString) {
      isRegistrationOpen = isRegistrationOpenString === 'true';
    }

    // Parse tags
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag) : existingEvent.tags;

    let imageUrl = existingEvent.imageUrl;
    let imagePublicId = existingEvent.imagePublicId;

    // Handle image update
    if (imageFile) {
      // Delete old image from Cloudinary
      await deleteImage(existingEvent.imagePublicId);

      // Upload new image
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await uploadImage(imageBuffer, 'gronit/events');
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    // Update the event
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        content,
        description,
        registrationLink,
        date: eventDate,
        registrationStartDate,
        registrationEndDate,
        maxParticipants,
        currentParticipants,
        isRegistrationOpen,
        location,
        eventType: eventType || existingEvent.eventType,
        tags,
        imageUrl,
        imagePublicId,
      }
    });

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
