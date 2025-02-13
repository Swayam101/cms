import { Request, Response } from "express";

import dao from "../../../dao";

import { IAdmin } from "../../../interface/admin.interface";
import { JsonResponse } from "../../../utils/jsonResponse.utils";

export default async (req: Request, res: Response) => {
  const { username, password, passkey } = req.body as IAdmin & {
    passkey: string;
  };

  if (passkey !== "meetha") {
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      title: "ADMIN CREATE",
      message: "unable to create admin",
    });
  }

  const admin = await dao.admin.createAdmin(username, password);

  if (!admin)
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      title: "ADMIN CREATE",
      message: "unable to create admin",
    });

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "admin login",
    message: "admin creation successfull",
  });
};
