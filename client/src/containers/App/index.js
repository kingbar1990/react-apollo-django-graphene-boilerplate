import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Switch, Route } from "react-router";

const Home = lazy(() => import('../../pages/Home'));
const SignUp = lazy(() => import('../../pages/SignUp'));
const Login = lazy(() => import('../../pages/Login'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const PrivateRoute = lazy(() => import('../../components/PrivateRoute'));
const Tasks = lazy(() => import('../../pages/Dashboard/Tasks'));
const Profile = lazy(() => import('../../pages/Dashboard/Profile'));
const PageNotFound = lazy(() => import('../../components/PageNotFound'));

class App extends Component {
  render() {
    return (
      <div className="flexible-content">
        <Suspense fallback={<div className="loader"></div>}>
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
            <PrivateRoute
              exact
              path="/dashboard/tasks"
              component={Tasks}
              isAuth={this.props.isAuth}
            />
            <PrivateRoute
              exact
              path="/dashboard/profile"
              component={Profile}
              isAuth={this.props.isAuth}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
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
