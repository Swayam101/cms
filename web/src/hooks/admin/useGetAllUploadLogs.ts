import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  page: number;
  limit: number;
  // sort?: object;
  search?: string;
};
const getAllUploadLogs = async ({ page, search, limit }: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.ADMIN.GET_ALL_LOGS,
    method: "GET",
    params: { page, search, limit },
  });
  return res;
};

export const useGetAllUploadLogs = (data: TProps) => {
  return useQuery({
    queryKey: ["customers", "upload-logs", "all", data],
    queryFn: () => getAllUploadLogs(data),
  });
};
