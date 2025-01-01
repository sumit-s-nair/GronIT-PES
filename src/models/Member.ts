import mongoose, { Document, Schema } from "mongoose";

// Interface for the TeamMember
export interface TeamMember extends Document {
  _id: string;
  name: string;
  domain: string;
  image: Buffer;
  imageType: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: Date;
}

const teamMemberSchema = new Schema<TeamMember>(
  {
    name: { type: String, required: true },
    domain: { type: String, required: true },
    image: { type: Buffer, required: true },
    imageType: { type: String, required: true },
    socialLinks: {
      instagram: { type: String, required: false },
      linkedin: { type: String, required: false },
      github: { type: String, required: false },
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const TeamMemberModel =
  mongoose.models.TeamMember || mongoose.model<TeamMember>("TeamMember", teamMemberSchema);

export default TeamMemberModel;
