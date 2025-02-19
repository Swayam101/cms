import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import { ICustomer } from "../interfaces/customer.interface";
import customerDaos from "../dao/customer.daos";

export default async (req: Request, res: Response) => {
  const customerUpdate = req.body as ICustomer;

  console.log(customerUpdate);

  if (!customerUpdate._id) {
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      message: "CUSTOMER UPDATE ERROR",
      title: "invalid update request",
    });
  }

  await customerDaos.customer.updateCustomer(customerUpdate);

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "CUSTOMER UPDATE",
    message: "customer update successfull",
  });
};
