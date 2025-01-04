import connectMongoDB from "../../../../lib/mongodb-connect";
import availability from "../../../../models/availability";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const formData = await req.json();
    await connectMongoDB();
    console.log(formData);
    const response = await availability.updateOne(
      { id: formData.id },
      { $set: formData }
    );
    if (response.modifiedCount > 0) {
      console.log("Updated successfully");
      return NextResponse.json(
        { message: "Availability updated successfully" },
        { status: 201 }
      );
    }
    if (response.matchedCount === 0) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    console.log("No changes were made");
    return NextResponse.json(
      { message: "No changes were made" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal server error");
    return NextResponse.json(
      { message: "Internal server error ", error },
      { status: 501 }
    );
  }
}

export async function DELETE(req) {
  try {
    const formData = await req.json();
    await connectMongoDB();
    const res = await availability.deleteOne({ id: formData.id });
    if (res.deletedCount > 0) {
      return NextResponse.json(
        { message: "Lecturer availability deleted successfully" },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: "Lecturer not found" },
      { status: 404 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 501 }
    );
  }
}
