import { Request, Response } from "express";

import { JsonResponse } from "../../../utils/jsonResponse.utils";
import userDaos from "../dao/user.daos";

export default async (_req: Request, res: Response) => {
  const users = await userDaos.user.getAllUsers();

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "USERS FETCH",
    message: "Users fetched successfully",
  });
};
