import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerDaos from "../dao/customer.daos";

export default async (req: Request, res: Response) => {
  const { id, status } = req.body;

  const role = res.locals.adminId ? "admin" : "user";

  await customerDaos.customer.changeCustomerStatus(id, status, {
    actionBy: role,
    actionFor: "status",
    date: new Date(),
    action: status,
  });

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "CUSTOMER STATUS UPDATE",
    message: "customer status updated successfully",
  });
};
