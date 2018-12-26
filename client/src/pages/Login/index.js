import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Container } from "reactstrap";

import { LoginForm } from "../../components/LoginForm";
import { login } from "./queries";
import { AUTH_TOKEN } from "../../constants";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  handleInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  login = (values, { setErrors }) => {
    this.props
      .login({
        variables: {
          username: values.username,
          password: values.password
        }
      })
      .then(response => {
        if (!response.data.login.error) {
          const token = response.data.login.token;

          localStorage.setItem(AUTH_TOKEN, token);
          localStorage.setItem("isAuth", true);
          this.props.history.push("/dashboard");
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
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <LoginForm
            handleInput={this.handleInput}
            login={this.login}
            error={this.state.error}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default graphql(login, { name: "login" })(Login);
