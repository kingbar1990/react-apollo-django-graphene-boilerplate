import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { SignUpForm } from '../../components/SignUpForm';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password1: '',
      password2: '',
      errors: '',
    };
  }

  register = (e) => {
    console.log('register');
    console.log(this.state);
    e.preventDefault();
    this.props
      .register({
        variables: {
          email: this.state.email,
          password1: this.state.password1,
          password2: this.state.password2,
          fullName: this.state.fullName,
        },
      })
      .then((response) => {
        console.log('!!!');
        if (response.data.register.errors.length === 0) {
          console.log('no errors');

          this.props.history.push('/timetracker');
        } else {
          console.log(response.data.register.errors);
          this.setState({ errors: response.data.register.errors });
        }
      })


  };

  handleInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <SignUpForm
        handleInput={this.handleInput}
        register={this.register}
        errors={this.state.errors}
      />
    );
  }
}

const register = gql`
mutation register($email: String!, $password1: String!, $password2: String!, $fullName: String!) {
  register(email: $email, password1: $password1, password2: $password2, fullName: $fullName) {
    errors
    token
    user {
      id
      email
      fullName
    }
  }
}
`;


export default graphql(register, { name: 'register' })(SignUp);
