import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  content: String,
  createAt: { 
    type: Date,
  },
  score: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // relación
  },
  replyingTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment", // referencia al mismo modelo
    },
  ],
});

const Comment = models.Comment || model("Comment", commentSchema);
export default Comment;
