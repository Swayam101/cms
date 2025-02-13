import { array, number, object, string } from "yup";

const location = object().shape({
  lat: number()
    .required("latitude is required")
    .typeError("Enter valid latitude"),
  long: number()
    .required("longitude is required")
    .typeError("Enter valid longitude"),
});

const priceCourt = object().shape({
  regular: number()
    .required("regular court price is required")
    .typeError("regular court price is required"),
  weekend: number()
    .required("weekend court price is required")
    .typeError("weekend court price is required"),
});

const priceSlot = object().shape({
  regular: number()
    .required("regular open play price is required")
    .typeError("regular open play price is required"),
  weekend: number()
    .required("weekend open play price is required")
    .typeError("weekend open play price is required"),
});

const parseTime = (timeStr: string) => {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return new Date(1970, 0, 1, hours, minutes); // Using arbitrary date for comparison
};

export const createCentre = object().shape({
  address: string().required("address is required"),

  description: string().required("description is required"),
  location: location,
  name: string().required("name is required"),
  openTime: string().required("open time is required"),
  closeTime: string()
    .required("close time is required")
    .test(
      "closeTime-after-openTime",
      "Close time must be greater than open time",
      function (value) {
        const { openTime } = this.parent;
        if (openTime && value) {
          const openDate = parseTime(openTime);
          const closeDate = parseTime(value);
          return closeDate > openDate; // Validate that closeTime is greater than openTime
        }
        return true; // If openTime or closeTime is not provided, skip validation
      }
    ),
  priceCourt: priceCourt,
  priceSlot: priceSlot,
  amenities: array().required("ammenities are required"),
  images: array()
    .required("Please upload at least one image of center.")
    .min(1, "Please upload at least one image of center."),
  openPlaySlots: array()
    .required("")
    .min(1, "Please select at least 1 open play slot."),
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
