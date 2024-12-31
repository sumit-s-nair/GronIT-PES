import mongoose, { Document, Schema } from "mongoose";

export interface Blog extends Document {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  image: Buffer;
  description: string;
  imageType: string;
}

const blogSchema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    image: { type: Buffer, required: true },
    imageType: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const BlogModel =
  mongoose.models.Blog || mongoose.model<Blog>("Blog", blogSchema);

export default BlogModel;
