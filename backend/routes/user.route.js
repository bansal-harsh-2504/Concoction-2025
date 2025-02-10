import express from "express";
import {
  register,
  login,
  logout,
  getLoggedInStatus,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { singleUpload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/getLoggedInStatus").get(protectRoute, getLoggedInStatus);

export default userRouter;
