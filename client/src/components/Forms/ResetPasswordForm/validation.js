import Yup from "yup";
import { MIN_PASSWORD_LENGTH } from "../../../constants";


export const ResetPasswordSchema = Yup.object().shape({
  newPassword1: Yup.string()
    .min(MIN_PASSWORD_LENGTH, `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`)
    .required("Password is required!"),
  newPassword2: Yup.string()
    .min(MIN_PASSWORD_LENGTH, `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`)
    .required("Password is required!"),
});
