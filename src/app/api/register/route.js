import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb-connect";
import User from "../../../../models/user";
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const formData = await req.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const updatedData = {...formData, password: hashedPassword}
    await User.create(updatedData);
    return NextResponse.json({ message: "User registered!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user" },
      { status: 500 }
    );
  }
}
