import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const getCustomerById = async (id: string) => {
  const response = await request({
    url: API_URLS.ADMIN_COURT.GET_CUSTOMER,
    method: "GET",
    params: {
      id,
    },
  });
  return response;
};

export default (id: string) => {
  return useQuery({
    queryKey: ["get customer", id],
    queryFn: () => getCustomerById(id),
  });
};
