import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import { IUser } from "../../users/interfaces/user.interface";
import userDaos from "../../users/dao/user.daos";
import authLib from "../lib/auth.lib";
import authDao from "../dao/auth.dao";

export default async (req: Request, res: Response) => {
  const { username, password } = req.body as IUser;

  if (!username || !password) {
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      message: "username and password are required",
      title: "USER LOGIN",
    });
  }

  const user = await userDaos.user.getUserForLogin({ username, password });

  if (!user)
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      title: "USER AUTH",
      message: "invalid credentials",
    });

  if (!user.status)
    return JsonResponse(res, {
      status: "error",
      statusCode: 400,
      message: "user is banned by admin",
      title: "USER AUTH",
    });
  const token = authLib.jwtLib.generateJWT({
    id: user.id,
    username: user.username,
  });

  const authToken = await authDao.token.createToken(user.id, token);

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "USER LOGIN",
    message: "user login successfull",
    data: {
      token: authToken.token,
    },
  });
};
