import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  id: string;
  status: boolean;
};
const updateAdminStatus = async (data: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.USERS.changeStatus,
    method: "POST",
    data: { adminId: data.id, status: data.status },
  });
  return res;
};

export const useUpdateAdminStatus = () => {
  return useMutation({
    mutationKey: ["admin", "status"],
    mutationFn: updateAdminStatus,
  });
};
