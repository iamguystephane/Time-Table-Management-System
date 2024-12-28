import User from "../../../../models/user";
import connectMongoDB from "../../../../lib/mongodb-connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req) {
  const formData = await req.json();
  try {
    await connectMongoDB();
    const user = await User.findOne({
      email: formData.email,
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const isPasswordCorrect = await bcrypt.compare(
      formData.password,
      user.password
    );
    if (isPasswordCorrect) {
      return NextResponse.json(
        {
          user,
          message: "User found and returned to client",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Password is incorrect" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
