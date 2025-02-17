import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    blog: { type: mongoose.SchemaTypes.ObjectId, ref: "Blog" },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema, "comments");
export default Comment;
