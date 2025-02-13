import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
import { IAdminForm } from "../../types";

const uploadCustomerData = async (data: IAdminForm) => {
  const res: IServerResponse = await request({
    url: API_URLS.ADMIN.createOrUpdate,
    method: "POST",
    data,
  });
  return res;
};

export const useuploadCustomerData = () => {
  return useMutation({
    mutationKey: ["admin", "createOrUpdate"],
    mutationFn: uploadCustomerData,
  });
};
