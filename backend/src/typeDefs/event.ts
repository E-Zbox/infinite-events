import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
// .
import { TAvatar } from "./avatar";

@ObjectType({ description: "Object describing Event" })
export class TEvent {
  @Field((type) => ID)
  _id!: Types.ObjectId;

  @Field((type) => TAvatar)
  banner!: TAvatar;

  @Field((type) => String)
  description!: string;

  @Field((type) => Date)
  endDate!: Date;

  @Field((type) => String)
  name!: string;

  @Field((type) => Number)
  price!: number;

  @Field((type) => Date)
  startDate!: Date;

  @Field((type) => Date)
  registrationDeadline!: Date;

  @Field((type) => String)
  type!: string;

  @Field((type) => Date)
  createdAt!: Date;

  @Field((type) => Date)
  updatedAt!: Date;
}

@ObjectType()
export class TEventResponse {
  @Field((type) => TEvent, { nullable: true })
  data?: TEvent;

  @Field((type) => String)
  error!: string;

  @Field((type) => Boolean)
  success!: boolean;
}

@ObjectType()
export class TEventsResponse {
  @Field((type) => [TEvent!]!)
  data!: TEvent[];

  @Field((type) => String)
  error!: string;

  @Field((type) => Boolean)
  success!: boolean;
}
