import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
import { IAdminForm } from "../../types";

const verifyCustomerData = async (data: IAdminForm) => {
  const res: IServerResponse = await request({
    url: API_URLS.ADMIN.VERIFY_CUSTOMER,
    method: "POST",
    data,
  });
  return res;
};

export const useverifyCustomerData = () => {
  return useMutation({
    mutationKey: ["admin", "verify"],
    mutationFn: verifyCustomerData,
  });
};
