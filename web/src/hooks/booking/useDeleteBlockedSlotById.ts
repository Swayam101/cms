import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const deleteBlockedSlotById = async (id: string) => {
  const response = await request({
    url: `${API_URLS.BOOKINGS.DELETE_BLOCKED}`,
    method: "DELETE",
    data: { id },
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["delete-blocked-slot"],
    mutationFn: deleteBlockedSlotById,
  });
};
