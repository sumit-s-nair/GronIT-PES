import Blog from "@/models/Blog";
import connectDB from "@/lib/mongoDb";
import { auth } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

connectDB();

interface UpdatedBlogFields {
  title?: string;
  content?: string;
  description?: string;
  image?: Buffer;
  imageType?: string;
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
    return NextResponse.json(
      { message: "Blog ID is required in the URL" },
      { status: 400 }
    );
  }

  try {
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blog", error },
      { status: 500 }
    );
  }
}

// PATCH method
export async function PATCH(req: NextRequest) {
  try {
    const blogId = req.nextUrl.searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required in the URL" },
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
    console.log("User editing blog:", decodedToken.email);

    // Parse form data using FormData API
    const formData = await req.formData();

    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const description = formData.get("description")?.toString();
    const author = decodedToken.name;
    const imageFile = formData.get("image") as File | null;

    if (!title || !content || !author || !description) {
      return NextResponse.json(
        {
          message:
            "All fields (title, content, author, description) are required",
        },
        { status: 400 }
      );
    }

    const updatedFields: UpdatedBlogFields = {
      title,
      content,
      description,
    };

    // Handle image upload
    if (imageFile) {
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const imageType = imageFile.type;

      updatedFields.image = imageBuffer;
      updatedFields.imageType = imageType;
    }

    // Update the blog post
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedFields, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        { message: "Blog not found or could not be updated" },
        { status: 404 }
      );
    }

    console.log("Blog updated successfully:", updatedBlog);

    return NextResponse.json(
      { message: "Blog updated successfully", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Failed to update blog", error: (error as Error).message },
      { status: 500 }
    );
  }
}
