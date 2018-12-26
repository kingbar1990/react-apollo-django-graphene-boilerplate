import React from "react";
import { Route, Redirect } from "react-router-dom";

export default class PrivateRoute extends React.Component {
  async componentDidMount() {
    if (localStorage.getItem("token")) {
      await this.props
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
        })
        .catch(e => {
          if (e.message) window.location.href = "/login";
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
