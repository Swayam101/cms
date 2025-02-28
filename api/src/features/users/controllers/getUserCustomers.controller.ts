import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerDaos from "../../customer/dao/customer.daos";
import { FilterQuery } from "mongoose";
import { ICustomer } from "../../customer/interfaces/customer.interface";

export default async (req: Request, res: Response) => {
  const { id, search, status, freeTrial, page, limit } = req.query;
  const currentUserId = res.locals.userId;

  const userId = `${id?.toString()}`;

  const filter: FilterQuery<ICustomer> = {
    assignedTo: currentUserId ?? userId,
    $or: [
      { name: { $regex: search ?? "", $options: "i" } },
      { phone: { $regex: search ?? "", $options: "i" } },
    ],
  };

  if (status) filter.status = status;

  if (freeTrial === "true") {
    filter["statusHistory.0"] = { $exists: true };
    filter["statusHistory.action"] = "freetrial";
    filter["$expr"] = {
      $eq: [{ $arrayElemAt: ["$statusHistory.action", -1] }, "freetrial"],
    };
  }

  const customers = await customerDaos.customer.getAllCustomers(filter, {
    page: parseInt(page?.toString() ?? "1"),
    limit: parseInt(limit?.toString() ?? "25"),
  });

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
