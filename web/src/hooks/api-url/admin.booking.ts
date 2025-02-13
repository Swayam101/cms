import { prefix } from "./admin.auth.api";

export const bookingApis = {
  RESCHEDUL_BOOKING: prefix + "/reschedule-booking",
  getPaginatedBooking: prefix + "/get-booking",
  ADD_BOOKING: prefix + "/booking",
  ADD_BLOCK: prefix + "/slot/status",
  GET_BLOCK_SEARCH: prefix + "/slot/all",
  ALL_BLOCKED: prefix + "/slots/data",
  DELETE_BLOCKED: prefix + "/slots/delete",
  GET_BLOCKED_BY_ID: prefix + "/slot/one",
  SLOTS_BOOKED: prefix + "/slot/isBooked",
  CANCEL_BOOKING: prefix + "/cancel-booking",
};
