import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
interface IProps {
  reportType: string;
  centres: string[];
  emails: string;
}

const addReport = async (data: IProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.REPORTS.ADD_REPORT,
    method: "POST",
    data,
  });

  return res;
};

export default () => {
  return useMutation({
    mutationKey: ["addReport", "getReport"],
    mutationFn: addReport,
  });
};
