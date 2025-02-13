import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
export type THolidayCategory = "weekend" | "national holiday" | "festival";
interface IHoliday {
  data: {
    id?: string;
    date: Date;
    name: string;
    category: THolidayCategory;
  };
}

const addHoliday = async ({ data }: IHoliday) => {
  const res: IServerResponse = await request({
    url: API_URLS.HOLIDAY.holiday,
    method: "POST",
    data,
  });

  return res;
};

export const useAddHolidayMutation = () => {
  return useMutation({
    mutationKey: ["addHoliday", "getHoliday"],
    mutationFn: addHoliday,
  });
};
