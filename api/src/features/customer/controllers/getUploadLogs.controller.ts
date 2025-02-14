import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerDaos from "../dao/customer.daos";

export default async (_: Request, res: Response) => {
  const logs = await customerDaos.customerUpload.getAllLogs();

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "UPLOAD LOGS",
    message: "upload logs fetched successfully",
    data: {
      logs,
    },
  });
};
