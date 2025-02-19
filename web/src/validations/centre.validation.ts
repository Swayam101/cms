import { number, object, string } from "yup";

export const userValidation = object().shape({
  username: string().required("username is required"),
  password: string().required("password is reuqired"),
});

export const updateCentrePricing = object({
  courtPrice: object().shape({
    regular: number()
      .required("regular court price is required")
      .min(1)
      .typeError("invalid amount"),
    weekend: number()
      .required("weekend court price is required")
      .min(1)
      .typeError("invalid amount"),
  }),
  slotPrice: object().shape({
    regular: number()
      .required("regular court price is required")
      .min(1)
      .typeError("invalid amount"),
    weekend: number()
      .required("weekend court price is required")
      .min(1)
      .typeError("invalid amount"),
  }),
  id: string().required("center id is required"),
});
