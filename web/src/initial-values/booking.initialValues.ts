import { IBookingForm } from "../types";
import { Slot } from "../utils/slotSelectionLogic";

export const getBookingInitialValues = (
  data: IBookingForm = {}
): IBookingForm => {
  return {
    slotDate: data?.slotDate ?? "",
    slots:
      (data?.slots?.map((item) =>
        getFormateTime(item.id)
      ) as unknown as Slot[]) ?? [],
    startTime: data?.startTime ?? "",
    endTime: data?.endTime ?? "",
    playerName: data?.playerName ?? "",
    phoneNumber: data?.phoneNumber ?? "",
    paymentType: data?.paymentType,
  };
};

const getFormateTime = (time: string) =>
  `${time.split("_")[1]}:00 ${time.split("_")[2]}`;
