import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { IUserForm } from "../../types";
import { API_URLS } from "../api-url/apiUrls";

const userUpdateUser = async (data: IUserForm) => {
  const response = await request({
    url: API_URLS.ADMIN_USER.UPDATE_USER,
    method: "POST",
    data: { ...data, name: data.username },
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: userUpdateUser,
  });
};
