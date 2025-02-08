import { NextFunction, Request, Response } from "express";
// utils/config
import { checkForObjectKeys } from "@/utils/config/check";
// utils/errors
import { AdminError, RequestBodyError, RequestURLError } from "@/utils/errors";
// utils/generators
import { hashPassword, verifyPassword } from "@/utils/generators/bcrypt";
import { generateToken } from "@/utils/generators/jwt";
// utils/models
import { createAdmin, getAdmin } from "@/utils/models/admin";

export const signInAdminController = async (
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

    const { data, error, success } = await getAdmin({ email });

    if (!success) {
      throw new AdminError("Invalid credentials!");
    }

    const { _id, password: hashedPassword } = data;

    const isPasswordValid = verifyPassword(password, hashedPassword!);

    if (!isPasswordValid) {
      throw new AdminError("Invalid credentials!");
    }

    const token = generateToken({
      _id: _id!,
      email,
    });

    return res.status(200).json({ data: { token }, error, success });
  } catch (error) {
    next(error);
  }
};

export const signUpAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password: unhashedPassword } = req.body;

    const errorMessage = checkForObjectKeys(["email", "password"], req.body);

    if (errorMessage) {
      throw new RequestBodyError(errorMessage);
    }

    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      throw new RequestBodyError("Invalid email passed");
    }

    const password = hashPassword(unhashedPassword);

    const { data, error, success } = await createAdmin({
      email,
      password,
    });

    if (!success) {
      throw error;
    }

    const { createdAt, updatedAt } = data;

    return res.status(201).json({
      data: { email, createdAt, updatedAt },
      error,
      success,
    });
  } catch (error) {
    next(error);
  }
};
