import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb-connect";
import User from "../../../../models/user";

export async function POST(req) {
  const formData = await req.json();
  try {
    await connectMongoDB();
    const user = await User.findOne({ email: formData.email }).select(
      "_id, names"
    );
    console.log("user", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
