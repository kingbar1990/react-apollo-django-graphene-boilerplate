import React from "react";
import ReactTable from 'react-table'
import "react-table/react-table.css";

import Dashboard from "../../containers/Dashboard";
import Stat from "../../components/Dashboard/Stats";


class Main extends React.Component {
  render() {
    return (
      <Dashboard>
        <React.Fragment>
          <Stat type={'users'} />
          <Stat type={'tasks'} />
        </React.Fragment>
      </Dashboard>
    );
  }
}

export default Main;
