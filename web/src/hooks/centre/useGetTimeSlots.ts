import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

interface IProps {
  centerId: string;
  type: string;
  bookingDate: Date;
}

const getTimeSlots = async ({ bookingDate, centerId, type }: IProps) => {
  const response = await request({
    url: API_URLS.ADMIN_CENTRE.GET_SLOTS,
    method: "GET",
    params: {
      centerId,
      type,
      bookingDate,
    },
  });
  return response;
};

export default (timeSlotArgs: IProps) => {
  return useQuery({
    queryKey: ["centre", "center-time-slots", timeSlotArgs],
    enabled: !!(timeSlotArgs.centerId && timeSlotArgs.type),
    queryFn: () => getTimeSlots(timeSlotArgs),
  });
};
