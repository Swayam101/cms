import { Request, Response } from "express";

import { JsonResponse } from "../../../utils/jsonResponse.utils";
import userDaos from "../dao/user.daos";

export default async (req: Request, res: Response) => {
  const { id, password } = req.body;

  await userDaos.user.updatePassword(id, password);

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "USER PASSWORD UPDATE",
    message: "User password update successful",
  });
};
