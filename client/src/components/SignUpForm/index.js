import React from 'react';
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup';
import { Button } from 'reactstrap';
import { ReactstrapInput } from "reactstrap-formik";


const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name has to be longer than 2 characters!')
    .max(64, 'Name has to be shorter than 64 characters!')
    .required('Name is required!'),
  email: Yup.string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
  password1: Yup.string()
    .min(8, 'Password has to be longer than 8 characters!')
    .required('Password is required!'),
  password2: Yup.string()
    .required('Password confirmation is required!')
    .min(8, 'Password has to be longer than 8 characters!')
});


export const SignUpForm = (props) => {
  const { register } = props;
  return (
  <div>
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        password1: '',
        password2: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={register}
    >
      {() => (
        <div className="card">
          <div className="card-header">
            Signup
          </div>
          <div className="card-body">
            <Form>
              <Field name="fullName" type="text" component={ReactstrapInput} label="Name"/>
              <Field name="email" type="email" component={ReactstrapInput} label="Email"/>
              <Field name="password1" type="password" component={ReactstrapInput} label="Password"/>
              <Field name="password2" type="password" component={ReactstrapInput} label="Password confirmation"/>
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  </div>
  )
};
