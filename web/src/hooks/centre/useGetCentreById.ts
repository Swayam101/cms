import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const getCentreById = async (id: string) => {
  if (!id) return;
  const response = await request({
    url: `${API_URLS.ADMIN_CENTRE.GET_CENTRE_BY_ID}/${id}`,
    method: "GET",
    params: {
      id,
    },
  });
  return response;
};

export default (id: string) => {
  return useQuery({
    queryKey: ["create centre", id],
    queryFn: () => getCentreById(id),
  });
};
