import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  id: string;
  customerCount: number;
};
const assignUserCustomers = async (data: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.USERS.assignUserCustomers,
    method: "POST",
    data,
  });
  return res;
};

export const useAssignUserCustomers = () => {
  return useMutation({
    mutationKey: ["users", "assign-customers"],
    mutationFn: assignUserCustomers,
  });
};
