import React from 'react';
import { Route, withRouter } from 'react-router';

import Home from '../../pages/Home';
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import TopNavigation from '../../components/TopNavigation';
import SideNavigation from '../../components/SideNavigation';
import Footer from '../../components/Footer';


const App = () => (

  <div className="flexible-content">
    <TopNavigation />
    <SideNavigation />
    <main id="content" className="p-5">
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
    </main>
    <Footer />
  </div>
)

export default withRouter(App);
