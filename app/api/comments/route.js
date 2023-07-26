import Comment from "@/models/Comment";
import { NextResponse } from "next/server";


/* Todos los comentarios */
export const GET = async () => {
  try {
    const comments = await Comment.find();
    return NextResponse.json({ comments });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
};





