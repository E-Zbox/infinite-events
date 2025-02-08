import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TAvatar {
  @Field((type) => String, { nullable: true })
  path?: string;

  @Field((type) => String, { nullable: true })
  publicId?: string;
}
