import React from "react";
import { graphql, compose } from "react-apollo";
import { getTasks, deleteTask, createTask, updateTask } from "../../../queries";

import { getCurrentDate } from "../../../utils";

import Dashboard from "../../../containers/Dashboard";
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

  render() {
    const { modalCreate, modalEdit, modalDelete, task, id } = this.state;
    return (
      <Dashboard>
        <TaskTable 
          tasks={this.props.tasks} 
          modal={this.handleSwitchModal}
          modalCreate={this.handleActiveModal}
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
      </Dashboard>
    );
  }
}

export default compose(
  graphql(getTasks, {
    options: { fetchPolicy: "no-cache" },
    name: "tasks"
  }),
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
