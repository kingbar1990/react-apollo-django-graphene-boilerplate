import React from "react";
import { Route, Redirect } from "react-router-dom";

export default class PrivateRoute extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props
        .verifyToken({
          variables: {
            token: localStorage.getItem("token")
          }
        })
        .then(res => {
          localStorage.setItem(
            "isAuth",
            Boolean(res.data.verifyToken.payload.user_id)
          );
        });
    }
  }
  render() {
    const { component: Component, rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem("isAuth") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}
