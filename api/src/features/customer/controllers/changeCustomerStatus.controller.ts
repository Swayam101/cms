import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerDaos from "../dao/customer.daos";
import { ICustomer } from "../interfaces/customer.interface";

export default async (req: Request, res: Response) => {
  const { id, status, note, date, user } = req.body;

  const role = res.locals.adminId ? "admin" : "user";

  if (role === "user" && status === "assign") {
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      message: "users cannot re assign customers",
      title: "USER ERROR",
    });
  }

  await customerDaos.customer.changeCustomerStatus(id, status, {
    actionBy: role,
    actionFor: "status",
    date: new Date(),
    action: status,
    note,
  });

  if ((status as ICustomer["status"]) === "freetrial") {
    await customerDaos.customer.addFreeTrialDate({
      _id: id,
      freeTrial: new Date(date.toString()),
    });
  } else if ((status as ICustomer["status"]) === "assigned") {
    await customerDaos.customer.assignCustomer(id, user);
  }

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "CUSTOMER STATUS UPDATE",
    message: "customer status updated successfully",
  });
};
