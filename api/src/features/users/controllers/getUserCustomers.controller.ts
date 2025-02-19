import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerDaos from "../../customer/dao/customer.daos";

export default async (req: Request, res: Response) => {
  const { id, search } = req.query;
  const currentUserId = res.locals.userId;

  const userId = `${id?.toString()}`;

  const customers = await customerDaos.customer.getAllCustomers(
    {
      assignedTo: currentUserId ?? userId,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    },
    { page: 1, limit: 25 }
  );

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "CUSTOMER FETCH",
    message: "user customers fetched",
    data: {
      customers,
    },
  });
};
