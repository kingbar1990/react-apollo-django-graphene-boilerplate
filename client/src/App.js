import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router";

import * as path from "./constants/routes";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Dashboard/Tasks";
import Profile from "./pages/Dashboard/Profile";
import PageNotFound from "./components/PageNotFound";
import ConfirmEmail from "./pages/ConfirmEmail";
import ResetPass from "./pages/ResetPass";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={path.HOME} component={Home} />
        <Route exact path={path.SIGN_UP} component={SignUp} />
        <Route exact path={path.SIGN_IN} component={Login} />
        <Route exact path={path.DASHBOARD} component={Dashboard} />
        <Route exact path={path.TASKS} component={Tasks} />
        <Route exact path={path.PROFILE} component={Profile} />
        <Route exact path={path.CONFIRM_EMAIL} component={ConfirmEmail} />
        <Route exact path={path.RESET_PASS} component={ResetPass} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

export default withRouter(App);
