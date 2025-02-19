import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";

type TProps = {
  id: string;
  status: string;
};
const updateStatus = async (data: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.USERS.updateCustomerStatus,
    method: "POST",
    data,
  });
  return res;
};

export const useUpdateCustomerStatus = () => {
  return useMutation({
    mutationKey: ["users", "status-customers"],
    mutationFn: updateStatus,
  });
};
