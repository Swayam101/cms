import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { ICentreForm } from "../../types";
import { API_URLS } from "../api-url/apiUrls";

const updateCentre = async (data: ICentreForm) => {
  const response = await request({
    url: API_URLS.ADMIN_CENTRE.UPDATE_CENTRE,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["update-centre"],
    mutationFn: updateCentre,
  });
};
