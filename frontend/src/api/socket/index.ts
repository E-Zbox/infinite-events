export const emitEvents = {
  connect: "connect",
  connection_success: "connection_success",
  event_room_error: "event_room_error",
  event_room_success: "event_room_success",
  join_event_rooms_success: "join_event_rooms_success",
};

export const onEvents = {
  disconnect: "disconnect",
  join_event_rooms: "join_event_rooms",
};

export interface IEventRoom {
  eventId: string;
}

export interface IEventRoomAttendeeNotification {
  eventId: string;
  totalAttendees: number;
}
