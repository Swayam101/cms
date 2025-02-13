import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

interface IAddBookingProps {
  data: {
    centerId: string;
    type: string;
    bookingDate: Date | string;
    mobile: string;
    name: string;
    paymentType: string;
    bookingSlots: { slot: string; court: string; courtName: string }[];
  };
}
const addBooking = async ({ data }: IAddBookingProps) => {
  const response = await request({
    url: API_URLS.ADMIN_BOOKING.ADD_BOOKING,
    method: "POST",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["admin", "addBooking"],
    mutationFn: addBooking,
  });
};
