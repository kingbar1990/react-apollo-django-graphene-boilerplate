import React from "react";
import { graphql, compose } from "react-apollo";
import { getTasks, deleteTask, createTask, updateTask } from "../../../queries";
import ReactTable from "react-table";
import IosRemoveCircleOutline from "react-ionicons/lib/IosRemoveCircleOutline";
import IosCreateOutline from "react-ionicons/lib/IosCreateOutline";

import { getCurrentDate } from "../../../utils";

import Dashboard from "../../../containers/Dashboard";
import TableHeader from "../../../components/Tasks/TableHeader";
import ModalDelete from "../../../components/Tasks/ModalDelete";
import Modal from "../../../components/Tasks/modalForm";
import CreateTaskForm from "../../../components/Tasks/CreateTask/CreateTaskForm";
import EditTaskForm from "../../../components/Tasks/EditTask/EditTaskForm";

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
        name: "",
        description: "",
        status: "",
        dueDate: "",
        estimatedTime: "",
        assignedTo: ""
      },
      id: ""
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
    } catch (error) {
      return false;
    }
  };

  handleCreateTask = async (values, { setErrors }) => {
    const statusValue = document.getElementById("statusSelect").value;
    const userId = document.getElementById("userId").value;
    const { title, description, estimatedTime } = values;
    try {
      await this.props.taskCreate({
        variables: {
          taskId: 1161,
          name: title,
          description: description,
          status: statusValue || 2,
          dueDate: this.state.date || getCurrentDate(new Date()),
          estimatedTime: estimatedTime,
          assignedTo: userId
        },
        refetchQueries: [{ query: getTasks }]
      });
      this.setState({ modalCreate: false });
    } catch (error) {
      return setErrors(error);
    }
  };

  handleUpdateTask = async (values, { setErrors }) => {
    const statusValue = document.getElementById("statusSelect").value;
    const userId = document.getElementById("userId").value;
    const { title, description, estimatedTime } = values;
    try {
      await this.props.taskUpdate({
        variables: {
          taskId: this.state.id,
          name: title,
          description: description,
          status: statusValue || 2,
          dueDate: this.state.date || getCurrentDate(new Date()),
          estimatedTime: estimatedTime,
          assignedTo: userId
        },
        refetchQueries: [{ query: getTasks }]
      });
      this.setState({ modalEdit: false });
    } catch (error) {
      return setErrors(error);
    }
  };

  handleSwitchModal = (type, task) => {
    this.setState(state => ({
      [type]: !state[type],
      task: task,
      id: task.id
    }));
  };

  handleActiveModal = type => {
    this.setState(state => ({
      [type]: !state[type],
    }));
  };

  handleDateChange = date => {
    this.setState({
      date: getCurrentDate(date)
    });
  };

  render() {
    const { modalDelete, modalCreate, modalEdit, id } = this.state;
    const tasks = this.props.tasks;
    return (
      <Dashboard>
        <TableHeader title="Task List" modalCreate={() => this.handleActiveModal('modalCreate')} />
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
                    onClick={() => this.handleSwitchModal("modalEdit", row.original)}
                    fontSize="30px"
                    color="#007bff"
                  />
                  <IosRemoveCircleOutline
                    onClick={() => this.handleSwitchModal("modalDelete", row.original)}
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
        <ModalDelete
          isActive={modalDelete}
          closeModal={() => this.handleActiveModal('modalDelete')}
          deleteTask={this.handleDeleteTask}
          id={id}
        />
        <Modal
          isActive={modalCreate}
          title="Create task"
          closeModal={() => this.handleActiveModal('modalCreate')}
        >
          <CreateTaskForm
            submitForm={this.handleCreateTask}
            changeDate={this.handleDateChange}
          />
        </Modal>
        <Modal
          isActive={modalEdit}
          title="Edit task"
          closeModal={() => this.handleActiveModal('modalEdit')}
        >
          <EditTaskForm
            submitForm={this.handleUpdateTask}
            changeDate={this.handleDateChange}
            {...this.state.task}
          />
        </Modal>
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
  }),
  graphql(updateTask, {
    name: "taskUpdate"
  })
)(Tasks);
