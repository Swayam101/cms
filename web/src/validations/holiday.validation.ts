import * as yup from "yup";

export const holidayValidation = yup.object().shape({
  date: yup.date().required("Date is required"),
  holiday: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
});
