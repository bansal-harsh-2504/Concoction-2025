import { Eventt } from "../models/eventt.model.js";
import { User } from "../models/user.model.js";

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
      activity,
      category,
      images,
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
    await Eventt.create({
      title,
      description,
      venue,
      date,
      time,
      rules,
      organizer,
      images,
      activity,
      category,
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
    const { category } = req.query;
    const eventts = await Eventt.find({ category });
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
    const { eventId } = req.params;
    const { type } = req.body;
    const userId = req.id;

    const eventt = await Eventt.findById(eventId);
    if (!eventt) {
      return res.status(404).json({
        message: "Event not found",
        success: false,
      });
    }

    const userVoteIndex = eventt.voters.findIndex(
      (vote) => vote.userId.toString() === userId
    );

    if (type === "up") {
      if (userVoteIndex === -1) {
        eventt.votes++;
        eventt.voters.push({ userId, voteType: "up" });
      } else {
        return res.status(400).json({
          message: "You have already voted for this event",
          success: false,
        });
      }
    } else if (type === "down") {
      if (userVoteIndex === -1) {
        return res.status(400).json({
          message: "You haven't voted for this event yet",
          success: false,
        });
      } else {
        eventt.votes--;
        eventt.voters.splice(userVoteIndex, 1);
      }
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

export const registerForEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const eventt = await Eventt.findById(eventId);
    if (!eventt || !userId) {
      return res.status(404).json({
        message: "Event or user not found",
        success: false,
      });
    }
    if (eventt.registeredParticipants.includes(userId)) {
      return res.status(400).json({
        message: "User already registered for this event",
        success: false,
      });
    }

    eventt.registeredParticipants.push(userId);

    await eventt.save();
    return res.status(200).json({
      message: "Event registered successfully",
      success: true,
    });
  } catch (err) {
    console.log("Error in registerForEvent controller. Error: ", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
