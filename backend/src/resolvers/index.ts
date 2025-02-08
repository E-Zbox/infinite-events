import { Express } from "express";
import { Types } from "mongoose";

export interface IAdminContext {
  req: Express.Request;
  res: Express.Response;
  admin: {
    _id: Types.ObjectId;
    email: string;
  };
}

export interface IUserContext {
  req: Express.Request;
  res: Express.Response;
  user: {
    _id: Types.ObjectId;
    email: string;
  };
}
