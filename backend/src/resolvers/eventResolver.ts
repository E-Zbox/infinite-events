import { Types } from "mongoose";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
// .
import { IUserContext } from ".";
// @/app
import { userNamespace } from "@/app";
// models
import { MEDIA_PARENT_EVENT } from "@/models";
import { IEvent } from "@/models/Event";
// listeners
import { constructRooms, emitEvents } from "@/listeners";
// typeDefs
import { TCategory } from "@/typeDefs/category";
import { TEvent, TEventResponse, TEventsResponse } from "@/typeDefs/event";
import { TMedia } from "@/typeDefs/media";
import { TUser } from "@/typeDefs/user";
// utils/errors
import { EventError } from "@/utils/errors";
// utils/models
import { getCategories } from "@/utils/models/category";
import {
  getEvent,
  getEvents,
  getPastOrUpcomingEvents,
} from "@/utils/models/event";
import {
  createEventAttendee,
  getEventAttendee,
  getEventAttendees,
} from "@/utils/models/eventAttendee";
import { getEventCategories } from "@/utils/models/eventCategory";
import { getMedias } from "@/utils/models/media";
import { getUser, getUsers } from "@/utils/models/user";
import {
  EVENT_TIMELINE_PAST,
  EVENT_TIMELINE_UPCOMING,
} from "@/utils/models/interfaces/event";

const { ObjectId } = Types;

@Resolver((of) => TEvent)
class EventResolver {
  @FieldResolver(() => [TUser!]!)
  async attendees(@Root() root: IEvent) {
    const { _id: eventId } = root;

    const eventAttendees = await getEventAttendees({ eventId: eventId! });

    if (eventAttendees.data.length == 0) {
      return [];
    }

    const userIdsPayload = eventAttendees.data.map(({ userId }) => ({
      _id: userId,
    }));

    const { data } = await getUsers(userIdsPayload);

    return data;
  }

  @FieldResolver(() => TUser!)
  async author(@Root() root: IEvent) {
    const { userId } = root;

    const { data } = await getUser({ _id: userId });

    return data;
  }

  @FieldResolver(() => [TCategory!]!)
  async categories(@Root() root: IEvent) {
    const { _id: eventId, name } = root;

    const eventCategories = await getEventCategories([{ eventId: eventId }]);

    const payload = eventCategories.data.map(({ categoryId }) => ({
      _id: categoryId,
    }));

    const { data } = await getCategories(payload);

    return data;
  }

  @FieldResolver(() => [TMedia!]!)
  async media(@Root() root: IEvent) {
    const { _id: parentId } = root;

    const { data } = await getMedias({
      parentId: parentId!,
      parentType: MEDIA_PARENT_EVENT,
    });

    return data;
  }

  @FieldResolver(() => Boolean)
  async registered(@Root() root: IEvent, @Ctx() context: IUserContext) {
    const { _id: eventId } = root;
    const {
      user: { _id: userId },
    } = context;

    const { success } = await getEventAttendee({ eventId: eventId!, userId });

    return success;
  }

  @Mutation((returns) => TEventResponse)
  async registerForEvent(
    @Arg("eventId") _id: string,
    @Ctx() context: IUserContext
  ) {
    if (!context.user) {
      throw new EventError("Only User can perform this operation!");
    }
    const {
      user: { _id: userId },
    } = context;

    // check if eventExists
    const eventId = new ObjectId(_id);

    const eventExists = await getEvent({ _id: eventId });

    if (!eventExists.success) {
      throw eventExists.error;
    }

    const { data, error, success } = await createEventAttendee({
      eventId,
      inEvent: false,
      userId,
    });

    if (!success) {
      throw error;
    }

    const { create_event_room } = constructRooms;

    const { event_room_success } = emitEvents;

    const eventAttendees = await getEventAttendees({ eventId });

    userNamespace.to(create_event_room(`${eventId}`)).emit(event_room_success, {
      data: { eventId, totalAttendees: eventAttendees.data.length },
      error: "",
      success: true,
    });

    return eventExists;
  }

  // @Subscription({
  //   description: "Subscription for new Event",
  //   topics: [],
  // })
  // async eventNotification() {}
  @Query((returns) => TEventResponse)
  async getEvent(@Arg("_id") _id: string) {
    const eventId = new ObjectId(_id);

    return await getEvent({ _id: eventId });
  }

  @Query((returns) => TEventsResponse)
  async getEvents(@Arg("categoryId", { nullable: true }) _id: string) {
    if (_id) {
      const categoryId = new ObjectId(_id);

      const eventCategories = await getEventCategories([{ categoryId }]);

      const eventIds = eventCategories.data.map(({ eventId }) => ({
        _id: eventId,
      }));

      if (eventIds.length > 0) {
        const { data, error, success } = await getEvents(eventIds);

        return { data, error, success };
      }

      return { data: [], error: "", success: true };
    }
    return await getEvents([]);
  }

  @Query((returns) => TEventsResponse)
  async getEventsByCategoryIdAndTimeline(
    @Arg("categoryId") _id: string,
    @Arg("timeline", () => String)
    timeline: typeof EVENT_TIMELINE_PAST | typeof EVENT_TIMELINE_UPCOMING
  ) {
    let categoryId = null;

    if (_id) {
      categoryId = new ObjectId(_id);
    }

    const eventCategories = await getEventCategories([{ categoryId }]);

    const eventIds = eventCategories.data.map(({ eventId }) => ({
      _id: eventId,
    }));

    return await getPastOrUpcomingEvents({ _ids: eventIds, timeline });
  }
}

export default EventResolver;
