import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  id: string;
  search: string;
};
const getCustomerCount = async ({ id, search }: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.USERS.getMyCustomers,
    method: "GET",
    params: {
      id,
      search,
    },
  });
  return res;
};

export const useGetMyCustomers = (data: TProps) => {
  return useQuery({
    queryKey: ["user", "customers", "customer count", data],
    queryFn: () => getCustomerCount(data),
  });
};
