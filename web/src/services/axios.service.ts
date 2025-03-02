import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ENV } from "../env/index.env";
import ROUTES from "../enum/routes.enum";
import { IServerResponse } from "../interfaces/serverResponse.interface";

const client = axios.create({
  baseURL: ENV.VITE_APP_API,
});

export const request = async (options: AxiosRequestConfig<any>) => {
  const token = localStorage.getItem("token");
  client.defaults.headers.common.authorization = `Bearer ${token}`;
  const onSuccess = (response: AxiosResponse) =>
    ({
      ...response.data,
    } as IServerResponse);

  const onError = (error: any) => {
    if (error.response.status === 401) {
      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.replace(`${ROUTES.LOGIN}`);
      }
    }
    console.log("axios error  : ", error);

    return error.response.data as IServerResponse;
  };

  try {
    const res = await client({
      ...options,
    });
    return onSuccess(res);
  } catch (error) {
    return onError(error);
  }
};
