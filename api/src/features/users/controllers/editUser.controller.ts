import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import { IUser } from "../interfaces/user.interface";
import userDaos from "../dao/user.daos";

export default async (req: Request, res: Response) => {
  const user = req.body as IUser;

  await userDaos.user.editUser(user);

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "USER UPDATE",
    message: "user updated successfully",
  });
};
