import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
import connectDB from "@/lib/mongoDb";
import Blog from "@/models/Blog";

connectDB();

export async function GET() {
  try {
    const blogs = await Blog.find();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    console.log("Token received:", token);

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - Token is missing" },
        { status: 401 }
      );
    }

    const decodedToken = await auth.verifyIdToken(token);
    console.log("User creating blog:", decodedToken.email);

    const formData = await req.formData();

    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const author = decodedToken.name;
    const description = formData.get("description")?.toString();
    const imageFile = formData.get("image") as File | null;

    if (!title || !content || !author || !description || !imageFile) {
      return NextResponse.json(
        {
          message:
            "All fields (title, content, author, image, description) are required",
        },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageType = imageFile.type;

    const newBlog = new Blog({
      title,
      content,
      author,
      description,
      image: imageBuffer,
      imageType,
    });

    await newBlog.save();
    console.log("Blog created successfully:", newBlog);

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { message: "Failed to create blog", error: (error as Error).message },
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
    console.log("User deleting blog:", decodedToken.email);

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    console.log(id);

    await Blog.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
