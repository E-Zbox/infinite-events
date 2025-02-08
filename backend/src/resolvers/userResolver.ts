import "reflect-metadata";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
// models
import { IUser } from "@/models/User";
// typeDefs
import { TFollowing } from "@/typeDefs/following";
import { TUser, TUserResponse } from "@/typeDefs/user";
// utils
import { getFollowings } from "@/utils/models/following";
import { TEventsResponse } from "@/typeDefs/event";
import { IUserContext } from ".";
import { getEvents } from "@/utils/models/event";
import { getEventAttendees } from "@/utils/models/eventAttendee";

@Resolver((of) => TUser)
class UserResolver {
  @FieldResolver(() => [TFollowing!]!)
  async followers(@Root() root: IUser) {
    const { _id } = root;

    const { data, error, success } = await getFollowings({ userId: _id! });

    return data;
  }
  @FieldResolver(() => [TFollowing!]!)
  async followings(@Root() root: IUser) {
    const { _id } = root;

    const { data, error, success } = await getFollowings({ followerId: _id! });

    return data;
  }

  @Query((returns) => TEventsResponse)
  async getMyEvents(@Ctx() context: IUserContext) {
    const {
      user: { _id: userId },
    } = context;
    return await getEvents([{ userId }]);
  }

  @Query((returns) => TEventsResponse)
  async getRSVPedEvents(@Ctx() context: IUserContext) {
    // get events a User has registered to attend
    const {
      user: { _id: userId },
    } = context;

    const eventsRegistered = await getEventAttendees({ userId });

    const payload = eventsRegistered.data.map(({ eventId }) => ({
      _id: eventId,
    }));

    return await getEvents(payload);
  }
}

export default UserResolver;
