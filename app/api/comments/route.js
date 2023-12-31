import dbConnect from "@/libs/dbConnect";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

/* Todos los comentarios */
export const GET = async () => {
  await dbConnect();
  try {
    const comments = await Comment.find();
    console.log({ comments });

    return NextResponse.json(
      { comments },
      {
        headers: {
          "Cache-Control": "max-age=1",
          "CDN-Cache-Control": "max-age=6",
          "Vercel-CDN-Cache-Control": "max-age=3",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
};
