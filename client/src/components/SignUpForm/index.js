import React from 'react';
import Error from './error';

export const SignUpForm = (props) => {
  const { handleInput, register, errors } = props;
  return (
    <div className="container-fluid">
      <div
        style={{ minHeight: '90vh' }}
        className="d-flex justify-content-center align-items-center row"
      >
        <form onSubmit={register}>
          <h1>Registration</h1>
          <div className="form-group">
            <label>Full name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Enter your full name"
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handleInput}
            />
            <small id="emailHelp" className="form-text text-muted">
              We will never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password1"
              placeholder="Password"
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm your password</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              placeholder="Password"
              onChange={handleInput}
            />
          </div>

          <Error error={errors} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
