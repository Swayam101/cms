import { array, date, object, string } from "yup";

export default object().shape({
  centerId: string().required("centre is requred"),
  bookingDate: date().required("date is required"),
  note: string().required("note is required"),
  courts: array()
    .of(string())
    .required("courts are required")
    .min(1, "select atleast one court"),
});
