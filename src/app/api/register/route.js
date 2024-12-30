import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb-connect";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const formData = await req.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const updatedData = { ...formData, password: hashedPassword };
    console.log(updatedData);
    const res = await User.create(updatedData);
    if (res) {
      console.log("user registered");
      return NextResponse.json(
        { message: "User registered!" },
        { status: 201 }
      );
    }
    console.log("could not register user");
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 501 }
    );
  } catch (error) {
    console.log('Internal server error')
    return NextResponse.json(
      { message: "An error occured while registering the user: ", error },
      { status: 500 }
    );
  }
}
