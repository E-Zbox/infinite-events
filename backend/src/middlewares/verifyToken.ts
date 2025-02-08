import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
// utils/errors
import { TokenVerifierError } from "@/utils/errors/index";
// utils/generators
import { verifyToken } from "@/utils/generators/jwt";
// utils/models
import { getAdmin } from "@/utils/models/admin";
import { getUser, updateUser } from "@/utils/models/user";

export const verifyAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [_, token] = String(req.headers["authorization"])?.split(" ");

    if (!token) {
      return next(new TokenVerifierError("Sign-in Admin and pass token"));
    }

    const { data, error, success } = verifyToken(token);

    if (!success) {
      return next(error);
    }

    const { _id, email } = data;

    const userExists = await getAdmin({ _id, email });

    if (!userExists.success) {
      return next(new TokenVerifierError("Invalid token for Admin"));
    }

    req.admin = { _id, email };

    return next();
  } catch (error) {
    next(error);
  }
};

export const verifyUserSocketToken = async (
  socket: Socket,
  next: (err?: any) => void
) => {
  try {
    const authorization = socket.handshake.headers["authorization"];

    if (!authorization) {
      throw new TokenVerifierError("Missing authorization headers");
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      throw new TokenVerifierError(`Sign-in User and pass token`);
    }

    const { data, error, success } = verifyToken(token);

    if (!success) {
      throw error;
    }

    const { _id, email } = data;
    const userExists = await getUser({ _id });

    if (!userExists.success) {
      throw userExists.error;
    }

    const updatedUser = await updateUser(
      { _id },
      { onlineStatus: true, socketId: socket.id }
    );

    if (!updatedUser.success) {
      throw updatedUser.error;
    }

    socket.data = {
      user: {
        _id,
        email,
      },
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [_, token] = String(req.headers["authorization"])?.split(" ");

    if (!token) {
      return next(new TokenVerifierError("Sign-in User and pass token"));
    }

    const { data, error, success } = verifyToken(token);

    if (!success) {
      return next(error);
    }

    const { _id, email } = data;

    const userExists = await getUser({ _id, email });

    if (!userExists.success) {
      return next(new TokenVerifierError("Invalid token for User"));
    }

    req.user = { _id, email };

    return next();
  } catch (error) {
    next(error);
  }
};
