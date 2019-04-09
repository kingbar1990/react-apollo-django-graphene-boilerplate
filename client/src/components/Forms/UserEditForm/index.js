import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "mdbreact";
import { ReactstrapInput } from "reactstrap-formik";

import i18n from "../../../i18n";
import { UserFormValidate } from "./validation";

const UserEditForm = props => (
  <div className="col-lg-7 col-xlg-9 col-md-7">
    <Formik
      initialValues={{
        email: props.initialValues.email,
        fullName: props.initialValues.fullName
      }}
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
                label={i18n.t("Full name")}
              />
              <Field
                name="email"
                type="text"
                component={ReactstrapInput}
                label={i18n.t("Email")}
              />
              <div className="position-relative form-group">
                <label>{i18n.t("Avatar")}</label>
                <input
                  name="avatar"
                  type="file"
                  className="form-control-file"
                  accept="image/*"
                  onChange={props.handleImageChange}
                  label={i18n.t("Avatar")}
                />
                {props.error && (
                  <div className="invalid-feedback d-block">{props.error}</div>
                )}
              </div>
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

export default UserEditForm;
