import React from "react";
import { graphql, compose } from "react-apollo";
import ReactTable from "react-table";

import { getTasks } from '../../../queries';
import { tasksColumns } from '../../../utils/data';

import Dashboard from "../../../containers/Dashboard";

import "react-table/react-table.css";

class Tasks extends React.Component {
  render() {
    return (
      <Dashboard>
        <ReactTable
          data={this.props.tasks.tasks}
          columns={tasksColumns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </Dashboard>
    );
  }
}

export default compose(
  graphql(getTasks, {
    options: { fetchPolicy: "no-cache" },
    name: "tasks"
  })
)(Tasks);
