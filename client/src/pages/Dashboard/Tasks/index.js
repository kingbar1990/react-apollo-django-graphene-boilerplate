import React from "react";
import { graphql, compose } from "react-apollo";
import { getTasks, deleteTask, createTask } from "../../../queries";
import ReactTable from "react-table";
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline'
import IosRemoveCircleOutline from 'react-ionicons/lib/IosRemoveCircleOutline';
import IosCreateOutline from 'react-ionicons/lib/IosCreateOutline';

import Dashboard from "../../../containers/Dashboard";
import ModalDelete from "../../../components/Tasks/ModalDelete";
import ModalCreate from "../../../components/Tasks/CreateTask";

import "react-table/react-table.css";
import "../../../index.css"

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalDelete: false,
      modalCreate: false,
      id: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks.tasks !== this.props.tasks.tasks) {
      this.props.tasks.refetch();
    }
  }

  handleDeleteTask = async id => {
    try {
      await this.props.taskDelete({
        variables: {
          taskId: id
        },
        refetchQueries: [{ query: getTasks }]
      });
      this.setState({ modalDelete: false });
    } catch (error) {}
  };

  handleSubmitForm = async (values, { setErrors }) => {
    const statusValue = document.getElementById("statusSelect").value;
    const date = document.getElementById("date").value;
    const userId = document.getElementById("userId").value;
    const { title, description, estimatedTime } = values;
    try {
      await this.props.taskCreate({
        variables: {
          taskId: 1161,
          name: title,
          description: description,
          status: statusValue,
          dueDate: date,
          assignedTo: userId,
          estimatedTime: estimatedTime
        },
        refetchQueries: [{ query: getTasks }]
      });
      this.setState({ modalCreate: false });
    } catch (error) {
      return setErrors(error);
    }
  };

  handleSwitchModalDelete = id => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      id: id
    });
  };

  handleSwitchModalCreate = () => {
    this.setState({
      modalCreate: !this.state.modalCreate
    });
  };

  render() {
    const { modalCreate, modalDelete, id } = this.state;
    const tasks = this.props.tasks;
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
          data={tasks.tasks}
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
                  Cell: row => row.original.assignedTo.fullName
                }
              ]
            },
            {
              Header: "Actions",
              Cell: row => (
                <div>
                  <IosCreateOutline fontSize="30px" color="#007bff"/>
                  <IosRemoveCircleOutline 
                    onClick={() =>
                      this.handleSwitchModalDelete(row.original.id)
                    }
                    fontSize="30px" color="#007bff"
                  />
                </div>
              )
            }
          ]}
          loading={tasks.loading}
          defaultPageSize={10}
          className="-striped -highlight table"
        />
        <IosAddCircleOutline onClick={this.handleSwitchModalCreate} fontSize="30px" color="#007bff" />
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
