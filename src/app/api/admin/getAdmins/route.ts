import { NextResponse } from "next/server";
import { auth } from "@/lib/firebaseAdmin";
import { UserRecord } from "firebase-admin/auth";

export async function GET(req: Request) {
  try {
    // Get the token from the Authorization header
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(token);
    console.log('Request fetch users by user', decodedToken.email, decodedToken.name);

    // Fetch the list of all users
    const users: UserRecord[] = [];
    let nextPageToken: string | undefined = undefined;

    // Fetch users in pages, to handle pagination
    do {
      const userRecords = await auth.listUsers(1000, nextPageToken);
      users.push(...userRecords.users);
      nextPageToken = userRecords.pageToken;
    } while (nextPageToken);

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
