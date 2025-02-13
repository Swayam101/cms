import { object, string } from "yup";
import validateRequest from "../../../utils/validateRequest";

const validation = object({
  username: string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export default validateRequest(validation);
