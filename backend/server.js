import express from "express";
import cors from "cors";
import { userRouter, eventRouter } from "./routes/export.routes.js";
import connectToMongoDB from "./utils/db.js";
import { User } from "./models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/user/", userRouter);
app.use("/api/event/", eventRouter);

// Health check
app.get("/health", async (req, res) => {
  try {
    await User.findOne({}, "_id").lean();
    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send("MongoDB connection failed");
  }
});

app.get("/", (req, res) => {
  res.send("API Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
