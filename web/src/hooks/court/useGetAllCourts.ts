import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const getAllCourts = async ({ centreId }: { centreId: string }) => {
  const response = await request({
    url: API_URLS.ADMIN_COURT.GET_ALL_COURTS,
    method: "GET",
    params: {
      centreId,
    },
  });
  return response;
};

export default (centreId: string) => {
  return useQuery({
    queryKey: ["court", "court_fetch", centreId],
    queryFn: () => getAllCourts({ centreId }),
  });
};
