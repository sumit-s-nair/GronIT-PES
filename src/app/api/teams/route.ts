import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export async function GET() {
  try {
    // Fetch all team members from the database
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(teamMembers, { status: 200 });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { message: "Failed to fetch team members" },
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
    console.log("User creating team member:", decodedToken.email);

    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const domain = formData.get("domain")?.toString();
    const imageFile = formData.get("image") as File | null;
    const socialLinksString = formData.get("socialLinks")?.toString();

    if (!name || !domain || !imageFile) {
      return NextResponse.json(
        {
          message: "All fields (name, domain, image) are required",
        },
        { status: 400 }
      );
    }

    // Parse social links
    let socialLinks = null;
    if (socialLinksString) {
      try {
        socialLinks = JSON.parse(socialLinksString);
      } catch (error) {
        return NextResponse.json(
          { message: "Invalid social links format" },
          { status: 400 }
        );
      }
    }

    // Upload image to Cloudinary
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadResult = await uploadImage(imageBuffer, 'gronit/team');

    const newTeamMember = await prisma.teamMember.create({
      data: {
        name,
        domain,
        imageUrl: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
        socialLinks,
      }
    });

    return NextResponse.json(
      {
        message: "Team member created successfully",
        teamMember: newTeamMember,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      {
        message: "Failed to create team member",
        error: (error as Error).message,
      },
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
    console.log("User deleting team member:", decodedToken.email);

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "Team member ID is required" },
        { status: 400 }
      );
    }

    // Get team member to delete image from Cloudinary
    const teamMember = await prisma.teamMember.findUnique({
      where: { id }
    });

    if (!teamMember) {
      return NextResponse.json(
        { message: "Team member not found" },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    await deleteImage(teamMember.imagePublicId);

    // Delete team member from database
    const deletedTeamMember = await prisma.teamMember.delete({
      where: { id }
    });

    return NextResponse.json(
      {
        message: "Team member deleted successfully",
        teamMember: deletedTeamMember,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { message: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
