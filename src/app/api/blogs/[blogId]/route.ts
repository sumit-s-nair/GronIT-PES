import Blog from "@/models/Blog";
import connectDB from "@/lib/mongoDb";
import { auth } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import formidable, { Fields, Files } from "formidable";
import { IncomingMessage } from "http";

connectDB();

interface UpdatedBlogFields {
  title?: string;
  content?: string;
  description?: string;
  image?: Buffer;
  imageType?: string;
}

interface BlogModel {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  image: Buffer;
  description: string;
  imageType: string;
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

// GET method
export async function GET(req: NextRequest) {
  const blogId = req.nextUrl.searchParams.get("blogId");

  if (!blogId) {
    return NextResponse.json({ message: "Blog ID is required in the URL" }, { status: 400 });
  }

  try {
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching blog", error }, { status: 500 });
  }
}

// PATCH method
export async function PATCH(req: NextRequest) {
  const blogId = req.nextUrl.searchParams.get("blogId");

  if (!blogId) {
    return NextResponse.json({ message: "Blog ID is required in the URL" }, { status: 400 });
  }

  const token = req.headers.get("Authorization")?.split("Bearer ")[1];
  if (!token) {
    return NextResponse.json({ message: "Unauthorized - Token is missing" }, { status: 401 });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    console.log("User editing blog:", decodedToken.email);

    // Parse the form data using formidable
    const form = new formidable.IncomingForm();
    const parsedForm: ParsedForm = await new Promise((resolve, reject) => {
      form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = parsedForm;
    const updatedFields: UpdatedBlogFields = {};

    const title = fields.title?.toString();
    const content = fields.content?.toString();
    const description = fields.description?.toString();
    const imageFile = files.image as formidable.File | undefined;

    if (title) updatedFields.title = title;
    if (content) updatedFields.content = content;
    if (description) updatedFields.description = description;

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

    const updatedBlog: BlogModel | null = await Blog.findByIdAndUpdate(
      blogId,
      updatedFields,
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { message: "Blog not found or could not be updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ message: "Failed to update blog", error }, { status: 500 });
  }
}
