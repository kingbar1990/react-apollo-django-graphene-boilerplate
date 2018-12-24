import React from "react";
import { Route, withRouter, Redirect } from "react-router";

import Home from "../../pages/Home";
import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import { AUTH_TOKEN } from "../../constants";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem(AUTH_TOKEN) !== null
      ? <Component {...props} />
      : <Redirect to={{
          pathname: "/login",
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
