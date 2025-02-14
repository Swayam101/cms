import { Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import dao from "../../../dao";

export default async (req: Request, res: Response) => {
  const id = res.locals.adminId;
  const admin = await dao.admin.getAdminById(id);

  if (!admin)
    return JsonResponse(res, {
      status: "error",
      statusCode: 401,
      message: "admin not found",
      title: "ADMIN PROFILE",
    });

  const { password, ...adminData } = admin.toObject();

  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "ADMIN PROFILE",
    message: "admin profile fetched successfully",
    data: {
      admin: adminData,
    },
  });
};
