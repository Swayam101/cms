import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const deleteCourt = async (data: { id: string }) => {
  const response = await request({
    url: API_URLS.ADMIN_COURT.GET_COURT,
    method: "DELETE",
    data: { id: data.id },
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["delete-court"],
    mutationFn: deleteCourt,
  });
};
