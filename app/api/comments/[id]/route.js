import dbConnect from "@/libs/dbConnect";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

/* Nuevo comentario */
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
    console.log(res._id);
    return NextResponse.json({ data: res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
};

/* traer Un comentario */
export const GET = async (resquest, { params }) => {
  await dbConnect();
  try {
    const { id } = params;
    const comments = await Comment.findById(id);
    return NextResponse.json({ comments });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
};

/* Eliminar */
export const DELETE = async (request, { params }) => {
  await dbConnect();
  try {
    const { id } = params;
    const res = await Comment.findByIdAndDelete(id);

    return NextResponse.json({ data: res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" });
  }
};

/* Actualizar tanto el contenido como el score */
export const PATCH = async (request, { params }) => {
  await dbConnect();
  try {
    const { id } = params;
    const data = await request.json();

    // const res = await Comment.findByIdAndUpdate(id, { content });

    const res = await Comment.findOneAndUpdate({ _id: id }, data); // si es undefined no se actualiza
 
    return NextResponse.json({ message: "Actualizado" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" }).status(500);
  }
};
