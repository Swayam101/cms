import * as yup from "yup";

export const rescheduleValidation = yup.object().shape({
  slotDate: yup.string().required("Slot date is required"),
  type: yup.string().required("It is required"),
  centre: yup.string().required("It is required"),
});
