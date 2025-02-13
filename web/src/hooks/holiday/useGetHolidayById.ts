import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";

const getHolidayById = async (id?: string) => {
  const res: IServerResponse = await request({
    url: API_URLS.HOLIDAY.getHoliday,
    method: "GET",
    params: { id },
  });
  return res;
};

export const useGetHolidayById = (id?: string) => {
  return useQuery({
    queryKey: ["getHolidayById"],
    queryFn: () => getHolidayById(id),
  });
};
