import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerDaos from "../dao/customer.daos";

export default async (req: Request, res: Response) => {
  const { page, limit, search } = req.query;
  const customers = await customerDaos.customer.getAllCustomers(
    {
      $or: [
        { name: { $regex: search ?? "", $options: "i" } },
        { phone: { $regex: search ?? "", $options: "i" } },
      ],
    },
    {
      limit: parseInt(limit?.toString() ?? "10"),
      page: parseInt(page?.toString() ?? "1"),
    }
  );
  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "CUSTOMERS FETCH",
    message: "customers fetched successfully",
    data: {
      customers,
    },
  });
};
