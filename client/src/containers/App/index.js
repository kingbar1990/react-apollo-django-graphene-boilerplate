import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Switch, Route } from "react-router";

import * as path from '../../constants/routes';

import { withAuth } from '../../hocs/PrivateRoute';

import Home from "../../pages/Home";
import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import Tasks from "../../pages/Dashboard/Tasks";
import Profile from "../../pages/Dashboard/Profile";
import PageNotFound from "../../components/PageNotFound";
import ConfirmEmail from "../../pages/ConfirmEmail";
import ResetPass from "../../pages/ResetPass";

class App extends Component {
  render() {
    return (
      <div className="flexible-content">
        <Switch>
          <Route exact path={path.HOME} component={Home} />
          <Route exact path={path.SIGN_UP} component={SignUp} />
          <Route exact path={path.SIGN_IN} component={Login} />
          <Route exact path={path.DASHBOARD} component={withAuth(Dashboard)} />
          <Route exact path={path.TASKS} component={withAuth(Tasks)} />
          <Route exact path={path.PROFILE} component={withAuth(Profile)} />
          <Route exact path={path.CONFIRM_EMAIL} component={withAuth(ConfirmEmail)} />
          <Route exact path={path.RESET_PASS} component={withAuth(ResetPass)} />
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
