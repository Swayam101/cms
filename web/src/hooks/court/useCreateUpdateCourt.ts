import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { ICourtForm } from "../../types";
import { API_URLS } from "../api-url/apiUrls";

const createCourt = async (formData: {
  courtData: ICourtForm;
  courtId: string;
}) => {
  const response = await request({
    url: API_URLS.ADMIN_COURT.GET_COURT,
    method: "POST",
    data: formData,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["admin", "create-court"],
    mutationFn: createCourt,
  });
};
