import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";

const getBlockedSlotByCentreAndDate = async (centre: string, date: Date) => {
  const res: IServerResponse = await request({
    url: API_URLS.ADMIN_BOOKING.ALL_BLOCKED,
    method: "GET",
    params: { centre, date },
  });
  return res;
};

export default (centre: string, date: Date) => {
  return useQuery({
    queryKey: ["getBlockedSlotByCentreAndDate", centre, date.toString()],
    queryFn: () => getBlockedSlotByCentreAndDate(centre, date),
  });
};
