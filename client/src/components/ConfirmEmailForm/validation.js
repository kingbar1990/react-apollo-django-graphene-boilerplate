import Yup from "yup";
import { MIN_PASSWORD_LENGTH } from "../../constants";


export const ConfirmEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
});
