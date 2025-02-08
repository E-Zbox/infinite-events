import "reflect-metadata";
import { Types } from "mongoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@InputType({ description: "New Category data" })
export class AddCategoryInput {
  @Field((type) => String)
  name!: string;
}

@ObjectType({ description: "Object describing Category" })
export class TCategory {
  @Field((type) => ID)
  _id!: Types.ObjectId;

  @Field((type) => String)
  name!: string;
}

@ObjectType()
export class TCategoriesResponse {
  @Field((type) => [TCategory!]!)
  data!: TCategory[];

  @Field((type) => String)
  error!: string;

  @Field((type) => Boolean)
  success!: boolean;
}
