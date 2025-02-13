import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const updateCentreStatus = async (data: { id: string; status: boolean }) => {
  const response = await request({
    url: API_URLS.ADMIN_CENTRE.CHANGE_STATUS,
    method: "POST",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["centre", "update-centre-status"],
    mutationFn: updateCentreStatus,
  });
};
