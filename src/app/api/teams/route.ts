import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
import connectDB from "@/lib/mongoDb";
import TeamMember from "@/models/Member";

connectDB();

export async function GET() {
  try {
    // Fetch all team members from the database
    const teamMembers = await TeamMember.find();

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
    const socialLinks = formData.get("socialLinks")?.toString();
    const createdAt = new Date();

    if (!name || !domain || !imageFile) {
      return NextResponse.json(
        {
          message: "All fields (name, domain, role, image) are required",
        },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageType = imageFile.type;

    const newTeamMember = new TeamMember({
      name,
      domain,
      image: imageBuffer,
      imageType,
      socialLinks: JSON.parse(socialLinks || "{}"),
      createdAt,
    });

    await newTeamMember.save();

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

    const deletedTeamMember = await TeamMember.findByIdAndDelete(id);
    if (!deletedTeamMember) {
      return NextResponse.json(
        { message: "Team member not found" },
        { status: 404 }
      );
    }

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
