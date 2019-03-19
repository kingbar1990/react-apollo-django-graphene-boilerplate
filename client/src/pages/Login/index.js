import React, { useState, useCallback } from "react";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as path from "../../constants/routes";
import { islogin } from "../../actions";
import { Container } from "reactstrap";

import { LoginForm } from "../../components/Forms/LoginForm";
import { login } from "../../queries";

const Login = props => {
  const [state] = useState({ error: "" });
  const login = useCallback((values, { setErrors }) => {
    const { username, password } = values;
    props
      .login({
        variables: {
          username: username,
          password: password
        }
      })
      .then(response => {
        if (!response.data.login.error) {
          const token = response.data.login.token;

          props.islogin(token, true);
          props.history.push(path.DASHBOARD);
        } else {
          let errors = {};
          response.data.login.error.validationErrors.map(error => {
            if (error["field"] === "__all__") {
              errors["username"] = error["messages"].join(" ");
              errors["password"] = error["messages"].join(" ");
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
      <LoginForm login={login} error={state.error} />
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
  graphql(login, { name: "login" })
)(Login);
