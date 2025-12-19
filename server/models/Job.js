import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending"
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract"],
      default: "full-time"
    },   // ✅ IMPORTANT COMMA HERE

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
