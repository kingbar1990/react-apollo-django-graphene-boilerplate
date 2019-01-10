import React from "react";
import { MDBContainer } from "mdbreact";

import Dashboard from "../../containers/Dashboard";
import GetTasks from "../../components/Statistics/GetTasks";
import GetUsers from "../../components/Statistics/GetUsers";

import "react-table/react-table.css";
export default class Main extends React.Component {
  render() {
    return (
      <Dashboard>
        <MDBContainer>
          <GetUsers />
          <GetTasks />
        </MDBContainer>
      </Dashboard>
    );
  }
}
