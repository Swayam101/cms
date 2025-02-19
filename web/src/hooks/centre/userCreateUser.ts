import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { IUserForm } from "../../types";
import { API_URLS } from "../api-url/apiUrls";

const createCenter = async (data: IUserForm) => {
  const response = await request({
    url: API_URLS.USERS.createUser,
    method: "POST",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["admin", "create-user"],
    mutationFn: createCenter,
  });
};
