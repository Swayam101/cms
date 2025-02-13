import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { ICustomPricingAddForm } from "../../types";
import { API_URLS } from "../api-url/apiUrls";

const createCustomPricing = async (data: ICustomPricingAddForm) => {
  const response = await request({
    url: API_URLS.ADMIN_CENTRE.CUSTOM_PRICING_ADD,
    method: "POST",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["admin", "create-centre"],
    mutationFn: createCustomPricing,
  });
};
