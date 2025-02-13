import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const getCustomPricingById = async (id: string) => {
  if (!id) return;
  const response = await request({
    url: `${API_URLS.ADMIN_CENTRE.CUSTOM_PRICE_BY_ID}/${id}`,
    method: "GET",
  });
  return response;
};

export default (id: string) => {
  return useQuery({
    queryKey: ["get custom pricing id", id],
    queryFn: () => getCustomPricingById(id),
  });
};
