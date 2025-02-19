import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  id: string;
};
const getCustomerCount = async ({ id }: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.USERS.getUserCustomers,
    method: "GET",
    params: {
      id,
    },
  });
  return res;
};

export const useGetUserCustomers = (data: TProps) => {
  return useQuery({
    queryKey: ["user", "customers", "customer count", data],
    queryFn: () => getCustomerCount(data),
  });
};
