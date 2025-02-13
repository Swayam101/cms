import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

interface IChangeBlockProps {
  data: {
    centre: string;
    date: Date | string;
    slots: string[];
  };
}
const isSlotBooked = async ({ data }: IChangeBlockProps) => {
  const response = await request({
    url: API_URLS.ADMIN_BOOKING.SLOTS_BOOKED,
    method: "POST",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["Slot", "Booked"],
    mutationFn: isSlotBooked,
  });
};
