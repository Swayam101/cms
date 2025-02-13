import { object, string, array } from "yup";

export const bulkBookingValidation = object().shape({
  centre: string().required("Please select a value first"),

  fromTime: string()
    .required("From time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  toTime: string()
    .required("To time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
    .test("is-after", "To time must be after From time", function (value) {
      const { fromTime } = this.parent;
      return fromTime && value > fromTime;
    }),
  fromDate: string().required("Please select a valid date"),
  toDate: string().required("Please select a valid date"),

  courts: array()
    .min(1, "At least one court must be selected")
    .required("Please select a checkbox"),
  days: array()
    .min(1, "At least one day must be selected")
    .required("Please select a valid day"),
});
