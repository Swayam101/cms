import * as yup from "yup";

export const bookingValidation = yup.object().shape({
  slotDate: yup.string().required("Slot date is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  playerName: yup.string().required("Player name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone No. is required"),
  paymentType: yup
    .string()
    .oneOf(["UPI", "Card"], "Select a valid payment type")
    .required("Payment Type is Required"),
});
