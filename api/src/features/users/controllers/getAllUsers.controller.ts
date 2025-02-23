import { Request, Response } from "express";

import { JsonResponse } from "../../../utils/jsonResponse.utils";
import userDaos from "../dao/user.daos";
import { FilterQuery } from "mongoose";
import { IUser } from "../interfaces/user.interface";

export default async (req: Request, res: Response) => {
  const { page, limit, search } = req.query;

  console.log("rqe query log  : ", !!req.query.search);
  const filter: FilterQuery<IUser> = {};

  if (filter) filter.username = { $regex: search ?? "", $options: "i" };

  const users = await userDaos.user.getAllUsers(filter, {
    page: parseInt(page?.toString() ?? "1"),
    limit: parseInt(limit?.toString() ?? "50"),
  });

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "USERS FETCH",
    message: "Users fetched successfully",
    data: {
      users,
    },
  });
};
