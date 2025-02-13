import * as yup from "yup";

export const reportValidation = yup.object().shape({
  reportType: yup.string().required("Report type is required"),
  emails: yup.string().required("Emails are required"),
  centres: yup
    .array()
    .of(yup.string())
    .required("Centres are required")
    .min(1, "Centres are required"),
});
