import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
import ROUTES from "../../enum/routes.enum";
import { store } from "../../app/store";
import { setAdminData } from "../../app/reducers/user-data/adminData-reducer";

const getAdminData = async (isUserProfile: boolean) => {
  const res: IServerResponse = await request({
    url: isUserProfile
      ? API_URLS.AUTH_ADMIN.USER_PROFILE
      : API_URLS.AUTH_ADMIN.getAdminData,
    method: "GET",
  });

  store.dispatch(setAdminData(res.data));
  if (res.status === "success" && window.location.pathname === ROUTES.LOGIN) {
    window.location.href = ROUTES.DASHBOARD;
  }
  return res;
};

export const useGetAdminData = (isUserProfile: boolean) => {
  return useQuery({
    queryKey: ["admin", "login"],
    queryFn: () => getAdminData(isUserProfile),
  });
};
