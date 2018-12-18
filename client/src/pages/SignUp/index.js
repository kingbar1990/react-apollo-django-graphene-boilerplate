import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { SignUpForm } from '../../components/SignUpForm';


class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      email: '',
      password1: '',
      password2: '',
      errors: '',
    };
  }

  register = (values) => {
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
        console.log('response');
        console.log(response);
        if (response.data.register.errors.length === 0) {
          console.log('no errors');
          this.props.history.push('/timetracker');
        } else {
          console.log(response.data.register.errors);
          console.log(response.data.register);
          //this.setState({ errors: response.data.register.errors });
        }
      })


  };

  handleInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <SignUpForm
          handleInput={this.handleInput}
          register={this.register}
          errors={this.state.errors}
        />
      </div>
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
