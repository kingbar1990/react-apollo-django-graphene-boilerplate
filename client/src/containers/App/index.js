import React from 'react';
import { Route, withRouter } from 'react-router';

import Home from '../../pages/Home';
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';


const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/login" component={Login} />
  </div>
)

export default withRouter(App);
