import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";

const getHolidays = async () => {
  const res: IServerResponse = await request({
    url: API_URLS.HOLIDAY.holiday,
    method: "GET",
  });
  return res;
};

export const useGetHolidays = () => {
  return useQuery({
    queryKey: ["getHoliday", "addHoliday", "deleteholiday"],
    queryFn: () => getHolidays(),
  });
};
