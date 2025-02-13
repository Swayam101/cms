import { Request, Response } from "express";
import { JsonResponse } from "../utils/jsonResponse.utils";

export default async (_req: Request, res: Response) => {
  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "API HEALTHCHECK",
    message: "api is online and listening for requests",
  });
};
