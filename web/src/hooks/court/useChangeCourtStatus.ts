import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const updateCourtStatus = async (data: { id: string; status: boolean }) => {
  const response = await request({
    url: API_URLS.ADMIN_COURT.GET_COURT,
    method: "PATCH",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["court", "update-court-status"],
    mutationFn: updateCourtStatus,
  });
};
