import dbConnect from "@/libs/dbConnect";
import User from "@/models/User";

const { NextResponse } = require("next/server");

export const GET = async (request, { params }) => {
  await dbConnect();
  try {
    const { id } = params;
    const user = await User.findById(id);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" }).status(500);
  }
};
