import { NextFunction, Request, Response } from "express";
// utils/config
import { checkForObjectKeys } from "@/utils/config/check";
// utils/errors
import { RequestBodyError, RequestURLError, UserError } from "@/utils/errors";
// utils/generators
import { hashPassword, verifyPassword } from "@/utils/generators/bcrypt";
import { generateToken } from "@/utils/generators/jwt";
// utils/models
import { createUser, getUser } from "@/utils/models/user";

export const checkUsernameController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { username } = req.params;

    const { success } = await getUser({ username });

    return res
      .status(200)
      .json({ data: { usernameExists: success }, error: "", success: true });
  } catch (error) {
    next(error);
  }
};

export const signInUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    const errorMessage = checkForObjectKeys(["email", "password"], req.body);

    if (errorMessage) {
      throw new RequestBodyError(errorMessage);
    }

    const { data, error, success } = await getUser({ email });

    if (!success) {
      throw new UserError("Invalid credentials!");
    }

    const { _id, password: hashedPassword, username } = data;

    const isPasswordValid = verifyPassword(password, hashedPassword!);

    if (!isPasswordValid) {
      throw new UserError("Invalid credentials!");
    }

    const token = generateToken({
      _id: _id!,
      email,
    });

    return res.status(200).json({ data: { token, username }, error, success });
  } catch (error) {
    next(error);
  }
};

export const signUpUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password: unhashedPassword, username } = req.body;

    const errorMessage = checkForObjectKeys(
      ["email", "password", "username"],
      req.body
    );

    if (errorMessage) {
      throw new RequestBodyError(errorMessage);
    }

    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      throw new RequestBodyError("Invalid email passed");
    }

    const password = hashPassword(unhashedPassword);

    const { data, error, success } = await createUser({
      avatar: {
        path: null,
        publicId: null,
      },
      email,
      emailVerified: false,
      onlineStatus: false,
      password,
      username,
    });

    if (!success) {
      throw error;
    }

    const { createdAt, updatedAt } = data;

    return res.status(201).json({
      data: { email, username, createdAt, updatedAt },
      error,
      success,
    });
  } catch (error) {
    next(error);
  }
};
