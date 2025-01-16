import Member from "@/models/Member";
import connectDB from "@/lib/mongoDb";
import { auth } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

connectDB();

interface UpdatedMemberFields {
  name?: string;
  role?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  image?: Buffer;
  imageType?: string;
}

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// GET Handler for Team Members
export async function GET(req: NextRequest) {
  const memberId = req.nextUrl.searchParams.get("memberId");

  if (!memberId) {
    return NextResponse.json(
      { message: "Member ID is required in the URL" },
      { status: 400 }
    );
  }

  try {
    const member = await Member.findOne({ _id: memberId });
    if (!member) {
      return NextResponse.json({ message: "Member not found" }, { status: 404 });
    }

    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching member", error },
      { status: 500 }
    );
  }
}

// PATCH Handler for Team Members
export async function PATCH(req: NextRequest) {
  try {
    const memberId = req.nextUrl.searchParams.get("memberId");

    if (!memberId) {
      return NextResponse.json(
        { message: "Member ID is required in the URL" },
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
    console.log("User editing member:", decodedToken.email);

    // Parse form data using FormData API
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const role = formData.get("role")?.toString();
    const bio = formData.get("bio")?.toString();
    const twitter = formData.get("twitter")?.toString();
    const linkedin = formData.get("linkedin")?.toString();
    const github = formData.get("github")?.toString();
    const imageFile = formData.get("image") as File | null;

    if (!name || !role || !bio) {
      return NextResponse.json(
        {
          message: "Fields 'name', 'role', and 'bio' are required",
        },
        { status: 400 }
      );
    }

    const updatedFields: UpdatedMemberFields = {
      name,
      role,
      bio,
      socialLinks: { twitter, linkedin, github },
    };

    // Handle image upload
    if (imageFile) {
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const imageType = imageFile.type;

      updatedFields.image = imageBuffer;
      updatedFields.imageType = imageType;
    }

    // Update the member
    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      updatedFields,
      { new: true }
    );

    if (!updatedMember) {
      return NextResponse.json(
        { message: "Member not found or could not be updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Member updated successfully", member: updatedMember },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { message: "Failed to update member", error: (error as Error).message },
      { status: 500 }
    );
  }
}
