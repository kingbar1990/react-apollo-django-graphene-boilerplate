import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";

import { ConfirmEmailSchema } from "./validation";

export const ConfirmEmailForm = ({ confirmEmail }) => (
   <Formik
      initialValues={{ email: "" }}
      validationSchema={ConfirmEmailSchema}
      onSubmit={confirmEmail}
   >
      {() => (
         <div className="card">
            <div className="card-header">Reset password</div>
            <div className="card-body">
               <Form>
                  <Field
                     name="email"
                     type="email"
                     component={ReactstrapInput}
                     label="email"
                  />
                  <Button type="submit">Submit</Button>
               </Form>
            </div>
         </div>
      )}
   </Formik>
);
