import { Types } from "mongoose";
// .
import {
  IAdminResponse,
  ICreateAdminPayload,
  IGetAdminPayload,
} from "./interfaces/admin";
// errors
import { AdminError } from "../errors";
// models
import Admin from "@/models/Admin";

const { ObjectId } = Types;

export const createAdmin = async (
  payload: ICreateAdminPayload
): Promise<IAdminResponse> => {
  let response: IAdminResponse = {
    data: {
      _id: new ObjectId("0096100d95007d550608fcc0"),
      email: "",
      password: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Admin.create(payload);

    if (!result) {
      throw new AdminError("Admin creation failed!");
    }

    const { _id, email, password, createdAt, updatedAt } = result;

    response = {
      data: { _id, email, password, createdAt, updatedAt },
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

export const getAdmin = async (
  payload: IGetAdminPayload
): Promise<IAdminResponse> => {
  let response: IAdminResponse = {
    data: {
      _id: new ObjectId("0096100d95007d550608fcc0"),
      email: "",
      password: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Admin.findOne(payload);

    if (!result) {
      throw new AdminError(
        `Admin with payload ${JSON.stringify(payload)} does not exist!`
      );
    }

    const { _id, email, password, createdAt, updatedAt } = result;

    response = {
      data: { _id, email, password, createdAt, updatedAt },
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
