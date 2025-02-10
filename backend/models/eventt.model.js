import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    votes: {
      type: Number,
      default: 0,
    },
    activity: {
      type: [String],
      default: true,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ["prehistoric", "medieval", "future"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Eventt = mongoose.model("Eventt", eventSchema);
