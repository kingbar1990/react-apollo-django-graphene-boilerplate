import React from "react";
import { graphql, compose } from "react-apollo";
import ReactTable from "react-table";

import { getTasks, deleteTask } from "../../../queries";

import Dashboard from "../../../containers/Dashboard";
import ModalDelete from "./ModalDelete";

import "react-table/react-table.css";

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      modalDelete: false,
      id: ""
    };
  }

  handleDeleteTask = async id => {
    try {
      const task = await this.props.taskDelete({
        variables: {
          taskId: id
        },
        refetchQueries: [{ query: getTasks }]
      });
      this.setState({ modalDelete: false });
      return task;
    } catch (error) {}
  };

  handleSwitchModalDelete = id => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      id: id
    });
  };

  render() {
    const { modalDelete, id } = this.state;
    return (
      <Dashboard>
        <ModalDelete
          isActive={modalDelete}
          closeModal={this.handleSwitchModalDelete}
          deleteTask={this.handleDeleteTask}
          id={id}
        />
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
                  <button>Edit</button>
                  <button
                    onClick={() =>
                      this.handleSwitchModalDelete(row.original.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              )
            }
          ]}
          loading={this.props.tasks.loading}
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
  }),
  graphql(deleteTask, {
    name: "taskDelete"
  })
)(Tasks);
