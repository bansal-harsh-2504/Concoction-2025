import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user/", userRouter);
app.use("/api/event/", eventRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
