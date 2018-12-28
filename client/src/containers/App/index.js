import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Switch, Route } from "react-router";

import Home from "../../pages/Home";
import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import PrivateRoute from "../../components/PrivateRoute";

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
            isAuth={this.props.isAuth}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(App);
