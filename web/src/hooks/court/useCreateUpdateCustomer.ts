import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { ICustomerData } from "../../types";
import { API_URLS } from "../api-url/apiUrls";

const createCourt = async (data: Pick<ICustomerData, "name" | "phone">) => {
  const response = await request({
    url: API_URLS.ADMIN_COURT.CREATE_CUSTOMER,
    method: "POST",
    data: data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["admin", "create-court"],
    mutationFn: createCourt,
  });
};
