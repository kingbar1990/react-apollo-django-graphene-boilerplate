import React from "react";
import { Route, withRouter, Redirect } from "react-router";

import Home from "../../pages/Home";
import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import { AUTH_TOKEN } from "../../constants";
import { verifyToken } from "./queries";
import { Query, Mutation } from "react-apollo";
import { graphql, compose } from "react-apollo";


const PrivateRoute = ({ component: Component, ...rest }) => (
  //alert(rest);
  <Mutation
    mutation={verifyToken}
    variables={{'token': localStorage.getItem('token')}}
    //onCompleted={data => data.verifyToken.payload.user_id}
  >
    {mutation => (
      //let a = 1;
      // mutation() !== 1
      //   ? <div>1</div>
      //   : <div>2</div>

      <div onClick={mutation}>111</div>


      // <Route {...rest} render={(props) => (
      //   localStorage.getItem(AUTH_TOKEN) !== null
      //     ? <Component {...props} />
      //     : <Redirect to={{
      //         pathname: "/login",
      //         state: { from: props.location }
      //       }} />
      // )} />
    )}
  </Mutation>

)

const App = () => (
  <div className="flexible-content">
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
  </div>
)

//export default withRouter(App);

export default withRouter(
  compose(
    graphql(verifyToken, {'name': 'verifyToken'}),
  )(App),
);
