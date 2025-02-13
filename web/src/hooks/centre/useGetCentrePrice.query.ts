import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "../api-url/apiUrls";
import { request } from "../../services/axios.service";

interface IParams {
  bookingDate: string;
  centreId: string;
  type: string;
}

const get = async (params: IParams) => {
  const url = API_URLS.ADMIN_CENTRE.GET_CENTRE_PRICE;
  const res = await request({
    url,
    method: "GET",
    params: params,
  });
  return res;
};

export const useGetCenterPriceQuery = (params: IParams) => {
  return useQuery({
    queryKey: [
      "admin",
      "centre",
      "get-center-price",
      params.bookingDate,
      params.centreId,
      params.type,
    ],
    queryFn: () => get(params),
  });
};
