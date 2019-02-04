import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";

import { LoginSchema } from "./validation";

export const LoginForm = ({ login }) => (
   <Formik
      initialValues={{
         username: "",
         password: ""
      }}
      validationSchema={LoginSchema}
      onSubmit={login}
   >
      {() => (
         <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
               <Form>
                  <Field
                     name="username"
                     type="email"
                     component={ReactstrapInput}
                     label="Email"
                  />
                  <Field
                     name="password"
                     type="password"
                     component={ReactstrapInput}
                     label="Password"
                  />
                  <Button type="submit">Submit</Button>
               </Form>
            </div>
         </div>
      )}
   </Formik>
);
