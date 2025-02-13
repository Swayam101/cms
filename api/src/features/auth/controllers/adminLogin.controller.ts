import { Request, Response } from "express";

import authLib from "../lib/auth.lib";

import dao from "../../../dao";

import { IAdmin } from "../../../interface/admin.interface";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import authDao from "../dao/auth.dao";

export default async (req: Request, res: Response) => {
  const { username, password } = req.body as IAdmin;

  const admin = await dao.admin.getAdminForLogin(username, password);

  if (!admin)
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      title: "ADMIN AUTH",
      message: "invalid credentials",
    });

  const token = authLib.jwtLib.generateJWT({
    id: admin.id,
    username: admin.username,
  });

  const authToken = await authDao.token.createToken(admin.id, token);

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "admin login",
    message: "admin login successfull",
    data: {
      token: authToken.token,
    },
  });
};
