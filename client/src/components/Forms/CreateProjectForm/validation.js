import * as Yup from 'yup'


export const ProjectSchema= Yup.object().shape({
  name: Yup.string()
    .required("Name is not required!"),
  description: Yup.string()
    .required("Description is required!"),
});
