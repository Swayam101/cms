import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";

const logout = async (fcmToken: string | null) => {
  const res: IServerResponse = await request({
    url: API_URLS.AUTH_ADMIN.logout,
    method: "POST",
    data: { fcmToken },
  });

  return res;
};

export const useLogoutMutation = () => {
  return useMutation({ mutationKey: ["admin", "logout"], mutationFn: logout });
};
