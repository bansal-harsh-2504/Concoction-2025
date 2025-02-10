import express from "express";
import {
  createEvent,
  voteEvent,
  getEventById,
  getEvents,
} from "../controllers/event.controller.js";

import protectRoute from "../middleware/protectRoute.js";

const eventRouter = express.Router();

eventRouter.route("/create").post(protectRoute, createEvent);
eventRouter.route("/:eventId/:type").get(protectRoute, voteEvent);
eventRouter.route("/:eventId").get(getEventById);
eventRouter.route("/").get(getEvents);

export default eventRouter;
