import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { API_URLS } from "../api-url/apiUrls";

interface IProps {
  page: number;
  limit: number;
  startDate?: Date | null;
  endDate?: Date | null;
}

const getCustomPricingByCentre = async (
  id: string,
  { limit, page, startDate, endDate }: IProps
) => {
  if (!id) return;
  const response = await request({
    url: `${API_URLS.ADMIN_CENTRE.CUSTOM_PRICING}/${id}`,
    method: "POST",
    data: { page, limit, startDate, endDate },
  });
  return response.data;
};

export default (id: string, paginationProps: IProps) => {
  const { page, endDate, startDate } = paginationProps;
  return useQuery({
    queryKey: [
      "centre-custom-pricing",
      page,
      startDate?.toISOString(),
      endDate?.toISOString(),
      id,
    ],
    queryFn: () => getCustomPricingByCentre(id, paginationProps),
  });
};
