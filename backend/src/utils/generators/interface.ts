import { Types } from "mongoose";
import { IGenericResponse } from "../models/interfaces";

export interface ISignPayload {
  _id: Types.ObjectId;
  email: string;
}

export interface IVerifyToken {
  _id: Types.ObjectId;
  email: string;
  iat: number;
  exp: number;
}

export interface IVerifyTokenResponse extends IGenericResponse<IVerifyToken> {}
