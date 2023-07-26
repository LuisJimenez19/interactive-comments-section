import dbConnect from "@/libs/dbConnect";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

/* Nuevo respuesta, el usuario que lo crea, el usuario a quien se le responde, y el comentario
al que se le añade una nueva repuesta */
export const POST = async (request, { params }) => {
  await dbConnect();
  try {
    const userId = params.id; //usuario que lo crea
    const data = await request.json();

    const newComment = {
      content: data.content,
      replyingTo: data.replyingTo,
      createAt: new Date(),
      score: 0,
      user: userId,
    };
    const res = await Comment.create(newComment);

    const updateComment = await Comment.findOneAndUpdate(
      { _id: data.commentId },
      { $push: { replies: res._id } }, // id del nuevo comentario
      { new: true }
    );
    return NextResponse.json({ data: updateComment });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
};

/* Eliminar */
export const PATCH = async (request, { params }) => {
  await dbConnect();
  try {
    const commentId = params.id; //usuario que lo crea
    const { commentParentId } = await request.json();
    console.log({ commentId, commentParentId });

    const updateComment = await Comment.findOneAndUpdate(
      { _id: commentParentId }, // comentario padre
      { $pull: { replies: commentId } }, // id del comentario respuesta
      { new: true }
    );
    const deleteComment = await Comment.findByIdAndDelete(commentId);

    return NextResponse.json({ data: updateComment });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
};
