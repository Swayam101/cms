import { IAcademyListsForm } from "../types";

export const academyListsInitialValues: IAcademyListsForm = {
  name: "",
  address: "",
  closeTime: "",
  openTime: "",
  description: "",
  location: { lat: 0, long: 0 },
};
