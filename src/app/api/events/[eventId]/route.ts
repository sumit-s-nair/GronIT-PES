import Event from "@/models/Event";
import connectDB from "@/lib/mongoDb";
import { auth } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import formidable, { Fields, Files } from "formidable";
import { IncomingMessage } from "http";
import fs from "fs";

connectDB();

interface UpdatedEventFields {
  name?: string;
  content?: string;
  description?: string;
  image?: Buffer;
  date?: Date;
  registrationLink?: string;
  imageType?: string;
}

interface EventModel {
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

interface ParsedForm {
  fields: Fields;
  files: Files;
}

// Disable the default body parser for multipart form data
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

  try {
    const decodedToken = await auth.verifyIdToken(token);
    console.log("User editing event:", decodedToken.email);

    // Parse the form data using formidable
    const form = new formidable.IncomingForm();
    const parsedForm: ParsedForm = await new Promise((resolve, reject) => {
      form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = parsedForm;
    const updatedFields: UpdatedEventFields = {};

    const name = fields.name?.toString();
    const content = fields.content?.toString();
    const description = fields.description?.toString();
    const registrationLink = fields.registrationLink?.toString();
    const date = fields.date?.toString();
    const imageFile = files.image as formidable.File | undefined;

    if (name) updatedFields.name = name;
    if (content) updatedFields.content = content;
    if (description) updatedFields.description = description;
    if (registrationLink) updatedFields.registrationLink = registrationLink;
    if (date) updatedFields.date = new Date(date);

    if (imageFile && imageFile.filepath) {
      const imageBuffer = fs.readFileSync(imageFile.filepath);
      updatedFields.image = imageBuffer;
      if (imageFile.mimetype) {
        updatedFields.imageType = imageFile.mimetype;
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return NextResponse.json(
        { message: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    const updatedEvent: EventModel | null = await Event.findByIdAndUpdate(
      eventId,
      updatedFields,
      { new: true }
    );

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
      { message: "Failed to update event", error },
      { status: 500 }
    );
  }
}
