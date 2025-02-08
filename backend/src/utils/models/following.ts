import { Types } from "mongoose";
// interfaces
import { IIDPayload, INumberGenericResponse } from "./interfaces";
import {
  ICreateFollowingPayload,
  IFollowingResponse,
  IFollowingsResponse,
  IGetFollowingsPayload,
} from "./interfaces/following";
// errors
import { FollowingError } from "../errors";
// models
import Following from "@/models/Following";

const { ObjectId } = Types;

export const createFollowing = async (
  payload: ICreateFollowingPayload
): Promise<IFollowingResponse> => {
  let response: IFollowingResponse = {
    data: {
      followerId: new ObjectId("0096100d95007d550608fcc0"),
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Following.create(payload);

    if (!result) {
      throw new FollowingError("Following creation failed!");
    }

    const { _id, followerId, userId, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        followerId,
        userId,
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

export const getFollowings = async (
  payload: IGetFollowingsPayload
): Promise<IFollowingsResponse> => {
  let response: IFollowingsResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const result = await Following.find(payload);

    if (!result) {
      throw new FollowingError(
        `Following with payload ${JSON.stringify(payload)} does not exist!`
      );
    }

    const data = result.map(
      ({ _id, followerId, userId, createdAt, updatedAt }) => ({
        _id,
        followerId,
        userId,
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

export const deleteFollowing = async (
  payload: IGetFollowingsPayload
): Promise<IFollowingResponse> => {
  let response: IFollowingResponse = {
    data: {
      followerId: new ObjectId("0096100d95007d550608fcc0"),
      userId: new ObjectId("0096100d95007d550608fcc0"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Following.findOneAndDelete({ ...payload });

    if (!result) {
      throw new FollowingError(
        `Following with payload ${JSON.stringify({
          ...payload,
        })} deletion failed!`
      );
    }

    const { _id, followerId, userId, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        followerId,
        userId,
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
