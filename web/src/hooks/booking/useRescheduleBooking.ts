import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";
import { queryClient } from "../../client/queryClient";

interface IRescheduleBookingProps {
  data: {
    centerId: string;
    bookingDate: Date | string;
    bookingId: string;
    type?: string;
    bookingSlots: { slot: string; court: string; courtName: string }[];
  };
}
const rescheduleBooking = async ({ data }: IRescheduleBookingProps) => {
  const response = await request({
    url: API_URLS.ADMIN_BOOKING.RESCHEDUL_BOOKING,
    method: "POST",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["Reschedule", "booking"],
    mutationFn: rescheduleBooking,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
};
