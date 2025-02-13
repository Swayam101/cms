import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup.string().required("Username is required"),
  password: yup.string().required("Enter password"),
});
