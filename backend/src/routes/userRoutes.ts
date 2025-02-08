import { Router } from "express";
// controllers
import {
  checkUsernameController,
  signInUserController,
  signUpUserController,
} from "@/controllers/userController";
// middlewares
import { verifyUserToken } from "@/middlewares/verifyToken";

export const userAuthRoutes = Router();

userAuthRoutes
  .post("/sign-in", signInUserController)
  .post("/sign-up", signUpUserController);

export const userRoutes = Router();

userRoutes.get("/:username/exists/", checkUsernameController);
