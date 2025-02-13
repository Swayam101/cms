import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerDaos from "../dao/customer.daos";

export default async (req: Request, res: Response) => {
  const { id, status } = req.body;

  await customerDaos.customer.changeCustomerStatus(id, status);

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "CUSTOMER STATUS UPDATE",
    message: "customer status updated successfully",
  });
};
