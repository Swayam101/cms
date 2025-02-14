import { object, string } from "yup";

const addCustomerValidation = object().shape({
  name: string().required("name is required"),
  phone: string()
    .required("phoone is required")
    .length(10, "invalid phone number"),
  email: string().email("invalid email format"),
});

export default {
  addCustomer: addCustomerValidation,
};
