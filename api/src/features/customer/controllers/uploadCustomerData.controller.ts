import fs from "fs";
import { Request, Response } from "express";
import csv from "csv-parser";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerValidators from "../validators/customer.validators";
import customerDaos from "../dao/customer.daos";

export default async (req: Request, res: Response) => {
  try {
    if (!(req as any).file) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Please try agian later",
        title: "Unable to upload file",
      });
    }
    const { path: filePath } = (req as any).file;

    let totalUploads = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        if (
          !customerValidators.addCustomer.validate({
            name: row.name,
            phone: row.phone,
            email: row.email,
          })
        ) {
          return JsonResponse(res, {
            status: "error",
            statusCode: 400,
            message: "customer not added",
            title: "Data not inserted",
          });
        }
        const inserted = await customerDaos.customer.addCustomer({
          name: row.name,
          phone: row.phone,
          email: row.email,
        });
        if (!inserted) {
          return JsonResponse(res, {
            status: "error",
            statusCode: 400,
            message: "customer not added",
            title: "Data not inserted",
          });
        }
        totalUploads++;
      })
      .on("end", () => {
        fs.unlink(filePath, () => {});
        customerDaos.customerUpload
          .createLog({
            totalUploads,
          })
          .then(() => {
            console.log("data uploaded : ", totalUploads, " customers");
          });
        return JsonResponse(res, {
          status: "success",
          statusCode: 200,
          message: "customers added successfully",
          title: "Data Inserted successfully",
        });
      })
      .on("error", (err: Error) => {
        fs.unlink(filePath, () => {});
        return JsonResponse(res, {
          status: "error",
          statusCode: 500,
          message: err.message,
          title: "Something went wrong",
        });
      });
  } catch (error: unknown) {
    return JsonResponse(res, {
      status: "error",
      statusCode: 500,
      message: (error as Error).message,
      title: "Something went wrong",
    });
  }
};
