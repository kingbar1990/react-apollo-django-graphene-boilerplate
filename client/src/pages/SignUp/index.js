import React from "react";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as path from "../../constants/routes";
import { islogin } from "../../actions";
import { Container } from "reactstrap";

import { SignUpForm } from "../../components/Forms/SignUpForm";
import { register } from "../../queries";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      password1: "",
      password2: "",
      error: ""
    };
  }

  handleInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  register = (values, { setErrors }) => {
    const { fullName, email, password1, password2 } = values;
    this.props
      .register({
        variables: {
          fullName: fullName,
          email: email,
          password1: password1,
          password2: password2
        }
      })
      .then(response => {
        if (response.data.register.success) {
          const token = response.data.register.token;

          this.props.islogin(token, true);
          this.props.history.push(path.DASHBOARD);
        } else {
          let errors = {};
          response.data.register.error.validationErrors.map(
            error => (errors[error["field"]] = error["messages"].join(" "))
          );
          setErrors(errors);
        }
      });
  };

  render() {
    return (
      <Container>
        <SignUpForm
          handleInput={this.handleInput}
          register={this.register}
          error={this.state.error}
        />
      </Container>
    );
  }
}

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
