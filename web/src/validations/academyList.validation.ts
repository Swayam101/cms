import { number, object, string } from "yup";

export const academyListValidation = object().shape({
  address: string().required("address is required"),
  closeTime: string().required("close time is required"),
  description: string().required("description is required"),
  location: object().shape({
    lat: number()
      .required("latitude is required")
      .typeError("Enter valid latitude"),
    long: number()
      .required("longitude is required")
      .typeError("Enter valid longitude"),
  }),
  name: string().required("name is required"),
  openTime: string().required("close time is required"),
});
