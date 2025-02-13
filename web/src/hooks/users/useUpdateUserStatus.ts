import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  id: string;
  status: boolean;
};
const updateUserStatus = async (data: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.USERS.changeStatus,
    method: "POST",
    data: { userId: data.id, status: data.status },
  });
  return res;
};

export const useUpdateUserStatus = () => {
  return useMutation({
    mutationKey: ["users", "status"],
    mutationFn: updateUserStatus,
  });
};
