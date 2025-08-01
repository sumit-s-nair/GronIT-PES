import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

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
    const blog = await prisma.blog.findUnique({
      where: { id: blogId }
    });
    
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
    const imageFile = formData.get("image") as File | null;

    if (!title || !content || !description) {
      return NextResponse.json(
        {
          message: "All fields (title, content, description) are required",
        },
        { status: 400 }
      );
    }

    // Get existing blog
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId }
    });

    if (!existingBlog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    let imageUrl = existingBlog.imageUrl;
    let imagePublicId = existingBlog.imagePublicId;

    // Handle image update
    if (imageFile) {
      // Delete old image from Cloudinary
      await deleteImage(existingBlog.imagePublicId);

      // Upload new image
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await uploadImage(imageBuffer, 'gronit/blogs');
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    // Update the blog post
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        content,
        description,
        imageUrl,
        imagePublicId,
      }
    });

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
