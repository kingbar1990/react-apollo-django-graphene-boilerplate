import React from 'react';
//import Error from './error';
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup';
// eslint-disable-next-line to the line before.
import { Button, FormGroup, Label, Input, FormText } from 'reactstrap';



const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name has to be longer than 2 characters!')
    .max(64, 'Name has to be shorter than 64 characters!')
    .required('Name is required!'),
  email: Yup.string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
  password1: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Password is required!'),
  password2: Yup.string()
        .required('Password confirmation is required!')
        .min(6, 'Password has to be longer than 6 characters!')
  });

// export const SignUpForm = props => {
//   const { handleInput, register, errors } = props;
//   return (
//     <div className="container-fluid">
//       <div
//         style={{ minHeight: '90vh' }}
//         className="d-flex justify-content-center align-items-center row"
//       >
//       <Formik
//         initialValues={{
//           fullName: '',
//           email: '',
//           password1: '',
//           password2: '',
//         }}
//         validationSchema={SignupSchema}
//         onSubmit={values => {
//           // same shape as initial values
//           console.log('onSubmit');
//           console.log(values);
//         }}
//       >
//         <form onSubmit={register}>
//           <h1>Registration</h1>
//           <div className="form-group">
//             <label>Full name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="fullName"
//               placeholder="Enter your full name"
//               onChange={handleInput}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="exampleInputEmail1">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               aria-describedby="emailHelp"
//               placeholder="Enter email"
//               onChange={handleInput}
//             />
//             <small id="emailHelp" className="form-text text-muted">
//               We will never share your email with anyone else.
//             </small>
//           </div>
//           <div className="form-group">
//             <label htmlFor="password1">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password1"
//               placeholder="Password"
//               onChange={handleInput}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password2">Confirm your password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password2"
//               placeholder="Password"
//               onChange={handleInput}
//             />
//           </div>
//
//           <Error error={errors} />
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       </Formik>
//       </div>
//     </div>
//   );
// };
// const handleSubmit = (values, {
//   props = this.props,
//   setSubmitting
// }) => {
//
//   console.log(values);
//   alert('Form Submitted');
//   setSubmitting(false);
//   return;
// }

export const SignUpForm = (props) => {
  const { register } = props;

  return (
  <div>
    <h1>Signup</h1>
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
      {({ errors, touched }) => (
        <div className="card">
          <div className="card-body">
            <Form>
              <FormGroup>
                <Label for="">Name</Label>
                <Field name="fullName" type="text" className="form-control"/>
                {errors.fullName && touched.fullName ? (
                  <div>{errors.fullName}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="">Email</Label>
                <Field name="email" type="email" className="form-control"/>
                {errors.email && touched.email ? <div>{errors.email}</div> : null}
              </FormGroup>
              <FormGroup>
                <Label for="">Password</Label>
                <Field name="password1" type="password" className="form-control"/>
                {errors.password1 && touched.password1 ? <div>{errors.password1}</div> : null}
              </FormGroup>
              <FormGroup>
                <Label for="">Confirm password</Label>
                <Field name="password2" type="password" className="form-control" />
                {errors.password2 && touched.password2 ? <div>{errors.password2}</div> : null}
                <Button type="submit" >Submit</Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  </div>
  )
};
