import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
import ROUTES from "../../enum/routes.enum";
import { store } from "../../app/store";
import { setAdminData } from "../../app/reducers/user-data/adminData-reducer";

const getAdminData = async () => {
  const response: IServerResponse = await request({
    url: API_URLS.AUTH_ADMIN.GET_ROLE,
    method: "GET",
  });
  if (response.status === "success") {
    store.dispatch(setAdminData(response.data));
  } else {
    return;
  }
  const res: IServerResponse = await request({
    url: API_URLS.AUTH_ADMIN.getAdminData,
    method: "GET",
  });
  store.dispatch(setAdminData(res.data));
  if (res.status === "success" && window.location.pathname === ROUTES.LOGIN) {
    window.location.href = ROUTES.DASHBOARD;
  }
  return res;
};

export const useGetAdminData = () => {
  return useQuery({
    queryKey: ["admin", "login"],
    queryFn: getAdminData,
  });
};
