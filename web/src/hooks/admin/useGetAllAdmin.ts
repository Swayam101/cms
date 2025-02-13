import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  page: number;
  limit: number;
  sort?: object;
  search?: string;
};
const getAllAdmin = async ({ page, sort, search, limit }: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.ADMIN.getAllAdmin,
    method: "POST",
    data: { page, sort, search, limit },
  });
  return res;
};

export const useGetAllAdmin = (data: TProps) => {
  return useQuery({
    queryKey: ["admin", "all", data],
    queryFn: () => getAllAdmin(data),
  });
};
