import { Router } from "express";
// controllers
import {
  createEventController,
  updateEventController,
} from "@/controllers/eventController";
// middlewares
import { uploadEventMedia } from "@/middlewares/uploadFiles";
import { verifyUserToken } from "@/middlewares/verifyToken";

const eventRoutes = Router();

eventRoutes.use([verifyUserToken]);

eventRoutes
  .post("/", uploadEventMedia.single("bannerImage"), createEventController)
  .post("/:eventId", updateEventController);

export default eventRoutes;
