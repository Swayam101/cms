import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { ICustomerData } from "../../types";
import { API_URLS } from "../api-url/apiUrls";

const editCustomer = async (data: Pick<ICustomerData, "name" | "phone">) => {
  const response = await request({
    url: API_URLS.ADMIN.EDIT_CUSTOMER,
    method: "POST",
    data: data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["admin", "create-court"],
    mutationFn: editCustomer,
  });
};
