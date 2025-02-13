import { notifications } from "@mantine/notifications";
import moment from "moment";
import { IBookingList } from "../types";

export interface ICourt {
  id: string;
  name: string;
}

export interface Slot {
  id: string;
  time: string;
  isBooked: boolean;
  court?: ICourt;
}

export const handleSlotClick = (
  slot: Slot,
  selectedSlots: Slot[],
  setSelectedSlots: React.Dispatch<React.SetStateAction<Slot[]>>,
  data?: IBookingList
) => {
  // Check if the slot is already selected
  const isSlotAlreadySelected = selectedSlots.some(
    (selectedSlot) => selectedSlot.id === slot.id
  );

  if (isSlotAlreadySelected) {
    // Remove the slot from selected slots
    const updatedSlots = selectedSlots.filter(
      (selectedSlot) => selectedSlot.id !== slot.id
    );
    setSelectedSlots(updatedSlots);
  } else {
    if (data && selectedSlots.length >= data.slots.length) {
      return notifications.show({
        message: "You can only select up to the available slots",
        title: "Selection Error",
        color: "red",
      });
    }

    // Add the new slot to the selected slots
    setSelectedSlots([...selectedSlots, slot]);
  }
};

export const isSlotSelected = (slot: Slot, selectedSlots: Slot[]): boolean => {
  return selectedSlots.some((selectedSlot) => selectedSlot.id === slot.id);
};

export const extractHourFromId = (id: string) => {
  const match = RegExp(/SLOT_(\d+)_(AM|PM)/).exec(id);
  if (!match) return -1;
  let hour = parseInt(match[1]);
  const period = match[2];
  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }
  return hour;
};

export function getStartAndEndTime(selectedSlots: Slot[]): {
  startTime: string;
  endTime: string;
} {
  const defaultTime = moment("00:00", "HH:mm").format("HH:mm");

  if (selectedSlots.length === 0) {
    return { startTime: defaultTime, endTime: defaultTime };
  }

  const sortedSlots = [...selectedSlots].sort((a, b) => {
    return convertToMoment(a.id).diff(convertToMoment(b.id));
  });

  const startTime = convertToMoment(sortedSlots[0].id).format("HH:mm");

  const lastSlot = sortedSlots[sortedSlots.length - 1];
  const duration = moment.duration(Number(lastSlot.time.charAt(0)), "hour");
  const endTime = convertToMoment(lastSlot.id).add(duration).format("HH:mm");

  return { startTime, endTime };
}

export function getSlotDuration(selectedSlots: string[]): string {
  if (selectedSlots.length === 0) {
    return "NA";
  }

  const sortedSlots = [...selectedSlots].sort((a, b) => {
    return convertToMoment(a).diff(convertToMoment(b));
  });

  const startTime = convertToMoment(sortedSlots[0]).format("hh:mm A");

  const lastSlot = sortedSlots[sortedSlots.length - 1];
  const duration = moment.duration(1, "hour");
  const endTime = convertToMoment(lastSlot).add(duration).format("hh:mm A");

  return startTime + " - " + endTime;
}

export const convertToMoment = (id: string): moment.Moment => {
  const timeParts = id.split("_");
  const hours = parseInt(timeParts[1], 10);

  if (timeParts[2] === "PM" && hours !== 12) {
    return moment(`${hours + 12}:00`, "HH:mm");
  } else if (timeParts[2] === "AM" && hours === 12) {
    return moment(`00:00`, "HH:mm");
  } else {
    return moment(`${hours}:00`, "HH:mm");
  }
};
