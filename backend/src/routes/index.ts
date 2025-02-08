import { Request, Response, Router } from "express";
// controllers
import { isAliveController } from "@/controllers";

export const baseAPIURL = "/api";

export const baseGraphURL = "/graph";

export const indexRoutes = Router();

indexRoutes
  .get("/health", isAliveController)
  .get(`${baseAPIURL}/health`, isAliveController);
