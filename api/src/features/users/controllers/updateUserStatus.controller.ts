import { Request, Response } from "express";

import { JsonResponse } from "../../../utils/jsonResponse.utils";
import userDaos from "../dao/user.daos";

export default async (req: Request, res: Response) => {
  const { id, status } = req.body;

  await userDaos.user.updateUserStatus(id, status);

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "USER STATUS UPDATE",
    message: "User status update successful",
  });
};
