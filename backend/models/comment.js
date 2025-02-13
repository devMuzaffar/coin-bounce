import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    blog: { type: mongoose.SchemaType.ObjectId, ref: "blogs" },
    author: { type: mongoose.SchemaType.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", userSchema, "comments");
export default Comment;
