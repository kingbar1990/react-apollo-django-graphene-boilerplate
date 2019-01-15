import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Switch, Route } from "react-router";

import * as path from '../../constants/routes';

import Home from "../../pages/Home";
import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import PrivateRoute from "../../components/PrivateRoute";
import Tasks from "../../pages/Dashboard/Tasks";
import Profile from "../../pages/Dashboard/Profile";
import PageNotFound from "../../components/PageNotFound";
import ResetPass from "../../pages/ResetPass";

class App extends Component {
  render() {
    return (
      <div className="flexible-content">
        <Switch>
          <Route exact path={path.HOME} component={Home} />
          <Route exact path={path.SIGN_UP} component={SignUp} />
          <Route exact path={path.SIGN_IN} component={Login} />
          <PrivateRoute
            exact
            path={path.DASHBOARD}
            component={Dashboard}
            isAuth={this.props.isAuth}
          />
          <PrivateRoute
            exact
            path={path.TASKS}
            component={Tasks}
            isAuth={this.props.isAuth}
          />
          <PrivateRoute
            exact
            path={path.PROFILE}
            component={Profile}
            isAuth={this.props.isAuth}
          />
          <Route
           path="/reset-password"
           component={ResetPass}
         />
          <Route component={PageNotFound} />
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
