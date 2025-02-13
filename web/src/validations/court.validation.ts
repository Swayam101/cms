import { object, string } from "yup";

export const createUpdateCourtValidation = object().shape({
  name: string()
    .required("court name is required")
    .max(15, "court name have upto 15 characters only"),
});
