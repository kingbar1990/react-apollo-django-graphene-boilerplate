import React from "react";

import Dashboard from "../../containers/Dashboard";
import GetTasks from "../../components/Statistics/GetTasks";
import GetUsers from "../../components/Statistics/GetUsers";

export default class Main extends React.Component {
  render() {
    return (
      <Dashboard>
        <GetUsers />
        <GetTasks />
      </Dashboard>
    );
  }
}
