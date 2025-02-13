import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const deleteCentre = async (data: { id: string }) => {
  const response = await request({
    url: API_URLS.ADMIN_CENTRE.DELETE_CENTRE,
    method: "DELETE",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["delete-centre"],
    mutationFn: deleteCentre,
  });
};
