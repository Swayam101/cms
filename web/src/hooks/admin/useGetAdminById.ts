import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const getAdminById = async (id: string) => {
  if (!id) return;
  const response = await request({
    url: API_URLS.ADMIN.getAdminById(id),
    method: "GET",
  });
  return response;
};

export default (id: string) => {
  return useQuery({
    queryKey: ["Admin", id],
    queryFn: () => getAdminById(id),
  });
};
