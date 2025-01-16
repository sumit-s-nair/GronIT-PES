import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import TeamMember from "@/models/Member";

// Connect to MongoDB
connectDB();

export async function GET(req: Request) {
  // Extract the team member's _id from query parameters
  const url = new URL(req.url);
  const memberId = url.searchParams.get("memberId");

  if (!memberId) {
    return NextResponse.json(
      { message: "Missing memberId query parameter" },
      { status: 400 }
    );
  }

  try {
    // Fetch the team member from the database
    const member = await TeamMember.findOne({ _id: memberId });

    if (!member) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    console.error("Error fetching team member:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
