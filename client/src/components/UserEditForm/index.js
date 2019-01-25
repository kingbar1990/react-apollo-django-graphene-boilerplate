import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "mdbreact";
import { ReactstrapInput } from "reactstrap-formik";
import { BACKEND_URL } from "../../constants";


const UserEditForm = props => {
  return (
  <Formik
    initialValues={props.initialValues}
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
              accept='image/*'
              // component={ReactstrapInput}
              onChange={props.handleImageChange}
              label="Avatar"
            />
            <Button color="primary" type="submit" style={{ margin: 0 }}>
              Save
            </Button>
          </Form>
        </div>
      </div>
    )}
  </Formik>
)};

export default UserEditForm;
