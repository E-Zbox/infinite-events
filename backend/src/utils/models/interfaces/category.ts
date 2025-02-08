import { Types } from "mongoose";
import { IGenericResponse, RequireAtLeastOne } from ".";
// models
import { ICategory } from "@/models/Category";

export interface ICreateCategoryPayload {
  name: string;
}

export interface TCategoryPayload {
  _id?: Types.ObjectId;
  name?: string;
}

export type IGetCategoryPayload = RequireAtLeastOne<
  TCategoryPayload,
  "_id" | "name"
>;

export interface IGetCategoriesPayload {
  [name: string]: any;
}

export interface IUpdateCategoryPayload {
  name: string;
}

export interface ICategoryResponse extends IGenericResponse<ICategory> {}

export interface ICategoriesResponse extends IGenericResponse<ICategory[]> {}
