import { Types } from "mongoose";
// interfaces
import { IIDPayload, INumberGenericResponse } from "./interfaces";
import {
  ICreateCategoryPayload,
  ICategoryResponse,
  IGetCategoryPayload,
  IUpdateCategoryPayload,
  IGetCategoriesPayload,
  ICategoriesResponse,
} from "./interfaces/category";
// errors
import { CategoryError } from "../errors";
// models
import Category from "@/models/Category";

const { ObjectId } = Types;

export const createCategory = async (
  payload: ICreateCategoryPayload
): Promise<ICategoryResponse> => {
  let response: ICategoryResponse = {
    data: {
      name: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Category.create(payload);

    if (!result) {
      throw new CategoryError("Category creation failed!");
    }

    const { _id, name, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        name,
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

export const createCategories = async (
  payload: ICreateCategoryPayload[]
): Promise<ICategoriesResponse> => {
  let response: ICategoriesResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const result = await Category.create(payload);

    if (!result) {
      throw new CategoryError("Category creation failed!");
    }

    const data = result.map(({ _id, name, createdAt, updatedAt }) => ({
      _id,
      name,
      createdAt,
      updatedAt,
    }));

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

export const getCategory = async (
  payload: IGetCategoryPayload
): Promise<ICategoryResponse> => {
  let response: ICategoryResponse = {
    data: {
      name: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Category.findOne({ ...payload });

    if (!result) {
      throw new CategoryError(
        `Category with payload ${JSON.stringify({
          ...payload,
        })} does not exist!`
      );
    }

    const { _id, name, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        name,
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

export const getCategories = async (
  payload: IGetCategoriesPayload[]
): Promise<ICategoriesResponse> => {
  let response: ICategoriesResponse = {
    data: [],
    error: "",
    success: false,
  };

  try {
    const result = await Category.find({ $or: payload });

    if (!result) {
      throw new CategoryError(
        `Category with payload ${JSON.stringify(payload)} does not exist!`
      );
    }

    const data = result.map(({ _id, name, createdAt, updatedAt }) => ({
      _id,
      name,
      createdAt,
      updatedAt,
    }));

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

export const updateCategory = async (
  { _id }: IGetCategoryPayload,
  updatePayload: IUpdateCategoryPayload
): Promise<ICategoryResponse> => {
  let response: ICategoryResponse = {
    data: {
      name: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Category.findOneAndUpdate(
      { _id },
      { ...updatePayload },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new CategoryError(
        `Category with payload ${JSON.stringify({ _id })} update failed!`
      );
    }

    const { name, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        name,
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

export const deleteCategory = async (
  payload: IGetCategoryPayload
): Promise<ICategoryResponse> => {
  let response: ICategoryResponse = {
    data: {
      name: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    error: "",
    success: false,
  };

  try {
    const result = await Category.findOneAndDelete({ ...payload });

    if (!result) {
      throw new CategoryError(
        `Category with payload ${JSON.stringify({
          ...payload,
        })} deletion failed!`
      );
    }

    const { _id, name, createdAt, updatedAt } = result;

    response = {
      data: {
        _id,
        name,
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
