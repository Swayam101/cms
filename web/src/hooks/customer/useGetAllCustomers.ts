import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const getAllCustomers = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const response = await request({
    url: API_URLS.ADMIN.GET_ALL_CUSTOMERS,
    method: "GET",
    params: {
      page,
      limit,
      search,
    },
  });
  return response;
};

export default ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["court", "court_fetch", page, limit, search],
    queryFn: () => getAllCustomers({ page, limit, search }),
  });
};
