import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ENV } from "../env/index.env";
import { showNotification } from "@mantine/notifications";
import ROUTES from "../enum/routes.enum";
import { IServerResponse } from "../interfaces/serverResponse.interface";
import { store } from "../app/store";
import { ADMIN_ROLES } from "../enum/admin.enum";

const client = axios.create({
  baseURL: ENV.VITE_APP_API,
  withCredentials: true,
});

export const request = async (options: AxiosRequestConfig<any>) => {
  const onSuccess = (response: AxiosResponse) =>
    ({
      ...response.data,
    } as IServerResponse);

  const onError = (error: any) => {
    if (error.response.status >= 500) {
      showNotification({
        message:
          error.response?.data?.message ??
          "Something went wrong. Please try again.",
        color: "red",
      });
    } else if (error.response.status === 401) {
      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.replace(`${ROUTES.LOGIN}`);
      }
    }
    console.log("axios error  : ", error);

    return error.response.data as IServerResponse;
  };
  const role = store.getState().userData.userData.role;
  const isCentreManager = ADMIN_ROLES.CENTRE_MANAGER === role;

  try {
    const res = await client({
      ...options,
      url: isCentreManager
        ? options.url?.replace("/admin/", "/centre-manager/")
        : options.url,
    });
    return onSuccess(res);
  } catch (error) {
    return onError(error);
  }
};
