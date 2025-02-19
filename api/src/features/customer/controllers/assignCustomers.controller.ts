import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerDaos from "../dao/customer.daos";

export default async (req: Request, res: Response) => {
  const { customerCount, id } = req.body;

  const { results } = await customerDaos.customer.getAllCustomers(
    { status: "new" },
    { page: 1, limit: customerCount }
  );

  if (results.length < customerCount) {
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      message: "Not Enough Customers",
      title: `${results.length} customers available`,
    });
  }

  results.forEach(async (customer) => {
    const data = customer as any;
    data.status = "assigned";
    data.assignedTo = id;
    data.statusHistory = [
      {
        actionBy: "admin",
        actionFor: "assigned",
        date: new Date(),
        action: "assigned",
      },
    ];
    await data.save();
  });

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "CUSTOMERS ASSIGNED",
    message: "customers assigned successfully",
  });
};
