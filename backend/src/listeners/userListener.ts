import { DefaultEventsMap, Namespace, Socket } from "socket.io";
// listeners
import { constructRooms, emitEvents, onEvents } from ".";
// utils/models
import { getEventAttendees } from "@/utils/models/eventAttendee";

export default async (namespace: Namespace<DefaultEventsMap>) => {
  const { create_event_room } = constructRooms;

  const { connection_success, join_event_rooms_success } = emitEvents;

  const { connection, join_event_rooms } = onEvents;

  namespace.on(connection, async (socket: Socket) => {
    const {
      user: { _id: userId, email },
    } = socket.data;

    socket.emit(connection_success, {
      data: `Welcome, ${email.substring(0, 6)}... 👋`,
      error: "",
      success: true,
    });

    // join user to rooms for event that they RSVPed to
    const eventAttendees = await getEventAttendees({ userId });

    const eventRooms = eventAttendees.data.map(({ eventId }) => {
      socket.join(create_event_room(String(eventId)));

      return { eventId };
    });

    socket.emit(join_event_rooms_success, {
      data: eventRooms,
      error: "",
      success: true,
    });

    socket.on(join_event_rooms, async () => {
      // join user to rooms for event that they RSVPed to
      const eventAttendees = await getEventAttendees({ userId });

      const eventRooms = eventAttendees.data.map(({ eventId }) => {
        socket.join(create_event_room(String(eventId)));

        return { eventId };
      });
    });
  });
};
