import mongoose, { Document, Schema } from "mongoose";

export interface Event extends Document {
  _id: string;
  title: string;
  content: string;
  author: string;
  description: string;
  registrationLink: string;
  image: Buffer;
  imageType: string;
  date: Date;
}

const eventSchema = new Schema<Event>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    registrationLink: { type: String, required: true },
    image: { type: Buffer, required: true },
    imageType: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const EventModel =
  mongoose.models.Event || mongoose.model<Event>("Event", eventSchema);

export default EventModel;
