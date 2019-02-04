import React from "react";
import { graphql } from "react-apollo";

import * as path from "../../constants/routes";
import { Container } from "reactstrap";

import { ResetPasswordForm } from "../../components/Forms/ResetPasswordForm";
import { resetPassword } from "../../queries";

class ResetPassword extends React.Component {
  resetPassword = (values, { setErrors }) => {
    const { newPassword1, newPassword2, confirmToken, userId } = values;
    this.props
      .resetPassword({
        variables: {
          newPassword1: newPassword1,
          newPassword2: newPassword2,
          confirmToken: confirmToken,
          userId: userId
        }
      })
      .then(response => {
        if (!response.data.resetPassword.error.validationErrors.length) {
          if (response.data.resetPassword.success) {
            alert("Your password has been changed successfully!");
            this.props.history.push(path.HOME);
          } else {
            alert("Your account is unconfirmed.");
          }
        } else {
          let errors = {};
          response.data.resetPassword.error.validationErrors.map(error => {
            if (error["field"] === "__all__") {
              errors["new_password2"] = error["messages"].join(" ");
            } else if (error["field"] === "new_password2") {
              errors["newPassword2"] = error["messages"].join(" ");
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
        <ResetPasswordForm
          resetPassword={this.resetPassword}
          uid={this.props.match.params.uid}
          confirmToken={this.props.match.params.confirmToken}
        />
      </Container>
    );
  }
}

export default graphql(resetPassword, { name: "resetPassword" })(ResetPassword);
