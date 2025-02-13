import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";
import { IBlockedSlotsData } from "../../types";

const changeBlockStatus = async (data: IBlockedSlotsData) => {
  const response = await request({
    url: API_URLS.ADMIN_BOOKING.ADD_BLOCK,
    method: "POST",
    data,
  });
  return response;
};

export default () => {
  return useMutation({
    mutationKey: ["admin", "changeBlockStatus"],
    mutationFn: changeBlockStatus,
  });
};
