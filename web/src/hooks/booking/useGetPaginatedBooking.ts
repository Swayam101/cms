import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

interface IProps {
  page?: number;
  limit?: number;
  search?: string;
}

const getPaginatedBooking = async ({ limit, page, search }: IProps) => {
  const response = await request({
    url: API_URLS.BOOKINGS.getPaginatedBooking,
    method: "GET",
    params: {
      page,
      limit,
      search,
    },
  });
  return response;
};

export default (data: IProps) => {
  return useQuery({
    queryKey: ["booking", "all", data],
    queryFn: () => getPaginatedBooking(data),
  });
};
