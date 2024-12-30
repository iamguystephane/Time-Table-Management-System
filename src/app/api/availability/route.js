import connectMongoDB from "../../../../lib/mongodb-connect";
import availability from "../../../../models/availability";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.json();
    await connectMongoDB();
    const res = await availability.create(formData);
    if (res) {
      console.log("submitted successfully");
      return NextResponse.json(
        { message: "Submitted successfully" },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: "Could not submit availability" },
      { status: 401 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Error! Could not submit" },
      { status: 501 }
    );
  }
}
