import React from "react";
import { Switch, Route } from "react-router";

import Home from "../../pages/Home";
import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import PrivateRoute from "../../components/PrivateRoute";

import { verifyToken } from "./queries";
import { graphql } from "react-apollo";

class App extends React.Component {
  render() {
    return (
      <div className="flexible-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            verifyToken={this.props.verifyToken}
          />
        </Switch>
      </div>
    );
  }
}

export default graphql(verifyToken, { name: "verifyToken" })(App);
