import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";

const getReport = async () => {
  const res: IServerResponse = await request({
    url: API_URLS.REPORTS.GET_REPORT,
    method: "GET",
  });

  return res;
};

export default () => {
  return useQuery({
    queryKey: ["addReport", "getReport", "updateReport"],
    queryFn: () => getReport(),
  });
};
