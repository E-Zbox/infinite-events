import "reflect-metadata";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
// models
import { IFollowing } from "@/models/Following";
// typeDefs
import { TFollowing } from "@/typeDefs/following";

@Resolver((of) => TFollowing)
class FollowingResolver {}

export default FollowingResolver;
