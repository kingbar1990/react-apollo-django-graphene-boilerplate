import React from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";

import * as path from '../../constants/routes';
import { Container } from "reactstrap";

import { ResetPassForm } from "../../components/ResetPassForm";
import { resetPass } from "../../queries";

class ResetPass extends React.Component {
  resetPass = (values, { setErrors }) => {
    this.props
      .resetPass({
        variables: {
          newPassword1: values.newPassword1,
          newPassword2: values.newPassword2,
          confirmToken: values.confirmToken,
          userId: values.userId,
        }
      })
      .then(response => {
        if (!response.data.resetPass.error.validationErrors.length) {
          if (response.data.resetPass.success) {
            alert("Your password has been changed successfully!")
            this.props.history.push(path.HOME);
          } else {
            alert("Your account is unconfirmed.")
          }
        } else {
          let errors = {};
          response.data.resetPass.error.validationErrors.map(error => {
            if (error["field"] === "__all__") {
              errors["new_password2"] = error["messages"].join(" ");
            } else if(error["field"] === "new_password2"){
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
      <React.Fragment>
        <Container>
          <ResetPassForm
            resetPass={this.resetPass}
            uid={this.props.match.params.uid}
            confirmToken={this.props.match.params.confirmToken}
          />
        </Container>
      </React.Fragment>
    );
  }
}


export default compose(
  graphql(resetPass, { name: "resetPass" })
)(ResetPass);
