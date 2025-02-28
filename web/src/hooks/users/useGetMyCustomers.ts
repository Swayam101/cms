import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  id: string;
  search: string;
  statusFilter?: string;
  freeTrial?: boolean;
  page?: number;
  limit?: number;
};
const getCustomerCount = async ({
  id,
  search,
  statusFilter,
  freeTrial,
  page,
  limit,
}: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.USERS.getMyCustomers,
    method: "GET",
    params: {
      id,
      search,
      status: statusFilter,
      freeTrial,
      page,
      limit,
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
