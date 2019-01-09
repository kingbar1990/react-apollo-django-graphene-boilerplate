import React from "react";
import { graphql, compose } from "react-apollo";
import ReactTable from "react-table";

import { getTasks } from "../../../queries";

import Dashboard from "../../../containers/Dashboard";

import "react-table/react-table.css";

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }
  }
  render() {
    const { loading } = this.state
    return (
      <Dashboard>
        <ReactTable
          data={this.props.tasks.tasks}
          columns={[
            {
              Header: "General",
              columns: [
                {
                  Header: "Title",
                  accessor: "name"
                },
                {
                  Header: "Description",
                  accessor: "description"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Status",
                  accessor: "status"
                },
                {
                  Header: "Due date",
                  accessor: "dueDate"
                },
                {
                  Header: "Estimated time",
                  accessor: "estimatedTime"
                }
              ]
            },
            {
              Header: "Responsibility",
              columns: [
                {
                  Header: "Assigned to",
                  accessor: "assignedTo.fullName"
                }
              ]
            },
            {
              Header: "CRUD",
              Cell: row => (
                <div>
                  <button onClick={() => console.log(row.original.id)}>Edit</button>
                  <button onClick={() => console.log(row.original.id)}>Delete</button>
                </div>
              )
            }
          ]}
          loading={loading}
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
