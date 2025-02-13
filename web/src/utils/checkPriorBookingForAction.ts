import moment from "moment";

interface IData {
  slots: string[];
  bookingDate: string;
}

export const checkPriorBookingForAction = (data: IData) => {
  const sortedSlots = sortSlotsByTime(data.slots);
  const startSlotId = sortedSlots[0];
  const startHour = parseInt(startSlotId.split("_")[1]);
  const startPeriod = startSlotId.split("_")[2];
  let startTime = startHour;
  if (startPeriod === "PM" && startHour !== 12) {
    startTime += 12;
  } else if (startPeriod === "AM" && startHour === 12) {
    startTime = 0;
  }
  const dateBookingTime = moment(data.bookingDate)
    .hours(startTime)
    .minutes(0)
    .seconds(0)
    .subtract(2, "hours");

  return moment().isSameOrAfter(dateBookingTime);
};

const sortSlotsByTime = (slots: string[]) => {
  const getTimeIn24HourFormat = (slot: string) => {
    const [, hour, period] = slot.split("_");
    let time = parseInt(hour);

    if (period === "PM" && time !== 12) {
      time += 12;
    } else if (period === "AM" && time === 12) {
      time = 0;
    }

    return time;
  };

  return slots.sort(
    (a, b) => getTimeIn24HourFormat(a) - getTimeIn24HourFormat(b)
  );
};
