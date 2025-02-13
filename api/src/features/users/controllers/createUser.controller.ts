import { Request, Response } from "express";

import { JsonResponse } from "../../../utils/jsonResponse.utils";
import { IUser } from "../interfaces/user.interface";
import userDaos from "../dao/user.daos";

export default async (req: Request, res: Response) => {
  const { username, password } = req.body as IUser;

  const user = await userDaos.user.createUser(username, password);

  if (!user)
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      title: "USER CREATE",
      message: "Unable to create user",
    });

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "USER CREATE",
    message: "User creation successful",
  });
};
