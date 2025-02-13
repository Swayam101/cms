import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

interface IProps {
  _id: string;
  note: string;
}

const cancel = async (data: IProps) => {
  const res = await request({
    url: API_URLS.BOOKINGS.CANCEL_BOOKING,
    method: "POST",
    data,
  });
  return res;
};

export const useCancelBookingMutation = () => {
  return useMutation({ mutationFn: cancel });
};
