import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
// .
import { TAvatar } from "./avatar";

@ObjectType({ description: "Object describing Vendor" })
export class TUser {
  @Field((type) => ID)
  _id!: Types.ObjectId;

  @Field((type) => TAvatar)
  avatar!: TAvatar;

  @Field((type) => Boolean)
  onlineStatus!: boolean;

  @Field((type) => String)
  username!: string;
}

@ObjectType()
export class TUserResponse {
  @Field((type) => TUser, { nullable: true })
  data?: TUser;

  @Field((type) => String)
  error!: string;

  @Field((type) => Boolean)
  success!: boolean;
}

@ObjectType()
export class TUsersResponse {
  @Field((type) => [TUser!]!)
  data!: TUser[];

  @Field((type) => String)
  error!: string;

  @Field((type) => Boolean)
  success!: boolean;
}
