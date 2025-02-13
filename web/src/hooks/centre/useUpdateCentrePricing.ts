import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";
import { IPricingUpdateForm } from "../../types";

const updateCentrePricing = async (data: IPricingUpdateForm) => {
  const response = await request({
    url: API_URLS.ADMIN_CENTRE.UPDATE_PRICING,
    method: "POST",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["update-centre-pricing"],
    mutationFn: updateCentrePricing,
  });
};
