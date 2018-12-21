import React from "react";
import { Route, withRouter, Redirect } from "react-router";

import Home from "../../pages/Home";
import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const App = () => (
  <div className="flexible-content">
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
  </div>
)

export default withRouter(App);
