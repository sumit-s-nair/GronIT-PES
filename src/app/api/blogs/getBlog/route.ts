import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  // Extract blogId from query parameters
  const url = new URL(req.url);
  const blogId = url.searchParams.get("blogId");

  if (!blogId) {
    return NextResponse.json(
      { message: "Missing blogId query parameter" },
      { status: 400 }
    );
  }

  try {
    // Fetch the blog from the database
    const blog = await prisma.blog.findUnique({
      where: { id: blogId }
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
