import React, { useState, useCallback } from "react";
import { graphql } from "react-apollo";

import { SignUpForm } from "../../components/Forms/SignUpForm";
import { Container } from "reactstrap";

import * as path from "../../constants/routes";
import { register } from "../../queries";
import { saveData } from '../../utils';

const SignUp = props => {
  const [state] = useState({ error: "" });
  const register = useCallback((values, { setErrors }) => {
    const { fullName, email, password1, password2 } = values;
    props
      .register({
        variables: {
          fullName,
          email: email,
          password1: password1,
          password2: password2
        }
      })
      .then(response => {
        if (response.data.register.success) {
          const token = response.data.register.token;

          saveData('token', token)
          props.history.push(path.DASHBOARD);
        } else {
          let errors = {};
          response.data.register.error.validationErrors.map(
            error => (errors[error["field"]] = error["messages"].join(" "))
          );
          setErrors(errors);
        }
      });
  }, []);
  return (
    <Container>
      <SignUpForm register={register} error={state.error} />
    </Container>
  );
};

export default graphql(register, { name: "register" })(SignUp);
