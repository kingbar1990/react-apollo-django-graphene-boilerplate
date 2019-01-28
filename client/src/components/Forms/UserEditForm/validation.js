import Yup from "yup";

export const UserFormValidate = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!")
});
