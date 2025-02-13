import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const getBlockedSlotById = async (id: string) => {
  if (!id) return;
  const response = await request({
    url: `${API_URLS.BOOKINGS.GET_BLOCKED_BY_ID}`,
    method: "GET",
    params: {
      id,
    },
  });
  return response;
};

export default (id: string) => {
  return useQuery({
    queryKey: ["block slot", id],
    queryFn: () => getBlockedSlotById(id),
  });
};
