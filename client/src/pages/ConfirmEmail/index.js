import React, { useState, useCallback } from "react";
import { graphql } from "react-apollo";

import { Container } from "reactstrap";
import { ConfirmEmailForm } from "../../components/Forms/ConfirmEmailForm";

import * as path from "../../constants/routes";
import { confirmEmail } from "../../queries";

const ConfirmEmail = props => {
  const [state] = useState({ error: "" });
  const confirmEmail = useCallback((values, { setErrors }) => {
    props
      .confirmEmail({
        variables: {
          email: values.email
        }
      })
      .then(response => {
        if (!response.data.confirmEmail.error) {
          alert("Check your email, please!");
          props.history.push(path.SCHEDULE);
        } else {
          let errors = {};
          response.data.confirmEmail.error.validationErrors.map(error => {
            if (error["field"] === "__all__") {
              errors["email"] = error["messages"].join(" ");
            } else if (error["field"] === "email") {
              errors["email"] = error["messages"].join(" ");
            } else {
              errors[error] = error["messages"];
            }
            return null;
          });
          setErrors(errors);
        }
      });
  });
  return (
    <Container>
      <ConfirmEmailForm onfirmEmail={confirmEmail} error={state.error} />
    </Container>
  );
};

export default graphql(confirmEmail, { name: "confirmEmail" })(ConfirmEmail);
