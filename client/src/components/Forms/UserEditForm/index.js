import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "mdbreact";
import { ReactstrapInput } from "reactstrap-formik";

import { UserFormValidate } from "./validation";

const UserEditForm = props => {
  return (
    <div className="col-lg-7 col-xlg-9 col-md-7">
      <Formik
        initialValues={props.initialValues}
        validationSchema={UserFormValidate}
        onSubmit={props.handleEditUser}
      >
        {() => (
          <div className="card">
            <div className="card-body">
              <Form>
                <Field
                  name="fullName"
                  type="text"
                  component={ReactstrapInput}
                  label="Full name"
                />
                <Field
                  name="email"
                  type="text"
                  component={ReactstrapInput}
                  label="Email"
                />
                <label>Avatar</label>
                <input
                  name="avatar"
                  type="file"
                  className="form-control-file mb-3"
                  accept="image/*"
                  onChange={props.handleImageChange}
                  label="Avatar"
                />
                {props.error && <p style={{ color: "red" }}>{props.error}</p>}
                <Button color="primary" type="submit" style={{ margin: 0 }}>
                  Save
                </Button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default UserEditForm;
