import React from "react";
import { Route, Redirect } from "react-router-dom";

export default class PrivateRoute extends React.PureComponent {
  render() {
    const { component: Component, rest, isAuth } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
}
