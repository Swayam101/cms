import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { IServerResponse } from "../../interfaces/serverResponse.interface";
import { request } from "../../services/axios.service";
type TProps = {
  id: string;
};
const deleteAdmin = async ({ id }: TProps) => {
  const res: IServerResponse = await request({
    url: API_URLS.ADMIN.deleteAdmin,
    method: "POST",
    data: { userId: id },
  });
  return res;
};

export const useDeleteAdmin = () => {
  return useMutation({
    mutationKey: ["admin", "delete"],
    mutationFn: deleteAdmin,
  });
};
