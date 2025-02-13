import { array, number, object, string } from "yup";

export const academyPlanValidation = object().shape({
  academyImage: array()
    .min(1, "Image is required")
    .required("Image is required"),
  academyListId: string().required("Name is required"),
  price: string().required("Price is required"),
  batchType: string().required("Batch type is required"),
  gst: number()
    .required("GST is required")
    .min(0, "GST must be greater than or equal to 0"),
  batchStartDate: string().required("Batch start date is required"),
  duration: object({
    months: number()
      .required("Months are required")
      .min(1, "Months cannot be negative"),
    session: number()
      .required("Session is required")
      .min(1, "Session cannot be negative"),
  }).required("Duration is required"),
  maximumIntake: string().required("Maximum intake is required"),
  day: array()
    .of(string().required("Day is required"))
    .min(1, "Select at least one day")
    .required("Select at least one day"),
  batch: array()
    .of(
      object().shape({
        startTime: string().required("Start time is required"),

        closeTime: string().required("Close time is required"),
      })
    )
    .min(1, "At least one batch is required"),
});
