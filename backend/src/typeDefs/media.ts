import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ description: "Object describing Media" })
export class TMedia {
  @Field((type) => ID)
  _id!: Types.ObjectId;

  @Field((type) => String)
  path!: string;

  @Field((type) => String)
  publicId!: string;
}
