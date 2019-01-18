import Yup from "yup";

export const ConfirmEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
});
