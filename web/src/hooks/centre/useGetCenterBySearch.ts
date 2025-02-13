import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";

const getCenterBySearch = async (search: string, isCalender?: boolean) => {
  const res: IServerResponse = await request({
    url: API_URLS.ADMIN_CENTRE.CENTRE_SEARCH,
    method: "GET",
    params: { search, isCalender: isCalender ?? false },
  });
  return res;
};

export const useGetCenterBySearch = (search: string, isCalender?: boolean) => {
  return useQuery({
    queryKey: [
      "getCenterBySearch",
      search,
      isCalender ? "calender query" : "not calender query",
    ],
    enabled: true,
    queryFn: () => getCenterBySearch(search, isCalender),
  });
};
