import connectMongoDB from "../../../../lib/mongodb-connect";
import availability from "../../../../models/availability";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const users = await availability.find({});
    if (users.length > 0) {
      return NextResponse.json(users, { status: 201 });
    }
    return NextResponse.json(
      { message: "No lecturer availability has been submitted yet" },
      { status: 404 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error. Could not find users" },
      { status: 501 }
    );
  }
}
