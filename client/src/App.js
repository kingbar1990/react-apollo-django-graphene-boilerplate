import React, { lazy, Suspense, useState } from "react";
import { Switch, Route } from "react-router";

import * as path from "./constants/routes";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Main from "./components/Main";
import Loader from "./components/Loader";

import i18n from "./i18n";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Tasks = lazy(() => import("./pages/Dashboard/Tasks"));
const Profile = lazy(() => import("./pages/Dashboard/Profile"));
const ConfirmEmail = lazy(() => import("./pages/ConfirmEmail"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const Projects = lazy(() => import("./pages/Dashboard/Projects"));

export default () => {
  const [language, setLanguage] = useState("en");

  i18n.changeLanguage(language);

  const handleLanguageChange = event => {
    setLanguage(event.target.value);
    i18n.changeLanguage(language);
  };
  return (
    <Switch>
      <Route exact path={path.HOME} component={Home} />
      <Route exact path={path.SIGN_UP} component={SignUp} />
      <Route exact path={path.SIGN_IN} component={Login} />
      <Main handleLanguageChange={handleLanguageChange}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              exact
              path={path.DASHBOARD}
              render={props => <Dashboard {...props} />}
            />
            <Route
              exact
              path={path.TASKS}
              render={props => <Tasks {...props} />}
            />
            <Route
              exact
              path={path.PROFILE}
              render={props => <Profile {...props} />}
            />
            <Route
              exact
              path={path.CONFIRM_EMAIL}
              render={props => <ConfirmEmail {...props} />}
            />
            <Route
              exact
              path={path.RESET_PASSWORD}
              render={props => <ResetPassword {...props} />}
            />
            <Route
              exact
              path={path.PROJECTS}
              render={props => <Projects {...props} />}
            />
            <Route render={props => <PageNotFound {...props} />} />
          </Switch>
        </Suspense>
      </Main>
    </Switch>
  );
};
