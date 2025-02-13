import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

const getAllCentres = async () => {
  const response = await request({
    url: API_URLS.ADMIN_CENTRE.GET_ALL_CENTRES,
    method: "GET",
  });
  return response;
};

export default () => {
  return useQuery({
    queryKey: ["getAllCentres"],
    queryFn: () => getAllCentres(),
  });
};
