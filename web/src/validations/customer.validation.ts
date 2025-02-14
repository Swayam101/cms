import { object, string } from "yup";

export const createUpdateCustomerValidation = object().shape({
  name: string()
    .required("customer name is required")
    .max(20, "customer name have upto 15 characters only"),
  phone: string()
    .required("customer phone is required")
    .length(10, "invalid customer phone"),
});
