import express from "express";
import {
  createEvent,
  voteEvent,
  getEventById,
  getEvents,
  registerForEvent,
} from "../controllers/event.controller.js";

import protectRoute from "../middleware/protectRoute.js";

const eventRouter = express.Router();

eventRouter.route("/create").post(protectRoute, createEvent);
eventRouter.route("/:eventId").get(getEventById);
eventRouter.route("/vote/:eventId").post(protectRoute, voteEvent);
eventRouter.route("/").get(getEvents);
eventRouter.route("/register").post(protectRoute, registerForEvent);
export default eventRouter;
