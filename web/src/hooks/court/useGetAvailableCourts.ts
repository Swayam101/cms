import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

interface IProps {
  centre: string;
  slots: string[];
  date: Date;
}

const getAvailableCourts = async (data: IProps) => {
  const response = await request({
    url: API_URLS.ADMIN_COURT.GET_AVAILABLE,
    method: "POST",
    data,
  });
  return response;
};

export default (data: IProps) => {
  return useQuery({
    queryKey: [
      "available-court-fetch",
      data.date,
      data.centre,
      data.slots.join("_"),
    ],
    queryFn: () => getAvailableCourts(data),
  });
};
