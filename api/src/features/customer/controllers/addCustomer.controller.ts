import { Request, Response } from "express";
import customerModels from "../models/customer.models";
import { ICustomer } from "../interfaces/customer.interface";
import { JsonResponse } from "../../../utils/jsonResponse.utils";

export default async (req: Request, res: Response) => {
  const customer = req.body as ICustomer;

  await customerModels.Customer.create(customer);

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "CUSTOMER ADDED",
    message: "customer added successfully",
  });
};
