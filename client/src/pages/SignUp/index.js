import React from 'react';
import { graphql } from 'react-apollo';
import { Container } from 'reactstrap';

import { SignUpForm }  from '../../components/SignUpForm';
import { register } from './queries';


class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      email: '',
      password1: '',
      password2: '',
      error: '',
    };
  }

  register = (values, { setErrors }) => {
    this.props
      .register({
        variables: {
          fullName: values.fullName,
          email: values.email,
          password1: values.password1,
          password2: values.password2,
        },
      })
      .then((response) => {
        if (response.data.register.success) {
          this.props.history.push('/timetracker');
        } else {
          let errors = {};
          for (let error of response.data.register.error.validationErrors) {
            let messages = "";
            for (let message in error['messages']) {
              messages = messages.concat(error['messages'][message]);
            }
            errors[error['field']] = messages;
          }
          setErrors(errors);
        }
      })
  };

  handleInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
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

export default graphql(register, { name: 'register' })(SignUp);
