import { yupResolver } from "@mantine/form";
import { object, string } from "yup";

export const bookingCancelResolver = yupResolver(
  object().shape({
    note: string().required("Note is required."),
  })
);
