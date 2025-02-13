import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
import { INITIAL_VALUES } from "../../initial-values";

type LoginValues = typeof INITIAL_VALUES.LOGIN;

const login = async (data: LoginValues) => {
  const res: IServerResponse = await request({
    url: API_URLS.AUTH_ADMIN.login,
    method: "POST",
    data: { ...data, username: data.email },
  });

  return res;
};

export const useLoginMutation = () => {
  return useMutation({ mutationKey: ["admin", "login"], mutationFn: login });
};
