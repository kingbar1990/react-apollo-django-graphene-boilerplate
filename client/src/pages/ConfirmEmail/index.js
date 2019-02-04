import React from "react";
import { graphql, compose } from "react-apollo";

import * as path from "../../constants/routes";
import { Container } from "reactstrap";

import { ConfirmEmailForm } from "../../components/Forms/ConfirmEmailForm";
import { confirmEmail } from "../../queries";

class ConfirmEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      error: ""
    };
  }

  handleInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  confirmEmail = (values, { setErrors }) => {
    this.props
      .confirmEmail({
        variables: {
          email: values.email
        }
      })
      .then(response => {
        if (!response.data.confirmEmail.error) {
          alert("Check your email, please!");
          this.props.history.push(path.HOME);
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
  };

  render() {
    return (
      <Container>
        <ConfirmEmailForm
          handleInput={this.handleInput}
          confirmEmail={this.confirmEmail}
          error={this.state.error}
        />
      </Container>
    );
  }
}

export default compose(
  graphql(confirmEmail, { name: "confirmEmail" })
)(ConfirmEmail);
