import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

type TProps = {
  centerId?: string;
  dateRange?: [Date | null, Date | null];
};
const getDashboard = async (data: TProps) => {
  const response = await request({
    url: API_URLS.DASHBOARD.GET_DASHBOARD,
    method: "POST",
    data,
  });
  return response;
};

export default (data: TProps) => {
  return useQuery({
    queryKey: ["dashboard", data],
    queryFn: () => getDashboard(data),
  });
};
