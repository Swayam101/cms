import { IBlockedSlotsForm } from "../types";

export const getBlockEventSlotsInitialValues = (
  data: IBlockedSlotsForm
): IBlockedSlotsForm => {
  return {
    centerId: data.centerId ?? "",
    courts: data.courts ?? [],
    bookingDate: data.bookingDate ?? new Date(),
    note: data.note ?? "",
    slots: data.slots ?? [""],
    endTime: data.endTime ?? [""],
    startTime: data.startTime ?? [""],
    blockedSlotId: data.blockedSlotId ?? "",
  };
};
