import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
interface IProps {
  id: string;
  reportType: string;
  centres: string[];
  emails: string;
}

const updateReport = async (data: IProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.REPORTS.UPDATE_REPORT,
    method: "POST",
    data,
  });

  return res;
};

export default () => {
  return useMutation({
    mutationKey: ["updateReport", "getReport", "addReport"],
    mutationFn: updateReport,
  });
};
