import { object, string } from "yup";

const addCustomerValidation = object().shape({
  name: string().required("name is required"),
  phone: string().required("name is required"),
  email: string().email("invalid email format"),
});

export default {
  addCustomer: addCustomerValidation,
};
