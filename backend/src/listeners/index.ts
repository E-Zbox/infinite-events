export const emitEvents = {
  connection_success: "connection_success",
  event_room_error: "event_room_error",
  event_room_success: "event_room_success",
  join_event_rooms_success: "join_event_rooms_success",
};

export const onEvents = {
  connection: "connection",
  disconnect: "disconnect",
  join_event_rooms: "join_event_rooms",
};

export const constructRooms = {
  create_event_room: (eventId: string) => `event_${eventId}_room`,
};
