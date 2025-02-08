import jwt from "jsonwebtoken";
import { Types } from "mongoose";
// errors
import { EnvironmentError } from "../errors";
// interface
import { ISignPayload, IVerifyTokenResponse } from "./interface";

const { SECRET_KEY } = process.env;

const { ObjectId } = Types;

export const generateToken = (payload: ISignPayload): string => {
  if (!SECRET_KEY) {
    throw new EnvironmentError(`Missing environment "SECRET_KEY"`);
  }
  const token = jwt.sign(payload, SECRET_KEY!, {
    expiresIn: "60 days",
  });

  return token;
};

export const verifyToken = (token: string): IVerifyTokenResponse => {
  let response: IVerifyTokenResponse = {
    data: {
      email: "",
      _id: new ObjectId("0096100d95007d550608fcc0"),
      iat: 0,
      exp: 0,
    },
    error: "",
    success: false,
  };

  try {
    if (!SECRET_KEY) {
      throw new EnvironmentError(`Missing environment "SECRET_KEY"`);
    }

    const data: any = jwt.verify(token, SECRET_KEY);

    if (typeof data == "string") {
      throw new Error("JwtPayload is string");
    }

    response = {
      data,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};
