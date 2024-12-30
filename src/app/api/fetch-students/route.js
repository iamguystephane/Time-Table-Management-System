import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb-connect";
import User from "../../../../models/user";

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find({ status: "Student" });
    if (users.length > 0) {
      return NextResponse.json(users, { status: 202 });
    }
    return NextResponse.json({ message: "No students found" }, { status: 404 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error: ", error },
      { status: 501 }
    );
  }
}
