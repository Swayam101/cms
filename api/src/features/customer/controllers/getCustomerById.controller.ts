import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerDaos from "../dao/customer.daos";

export default async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      message: "id is required",
      title: "customer fetch",
    });
  }

  const customer = await customerDaos.customer.getCustomerById(id.toString());

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "CUSTOMER FETCH",
    message: "customer fetched successfully",
    data: {
      customer,
    },
  });
};
