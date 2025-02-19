import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import userDaos from "../dao/user.daos";

export default async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id)
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      message: "id is required",
      title: "USER PROFILE FETCH",
    });

  const user = await userDaos.user.getUserById(id?.toString() ?? "12345");

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "USER FETCH",
    message: "user fetched successfully",
    data: {
      user,
    },
  });
};
