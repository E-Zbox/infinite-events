import { Types } from "mongoose";
// interfaces
import { IIDPayload, INumberGenericResponse } from "./interfaces";
import {
  ICreateUserPayload,
  IUserResponse,
  IGetUserPayload,
  IUpdateUserPayload,
  IUsersResponse,
} from "./interfaces/user";
// errors
import { UserError } from "../errors";
// models
import User from "@/models/User";

const { ObjectId } = Types;

export const createUser = async (
  payload: ICreateUserPayload
): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: {
      avatar: {
        path: "",
        publicId: "",
      },
      email: "",
      emailVerified: false,
      onlineStatus: false,
      password: "",
      socketId: null,
      username: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await User.create(payload);

    if (!result) {
      throw new UserError("User creation failed!");
    }

    const {
      _id,
      avatar,
      email,
      emailVerified,
      onlineStatus,
      password,
      socketId,
      username,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        avatar,
        email,
        emailVerified,
        onlineStatus,
        password,
        socketId,
        username,
        createdAt,
        updatedAt,
      },
      error: "",
      success: true,
    };
  } catch (error: any) {
    if (typeof error == "object" && error !== null) {
      if (
        error.message.includes(payload.email) &&
        error.message.includes("duplicate key error")
      ) {
        error = new UserError("Email is already taken!");
      }
      if (
        error.message.includes(payload.username) &&
        error.message.includes("duplicate key error")
      ) {
        error = new UserError("Username is already taken!");
      }
    }
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getUser = async (
  payload: IGetUserPayload
): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: {
      avatar: {
        path: "",
        publicId: "",
      },
      email: "",
      emailVerified: false,
      onlineStatus: false,
      password: "",
      socketId: null,
      username: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await User.findOne({ ...payload });

    if (!result) {
      throw new UserError(
        `User with payload ${JSON.stringify({ ...payload })} does not exist!`
      );
    }

    const {
      avatar,
      email,
      emailVerified,
      _id,
      onlineStatus,
      password,
      socketId,
      username,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        avatar,
        email,
        emailVerified,
        _id,
        onlineStatus,
        password,
        socketId,
        username,
        createdAt,
        updatedAt,
      },
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

export const getUsers = async (
  payload: IGetUserPayload[]
): Promise<IUsersResponse> => {
  let response: IUsersResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const result = await User.find({ $or: payload });

    if (!result) {
      throw new UserError(
        `User with payload ${JSON.stringify({ ...payload })} does not exist!`
      );
    }

    const data = result.map(
      ({
        avatar,
        email,
        emailVerified,
        _id,
        onlineStatus,
        password,
        socketId,
        username,
        createdAt,
        updatedAt,
      }) => ({
        avatar,
        email,
        emailVerified,
        _id,
        onlineStatus,
        password,
        socketId,
        username,
        createdAt,
        updatedAt,
      })
    );

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

export const updateUser = async (
  { _id }: IGetUserPayload,
  updatePayload: IUpdateUserPayload
): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: {
      avatar: {
        path: "",
        publicId: "",
      },
      email: "",
      emailVerified: false,
      onlineStatus: false,
      password: "",
      socketId: null,
      username: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await User.findOneAndUpdate(
      { _id },
      { ...updatePayload },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new UserError(
        `User with payload ${JSON.stringify({ _id })} update failed!`
      );
    }

    const {
      avatar,
      email,
      emailVerified,
      onlineStatus,
      password,
      socketId,
      username,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        avatar,
        email,
        emailVerified,
        onlineStatus,
        password,
        socketId,
        username,
        createdAt,
        updatedAt,
      },
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

export const deleteUser = async (
  payload: IGetUserPayload
): Promise<IUserResponse> => {
  let response: IUserResponse = {
    data: {
      avatar: {
        path: "",
        publicId: "",
      },
      email: "",
      emailVerified: false,
      onlineStatus: false,
      password: "",
      socketId: null,
      username: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await User.findOneAndDelete({ ...payload });

    if (!result) {
      throw new UserError(
        `User with payload ${JSON.stringify({
          ...payload,
        })} deletion failed!`
      );
    }

    const {
      _id,
      avatar,
      email,
      emailVerified,
      onlineStatus,
      password,
      socketId,
      username,
      createdAt,
      updatedAt,
    } = result;

    response = {
      data: {
        _id,
        avatar,
        email,
        emailVerified,
        onlineStatus,
        password,
        socketId,
        username,
        createdAt,
        updatedAt,
      },
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
