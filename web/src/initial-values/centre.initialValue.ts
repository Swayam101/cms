import { ICentreForm } from "../types";

export const centreInitialValues: ICentreForm = {
  name: "",
  address: "",
  amenities: [],
  closeTime: "",
  openTime: "",
  images: [],
  description: "",
  priceCourt: {
    regular: 800,
    weekend: 800,
  },
  priceSlot: {
    regular: 200,
    weekend: 200,
  },
  location: { lat: 0, long: 0 },
  inActiveWeekOpenPlay: [],
  openPlaySlots: [],
  slots: [],
};
