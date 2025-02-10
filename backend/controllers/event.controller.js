import getDataUri from "../utils/datauri.js";
import { Eventt } from "../models/eventt.model.js";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      venue,
      date,
      time,
      rules,
      organizer,
      images,
      activity,
    } = req.body;

    const userId = req.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    if (user.role !== "organizer") {
      return res.status(404).json({
        message: "User is not an organizer",
        success: false,
      });
    }
    const file = req.file;
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    await Eventt.create({
      title,
      description,
      venue,
      date,
      time,
      rules,
      organizer,
      images: [cloudResponse?.secure_url],
      activity,
    });

    return res.status(201).json({
      message: "Event created successfully",
      success: true,
    });
  } catch (err) {
    console.log("Error in createEvent controller. Error: ", err);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const eventts = await Eventt.find();
    return res.status(200).json({
      eventts,
      success: true,
    });
  } catch (err) {
    console.log("Error in getEvents controller. Error: ", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventt = await Eventt.findById(eventId);
    if (!eventt) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    return res.status(200).json({
      eventt,
      success: true,
    });
  } catch (err) {
    console.log("Error in getEventById controller. Error: ", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const voteEvent = async (req, res) => {
  try {
    const { eventId, type } = req.params;
    const eventt = await Eventt.findById(eventId);
    if (!eventt) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }
    if (type === "up") {
      eventt.votes++;
    } else if (type === "down") {
      eventt.votes--;
    }
    await eventt.save();

    return res.status(200).json({
      message: "Event voted successfully",
      success: true,
    });
  } catch (err) {
    console.log("Error in voteEvent controller. Error: ", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
