import React from 'react'
import { Formik } from 'formik'
import './scss/SignUpForm.css'
import Yup from 'yup'
//import gql from 'graphql-tag';


const MIN_PASSWORD_LENGTH = 6

function getValidationSchema(values) {
  return Yup.object().shape({
    email: Yup.string()
      .email('E-mail is not valid!')
      .required('E-mail is required!'),
    password: Yup.string()
      .min(MIN_PASSWORD_LENGTH, `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`)
      .required('Password is required!'),
  })
}

function validate(getValidationSchema) {
  return (values) => {
    const validationSchema = getValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}


const initialValues = {
  email: '',
  password: '',
}

export default function SignUpFormContainer() {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate(getValidationSchema)}
      onSubmit={onSubmit}
      render={SignUpForm}
    />
  )
}

function SignUpForm(props) {
  const { isSubmitting, errors, handleChange, handleSubmit } = props

  return (
    <div className="form">
      <label className="form-field" htmlFor="email">
        <span>E-mail:</span>
        <input className="form-control" name="email" type="email" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.email}</div>
      <label className="form-field" htmlFor="password">
        <span>Password:</span>
        <input className="form-control" name="password" type="password" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.password}</div>
      <button type="button" className="btn btn-success" onClick={handleSubmit}>{isSubmitting ? 'Loading' : 'Sign Up'}</button>
    </div>
  )
}

function onSubmit(values, { setSubmitting, setErrors }) {
  setTimeout(() => {
    console.log('User has been sucessfully saved!', values)
    setSubmitting(false)
  }, 2000)
}

// const login = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       errors
//       token
//       user {
//         id
//         email
//         lastName
//         firstName
//         username
//         avatar
//       }
//     }
//   }
// `;
