import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Container } from 'reactstrap';

import { LoginForm } from '../../components/LoginForm';
import { login } from './queries';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  login = (values, { setErrors }) => {
    this.props
      .login({
        variables: {
          username: values.username,
          password: values.password,
        },
      })
      .then((response) => {
        if (!response.data.login.error) {
          this.props.history.push('/timetracker');
        } else {
          let errors = {};
          for (let error of response.data.login.error.validationErrors) {
            let messages = "";
            for (let message in error['messages']) {
              messages = messages.concat(error['messages'][message]);
            }
            if (error['field'] === '__all__') {
              errors['username'] = messages;
              errors['password'] = messages;
            } else {
              errors[error['field']] = messages;
            }
          }
          setErrors(errors);
        }
      })
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

export default graphql(login, { name: 'login' })(Login);
