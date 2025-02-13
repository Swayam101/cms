import fs from "fs";
import { Request, Response } from "express";
import csv from "csv-parser";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerValidators from "../validators/customer.validators";
import customerDaos from "../dao/customer.daos";
import CustomerModel from "../models/customer.model";

export default async (req: Request, res: Response) => {
  try {
    console.log((req as any).files);

    if (!(req as any).file) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "Please try again later",
        title: "Unable to upload file",
      });
    }

    const { path: filePath } = (req as any).file;
    const records: any[] = [];
    const errorRows: { row: number; errors: string }[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => records.push(row))
      .on("end", async () => {
        fs.unlink(filePath, () => {});

        let totalUploads = 0;

        await Promise.all(
          records.map(async (row, index) => {
            const validation = customerValidators.addCustomer.validateSync(row);

            if (validation) {
              errorRows.push({
                row: index + 1,
                errors: "validation.error.details.map((err) => err.message)",
              });
              return;
            }

            const existingCustomer = await CustomerModel.findOne({
              phone: row.phone,
            });

            if (existingCustomer) {
              errorRows.push({
                row: index + 1,
                errors: "Phone number already exists in the database",
              });
              return;
            }

            await customerDaos.customer.addCustomer(row);
            totalUploads++;
          })
        );

        if (errorRows.length > 0) {
          return JsonResponse(res, {
            status: "error",
            statusCode: 400,
            message: "Some rows contain errors",
            title: "Validation Failed",
            data: errorRows,
          });
        }

        await customerDaos.customerUpload.createLog({ totalUploads });

        return JsonResponse(res, {
          status: "success",
          statusCode: 200,
          message: `${totalUploads} customers added successfully`,
          title: "Data Inserted Successfully",
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
