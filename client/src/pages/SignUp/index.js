import React, { useState, useCallback } from "react";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { SignUpForm } from "../../components/Forms/SignUpForm";
import { islogin } from "../../actions";
import { Container } from "reactstrap";

import * as path from "../../constants/routes";
import { register } from "../../queries";

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

          props.islogin(token, true);
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      islogin
    },
    dispatch
  );

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  graphql(register, { name: "register" })
)(SignUp);
