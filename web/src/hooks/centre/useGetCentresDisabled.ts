import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

interface IProps {
  page: number;
  limit: number;
  search: string;
}

const getAllCentres = async ({ limit, page, search }: IProps) => {
  const response = await request({
    url: API_URLS.ADMIN_CENTRE.GET_CENTRES,
    method: "GET",
    params: {
      page,
      limit,
      search,
    },
  });
  return response;
};

export default (paginationArgs: IProps) => {
  return useQuery({
    queryKey: ["centre", "centre_fetch_disabled", paginationArgs.page],
    queryFn: () => getAllCentres(paginationArgs),
    enabled: false,
    refetchOnWindowFocus: false,
  });
};
