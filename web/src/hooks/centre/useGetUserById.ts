import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const getUserById = async (id: string) => {
  console.log("logging id : ", id);

  if (!id) return;
  const response = await request({
    url: `${API_URLS.ADMIN_USER.GET_USER_BY_ID}`,
    method: "GET",
    params: {
      id,
    },
  });
  return response;
};

export default (id: string) => {
  return useQuery({
    queryKey: ["create user", id],
    queryFn: () => getUserById(id),
  });
};
