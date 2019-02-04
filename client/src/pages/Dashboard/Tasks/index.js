import React from "react";
import { graphql, compose } from "react-apollo";

import { createTask, getTasks, deleteTask, updateTask } from "../../../queries";
import { getCurrentDate } from "../../../utils";

import TableHeader from "../../../components/Tasks/TaskTable/TableHeader";
import TaskTable from "../../../components/Tasks/TaskTable";
import Modals from "../../../components/Tasks/Modals";

import "react-table/react-table.css";
import "../../../index.css";

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalDelete: false,
      modalEdit: false,
      modalCreate: false,
      page: 1,
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

  handleSwitchModal = (type, task) => {
    this.setState(state => ({
      [type]: !state[type],
      task: task,
      id: task.id
    }));
  };

  handleActiveModal = type => {
    this.setState(state => ({
      [type]: !state[type]
    }));
  };

  handleDateChange = date => {
    this.setState({
      date: getCurrentDate(date)
    });
  };

  handleCreateTask = (values, { setErrors }) => {
    const statusValue = document.getElementById("statusSelect").value;
    const userId = document.getElementById("userId").value;
    const { title, description, estimatedTime } = values;
    const { date, page } = this.state;
    try {
      this.props.taskCreate({
        variables: {
          taskId: 1161,
          name: title,
          description: description,
          status: statusValue || 2,
          dueDate: date || getCurrentDate(new Date()),
          estimatedTime: estimatedTime,
          assignedTo: userId
        },
        refetchQueries: [{ query: getTasks, variables: { page: page } }]
      });
      this.setState({ modalCreate: false });
    } catch (error) {
      return setErrors(error);
    }
  };

  handleUpdateTask = (values, { setErrors }) => {
    const statusValue = document.getElementById("statusSelect").value;
    const userId = document.getElementById("userId").value;
    const { title, description, estimatedTime } = values;
    const { id, date, page } = this.state;
    try {
      this.props.taskUpdate({
        variables: {
          taskId: id,
          name: title,
          description: description,
          status: statusValue || 2,
          dueDate: date || getCurrentDate(new Date()),
          estimatedTime: estimatedTime,
          assignedTo: userId
        },
        refetchQueries: [{ query: getTasks, variables: { page: page } }]
      });
      this.setState({ modalEdit: false });
    } catch (error) {
      return setErrors(error);
    }
  };

  handleDeleteTask = async () => {
    const { id, page } = this.state;
    try {
      await this.props.taskDelete({
        variables: {
          taskId: id
        },
        refetchQueries: [{ query: getTasks, variables: { page: page } }]
      });
      this.setState({ modalDelete: false });
    } catch (error) {
      return false;
    }
  };

  fetchData = item => {
    const page = this.state.page;
    this.setState({
      page: item === "prev" ? page - 1 : page + 1
    });
  };

  render() {
    const { modalCreate, modalEdit, modalDelete, page, task, id } = this.state;
    return (
      <div>
        <TableHeader
          title="Task list"
          modalCreate={() => this.handleActiveModal("modalCreate")}
        />
        <TaskTable
          fetchData={this.fetchData}
          page={page}
          modal={this.handleSwitchModal}
        />
        <Modals
          modalCreate={modalCreate}
          modalEdit={modalEdit}
          modalDelete={modalDelete}
          handleActiveModal={this.handleActiveModal}
          handleCreateTask={this.handleCreateTask}
          handleUpdateTask={this.handleUpdateTask}
          handleDateChange={this.handleDateChange}
          deleteTask={this.handleDeleteTask}
          task={task}
          id={id}
        />
      </div>
    );
  }
}

export default compose(
  graphql(createTask, {
    name: "taskCreate"
  }),
  graphql(updateTask, {
    name: "taskUpdate"
  }),
  graphql(deleteTask, {
    name: "taskDelete"
  })
)(Tasks);
