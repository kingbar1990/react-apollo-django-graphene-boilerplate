import React from "react";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

import { logout } from "../actions";
import { verifyToken } from "../queries";

export const withAuth = ProtectedRoute => {
   class PrivateRoute extends React.Component {
      async componentWillMount() {
         try {
            const token = JSON.parse(window.localStorage.getItem("token")).token;
            const auth = await this.props.authorization({
               variables: {
                  token: token
               }
            });
            return auth;
         } catch (error) {
            this.props.isLogout();
            return this.props.history.push("/login");
         }
      }
      render() {
         return <ProtectedRoute {...this.props} />;
      }
   }
   return compose(
      graphql(verifyToken, {
         name: "authorization"
      }),
      connect(
         null,
         {
            isLogout: logout
         }
      )
   )(PrivateRoute);
};
