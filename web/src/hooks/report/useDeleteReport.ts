import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
interface IProps {
  id: string;
}

const deleteReport = async (data: IProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.REPORTS.DELETE_REPORT,
    method: "DELETE",
    data,
  });

  return res;
};

export default () => {
  return useMutation({
    mutationKey: ["deleteReport", "getReport"],
    mutationFn: deleteReport,
  });
};
