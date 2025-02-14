import fs from "fs";
import { Request, Response } from "express";
import csv from "csv-parser";
import { JsonResponse } from "../../../utils/jsonResponse.utils";
import customerValidators from "../validators/customer.validators";
import CustomerModel from "../models/customer.model";
import { ICustomer } from "../interfaces/customer.interface";
import { ValidationError } from "yup";

export default async (req: Request, res: Response) => {
  try {
    if (!(req as any).file) {
      return JsonResponse(res, {
        status: "error",
        statusCode: 400,
        message: "File is required",
        title: "Unable to upload file",
      });
    }

    const { path: filePath } = (req as any).file;
    const records: ICustomer[] = [];
    const errorRows: { row: number; errors: string; mobile: string }[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", async () => {
        fs.unlink(filePath, () => {});

        let totalUploads = 0;

        await Promise.all(
          records.map(async (row, index) => {
            const validation = customerValidators.addCustomer.isValidSync(row);
            let val: any;
            try {
              val = customerValidators.addCustomer.validateSync(row);
            } catch (error) {
              val = (error as ValidationError).errors[0];
            }

            if (!validation) {
              errorRows.push({
                row: index + 1,
                errors: val,
                mobile: (row as any).phone,
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
                mobile: (row as any).phone,
              });
              return;
            }
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

        return JsonResponse(res, {
          status: "success",
          statusCode: 200,
          message: `${totalUploads} customers verified successfully`,
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
