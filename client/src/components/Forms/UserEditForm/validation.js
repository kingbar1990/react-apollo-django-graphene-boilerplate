import * as Yup from 'yup'


export const UserFormValidate = Yup.object().shape({
  fullName: Yup.string().required("Full name is required!"),
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!")
});
