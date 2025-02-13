import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
export type THolidayCategory = "weekend" | "national holiday" | "festival";
interface IHoliday {
  id: string;
}

const deleteHoliday = async ({ id }: IHoliday) => {
  const res: IServerResponse = await request({
    url: API_URLS.HOLIDAY.holiday,
    method: "DELETE",
    data: { holidayId: id },
  });

  return res;
};

export const useDeleteHolidayMutation = () => {
  return useMutation({
    mutationKey: ["deleteholiday", "getHoliday"],
    mutationFn: deleteHoliday,
  });
};
