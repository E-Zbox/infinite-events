import { Router } from "express";
// controllers
import {
  signInAdminController,
  signUpAdminController,
} from "@/controllers/adminController";
// middlewares
import { verifyAdminToken } from "@/middlewares/verifyToken";

export const adminAuthRoutes = Router();

adminAuthRoutes.post("/sign-in", signInAdminController);
// .post("/sign-up", signUpAdminController); don't uncomment and push to live
