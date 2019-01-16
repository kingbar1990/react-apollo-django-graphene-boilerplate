import React from "react";
import { graphql, compose } from "react-apollo";
import { getTasks, deleteTask, createTask } from "../../../queries";
import ReactTable from "react-table";
import IosAddCircleOutline from "react-ionicons/lib/IosAddCircleOutline";
import IosRemoveCircleOutline from "react-ionicons/lib/IosRemoveCircleOutline";
import IosCreateOutline from "react-ionicons/lib/IosCreateOutline";

import { setCurrentDate } from "../../../utils";

import Dashboard from "../../../containers/Dashboard";
import ModalDelete from "../../../components/Tasks/ModalDelete";
import ModalCreate from "../../../components/Tasks/CreateTask";
import ModalEdit from "../../../components/Tasks/EditTask";

import "react-table/react-table.css";
import "../../../index.css";

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalDelete: false,
      modalEdit: false,
      modalCreate: false,
      date: "",
      task: {
        name: '',
        description: '',
        status: '',
        dueDate: '',
        estimatedTime: '',
        assignedTo: '',
      },
      id: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks.tasks !== this.props.tasks.tasks) {
      this.props.tasks.refetch();
    }
  }

  handleDeleteTask = async () => {
    try {
      await this.props.taskDelete({
        variables: {
          taskId: this.state.id
        },
        refetchQueries: [{ query: getTasks }]
      });
      this.setState({ modalDelete: false });
    } catch (error) {}
  };

  handleCreateTask = async (values, { setErrors }) => {
    const statusValue = document.getElementById("statusSelect").value;
    const userId = document.getElementById("userId").value;
    const { title, description, estimatedTime, } = values;
    console.log(estimatedTime)
    try {
      await this.props.taskCreate({
        variables: {
          taskId: 1161,
          name: title,
          description: description,
          status: statusValue || 2,
          dueDate: this.state.date || setCurrentDate(new Date()),
          estimatedTime: estimatedTime,
          assignedTo: userId,
        },
        refetchQueries: [{ query: getTasks }]
      });
      this.setState({ modalCreate: false });
    } catch (error) {
      return setErrors(error);
    }
  };

  handleSwitchModal = (type, task) => {
    this.setState({
      [type]: !this.state[type],
      task: task,
      id: task.id
    })
  }
  
  handleCloseEditModal = () => {
    this.setState({
      modalEdit: false
    })
  }

  handleCloseModalDelete = () => {
    this.setState({
      modalDelete: false
    });
  };

  handleSwitchModalCreate = () => {
    this.setState({
      modalCreate: !this.state.modalCreate
    });
  };

  handleDateChange = date => {
    this.setState({
      date: setCurrentDate(date)
    });
  };

  render() {
    const { modalDelete, modalCreate, modalEdit, id, task } = this.state;
    const tasks = this.props.tasks;
    return (
      <Dashboard>
        <ModalDelete
          isActive={modalDelete}
          closeModal={this.handleCloseModalDelete}
          deleteTask={this.handleDeleteTask}
          id={id}
        />
        <ModalCreate
          isActive={modalCreate}
          title="Create task"
          closeModal={this.handleSwitchModalCreate}
          changeDate={this.handleDateChange}
          submitForm={this.handleCreateTask}
        />
        <ModalEdit
         isActive={modalEdit}
         title="Edit task"
         name={task.name}
         description={task.description}
         status={task.status}
         date={task.dueDate}
         estimateTime={task.estimatedTime}
         assignedTo={task.assignedTo}
         closeModal={this.handleCloseEditModal}
         changeDate={this.handleDateChange}
         submitForm={this.handleUpdateTask}
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
                  <IosCreateOutline
                    onClick={() =>
                      this.handleSwitchModal('modalEdit', row.original)
                    }
                    fontSize="30px"
                    color="#007bff"
                  />
                  <IosRemoveCircleOutline
                    onClick={() =>
                      this.handleSwitchModal('modalDelete', row.original)
                    }
                    fontSize="30px"
                    color="#007bff"
                  />
                </div>
              )
            }
          ]}
          loading={tasks.loading}
          defaultPageSize={10}
          className="-striped -highlight table"
        />
        <IosAddCircleOutline
          onClick={this.handleSwitchModalCreate}
          fontSize="30px"
          color="#007bff"
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
  }),
  graphql(createTask, {
    name: "taskCreate"
  })
)(Tasks);
