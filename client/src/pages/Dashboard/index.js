import React from "react";

import { withAuth } from '../../hocs/PrivateRoute';

import Dashboard from "../../containers/Dashboard";
import GetTasks from "../../components/Statistics/GetTasks";
import GetUsers from "../../components/Statistics/GetUsers";

class Main extends React.Component {
  render() {
    return (
      <Dashboard>
        <GetUsers />
        <GetTasks />
      </Dashboard>
    );
  }
}

export default withAuth(Main);