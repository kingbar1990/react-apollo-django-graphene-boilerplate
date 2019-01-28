import Yup from "yup";

export const UserFormValidate = Yup.object().shape({
  fullName: Yup.string().required("Full name is not required!"),
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!")
});
