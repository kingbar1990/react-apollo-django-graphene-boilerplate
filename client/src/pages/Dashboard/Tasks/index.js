import React from "react";
import { graphql, compose } from "react-apollo";
import ReactTable from "react-table";

import { getTasks, deleteTask, createTask } from "../../../queries";

import Dashboard from "../../../containers/Dashboard";
import ModalDelete from "./ModalDelete";
import ModalCreate from "./CreateTask";

import "react-table/react-table.css";

class Tasks extends React.Component {   
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      modalDelete: false,
      modalCreate: false,
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

  handleSubmitForm = async values => {
    const statusValue = document.getElementById('statusSelect').value;
    const date = document.getElementById('date').value;
    const {
      title,
      description,
      assignedTo,
      estimateTime,
    } = values;
    try {
      const task = await this.props.taskCreate({
        variables: {
          taskId: 1161,
          name: title,
          description: description,
          status: statusValue,
          dueDate: date,
          assignedTo: assignedTo,
          estimateTime: estimateTime,
        },
        refetchQueries: [{ query: getTasks }]
      });
      this.setState({ modalCreate: false });
      return task;
    } catch (error) {}
  };
  

  handleSwitchModalDelete = (id) => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      id: id
    });
  };
  
  handleSwitchModalCreate = () => {
    this.setState({
      modalCreate: !this.state.modalCreate,
    });
  };

  render() {
    const { modalCreate, modalDelete, id } = this.state;
    return (
      <Dashboard>
        <ModalDelete
          isActive={modalDelete}
          closeModal={this.handleSwitchModalDelete}
          deleteTask={this.handleDeleteTask}
          id={id}
        />
        <ModalCreate
          isActive={modalCreate}
          closeModal={this.handleSwitchModalCreate}
          submitForm={this.handleSubmitForm}
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
        <button onClick={this.handleSwitchModalCreate}>Create new task</button>
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
  }),
  graphql(createTask, {
    name: "taskCreate"
  })
)(Tasks);
