import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ description: "Object describing Following" })
export class TFollowing {
  @Field((type) => ID)
  _id!: Types.ObjectId;
}

@ObjectType()
export class TFollowingsResponse {
  @Field((type) => [TFollowing!]!)
  data?: TFollowing[];

  @Field((type) => String)
  error!: string;

  @Field((type) => Boolean)
  success!: boolean;
}
