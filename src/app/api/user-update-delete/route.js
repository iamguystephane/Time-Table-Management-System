import User from "../../../../models/user";
import connectMongoDB from "../../../../lib/mongodb-connect";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const formData = await req.json();
    await connectMongoDB();
    const res = await User.updateOne({ id: formData.id }, { $set: formData });
    if (res.modifiedCount > 0) {
      console.log("Updated successfully");
      console.log(formData)
      return NextResponse.json(
        { message: "User Updated successfully" },
        { status: 201 }
      );
    }
    if (res.matchedCount === 0) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("No changes were made");
    return NextResponse.json(
      { message: "No changes were made to the user" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 501 }
    );
  }
}

export async function DELETE(req) {
  try {
    const formData = await req.json();
    await connectMongoDB();
    console.log(formData)
    const res = await User.deleteOne({ id: formData.id });
    if (res.deletedCount > 0) {
      return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 501 }
    );
  }
}
