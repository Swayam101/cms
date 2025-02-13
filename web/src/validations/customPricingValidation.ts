import { object, number, date, string, ref } from "yup";

export default object().shape({
  startDate: date()
    .required("Start date is required")
    .typeError("Start date must be a valid date")
    .min(new Date(), "Start date must be in the future"),
  endDate: date()
    .required("End date is required")
    .typeError("End date must be a valid date")
    .min(new Date(), "End date must be in the future")
    .min(ref("startDate"), "End date must be later than start date"),
  price: object().shape({
    slot: number()
      .required("Slot Price is required")
      .typeError("Slot Price must be a number")
      .min(1, "Slot price must be at atleast 1"),
    court: number()
      .required("Court Price is required")
      .typeError("Court Price must be a number")
      .min(1, "Court price must be atleast 1"),
  }),
  center: string().required("Center is required"),
  id: string().optional(),
});
