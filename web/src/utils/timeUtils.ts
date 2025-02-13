import moment from "moment";

export function convertTo24HourFormat(time12h: string) {
  return moment(time12h, "hh:mm A").format("HH:mm");
}

export function convertTo12HourFormat(time24h: string) {
  return moment(time24h, "HH:mm").format("hh:mm A");
}
