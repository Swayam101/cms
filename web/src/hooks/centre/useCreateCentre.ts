import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { ICentreForm } from "../../types";
import { API_URLS } from "../api-url/apiUrls";

const createCenter = async (data: ICentreForm) => {
  const response = await request({
    url: API_URLS.ADMIN_CENTRE.CREATE_CENTRE,
    method: "POST",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["admin", "create-centre"],
    mutationFn: createCenter,
  });
};
