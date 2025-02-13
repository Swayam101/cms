import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";

const getBlockedSlotSearch = async (search: string, date: Date) => {
  const res: IServerResponse = await request({
    url: API_URLS.ADMIN_BOOKING.GET_BLOCK_SEARCH,
    method: "GET",
    params: { search, date },
  });
  return res;
};

export default (search: string, date: Date) => {
  return useQuery({
    queryKey: ["getBlockedSlotSearch", search, date.toString()],
    enabled: true,
    queryFn: () => getBlockedSlotSearch(search, date),
  });
};
