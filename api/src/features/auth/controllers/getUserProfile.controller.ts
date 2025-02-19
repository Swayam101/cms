import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import userDaos from "../../users/dao/user.daos";

export default async (_req: Request, res: Response) => {
  const id = res.locals.userId;
  const user = await userDaos.user.getUserById(id);

  if (!user)
    return JsonResponse(res, {
      status: "error",
      statusCode: 401,
      message: "user not found",
      title: "USER PROFILE",
    });

  const { password, ...userData } = user.toObject();

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "USER PROFILE",
    message: "user profile fetched successfully",
    data: {
      user: userData,
    },
  });
};
