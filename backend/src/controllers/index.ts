import { NextFunction, Request, Response } from "express";
// errors
import {
  CategoryError,
  EnvironmentError,
  EventAttendeeError,
  EventCategoryError,
  EventError,
  FileUploadError,
  FollowingError,
  InvalidEmailError,
  InvalidEnumError,
  LocationError,
  MediaError,
  RequestBodyError,
  RequestURLError,
  TokenVerifierError,
  UserError,
  VirtualLocationError,
} from "@/utils/errors";

export const globalErrorController = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let statusCode = 500;
  let response = {
    data: null,
    error: "",
    success: false,
  };

  let error: any;

  if (typeof err === "string") {
    const [name, ...errArray] = String(err).split(":");

    error = {
      name,
      message: errArray.map((value) => value.trimStart()).join(":"),
      stack: err,
    };
  } else {
    error = {
      ...err,
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
  }

  switch (error.name) {
    case CategoryError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case EnvironmentError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case EventAttendeeError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case EventCategoryError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case EventError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case FileUploadError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case FollowingError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case InvalidEmailError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case InvalidEnumError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case "JsonWebTokenError":
      statusCode = 400;
      response.error = error.message;
      break;
    case LocationError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case MediaError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case RequestBodyError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case RequestURLError.name:
      statusCode = 404;
      response.error = error.message;
      break;
    case "SyntaxError":
      statusCode = 400;
      response.error = `SyntaxError: ${error.message}`;
      break;
    case TokenVerifierError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case UserError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    case VirtualLocationError.name:
      statusCode = 400;
      response.error = error.message;
      break;
    default:
      console.log("---");
      console.log(error.name);
      console.log("^^^^^^^^^^^^^^^^^^");
      console.log(error);
      response.error = "Something went wrong!!";
  }

  return res.status(statusCode).json({ ...response });
};

export const invalidRoutesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { method, originalUrl } = req;

  return next(
    new RequestURLError(`[ ${method} ] '${originalUrl}' was not found`)
  );
};

export const isAliveController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    return res
      .status(200)
      .json({ data: "Server is up✅", error: "", success: true });
  } catch (error) {
    next(error);
  }
};
