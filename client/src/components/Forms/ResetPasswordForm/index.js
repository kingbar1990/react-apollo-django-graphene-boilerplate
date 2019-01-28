import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";

import { ResetPasswordSchema } from "./validation";

export const ResetPasswordForm = ({ uid, confirmToken, resetPassword }) => (
  <Formik
    initialValues={{
      newPassword1: "",
      newPassword2: "",
      userId: uid,
      confirmToken: confirmToken
    }}
    validationSchema={ResetPasswordSchema}
    onSubmit={resetPassword}
  >
    {() => (
      <div className="card">
        <div className="card-header">Reset password</div>
        <div className="card-body">
          <Form>
            <Field
              name="newPassword1"
              type="password"
              component={ReactstrapInput}
              label="password1"
            />
            <Field
              name="newPassword2"
              type="password"
              component={ReactstrapInput}
              label="password2"
            />
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    )}
  </Formik>
);
