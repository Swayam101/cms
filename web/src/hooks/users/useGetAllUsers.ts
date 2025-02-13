import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  page?: number;
  sort?: object;
  search?: string;
  limit?: number;
};
const getAllUser = async ({ page, sort, search, limit }: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.USERS.getAllUser,
    method: "POST",
    data: { page, sort, search, limit },
  });
  return res;
};

export const useGetAllUser = (data: TProps) => {
  return useQuery({
    queryKey: ["user", "all", data],
    queryFn: () => getAllUser(data),
  });
};
