import express from "express";
import {
  register,
  login,
  logout,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
export default userRouter;
