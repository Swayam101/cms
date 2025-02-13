import * as yup from "yup";
import { ADMIN_ROLES } from "../enum/admin.enum";

const baseSchema = {
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone No. is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  role: yup
    .string()
    .oneOf(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(ADMIN_ROLES).map(([_, value]) => value),
      "Select a valid role"
    )
    .required("Role is required"),
  centre: yup.string().when("role", {
    is: ADMIN_ROLES.CENTRE_MANAGER,
    then: () => yup.string().required("Center is required"),
    otherwise: () => yup.string(),
  }),
};

export const createAdminValidation = yup.object().shape({
  ...baseSchema,
  password: yup
    .string()
    .min(8, "password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  image: yup.array().required("This field is required"),
});

export const updateAdminValidation = yup.object().shape({
  ...baseSchema,
  updatePassword: yup.boolean(),
  password: yup.string().when("updatePassword", {
    is: true,
    then: (schema) =>
      schema
        .min(8, "password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
  }),
  image: yup.array(),
});

export const getCreateAdminValidationSchema = () => {
  return createAdminValidation;
};

export const getUpdateAdminValidationSchema = () => {
  return updateAdminValidation;
};
