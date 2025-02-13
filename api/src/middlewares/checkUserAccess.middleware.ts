import { NextFunction, Request, Response } from "express";
import authDao from "../features/auth/dao/auth.dao";
import authLib from "../features/auth/lib/auth.lib";
import { JsonResponse } from "../utils/jsonResponse.utils";
import userDaos from "../features/users/dao/user.daos";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken = req.headers[`authorization`]?.replace("Bearer ", "");
    if (!userToken) throw new Error("unauthorized access");

    const token = await authDao.token.getToken(userToken);
    if (!token) throw new Error("unauthorized access");

    const { id } = authLib.jwtLib.verifyJWT(token.token);

    const user = await userDaos.user.getUserById(id);

    if (!user) throw new Error("unauthorised access");

    res.locals.userId = user.id;
    res.locals.username = user.username;

    return next();
  } catch (error) {
    return JsonResponse(res, {
      status: "error",
      statusCode: 401,
      message: "login to continue",
      title: "unauthorized access",
    });
  }
};
