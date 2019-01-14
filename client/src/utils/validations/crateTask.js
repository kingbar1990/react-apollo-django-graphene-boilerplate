import Yup from "yup";


export const TaskSchema= Yup.object().shape({
  title: Yup.string()
    .required("Name is not required!"),
  description: Yup.string()
    .required("Description is required!"),
});
