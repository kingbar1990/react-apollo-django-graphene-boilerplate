import React, { useState, Fragment } from "react";
import { graphql, compose } from "react-apollo";

import { createTask, getTasks, deleteTask, updateTask } from "../../../queries";
import { getCurrentDate } from "../../../utils";

import TableHeader from "../../../components/Tasks/TaskTable/TableHeader";
import TaskTable from "../../../components/Tasks/TaskTable";
import Modals from "../../../components/Tasks/Modals";

import i18n from "../../../i18n";
import "react-table/react-table.css";
import "../../../index.css";

const Tasks = ({ taskCreate, taskUpdate, taskDelete }) => {
  const [state, setState] = useState({
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
  });

  const handleCreateTask = (values, { setErrors }) => {
    const statusValue = document.getElementById("statusSelect").value;
    const userId = document.getElementById("userId").value;
    const { title, description, estimatedTime } = values;
    const { date, page } = state;
    try {
      taskCreate({
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
      setState({ ...state, modalCreate: false });
    } catch (error) {
      setErrors(error);
    }
  };

  const handleUpdateTask = (values, { setErrors }) => {
    const statusValue = document.getElementById("statusSelect").value;
    const userId = document.getElementById("userId").value;
    const { title, description, estimatedTime } = values;
    const { id, date, page } = state;
    try {
      taskUpdate({
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
      setState({ ...state, modalEdit: false });
    } catch (error) {
      setErrors(error);
    }
  };

  const handleDeleteTask = async () => {
    const { id, page } = state;
    try {
      await taskDelete({
        variables: {
          taskId: id
        },
        refetchQueries: [{ query: getTasks, variables: { page: page } }]
      });
      setState({ ...state, modalDelete: false });
    } catch (error) {
      return false;
    }
  };

  const handleActiveModal = type => {
    setState(state => ({
      ...state,
      [type]: !state[type]
    }));
  };

  const handleSwitchModal = (type, task) => {
    setState({
      ...state,
      [type]: !state[type],
      task: task,
      id: task.id
    });
  };

  const fetchData = item => {
    const page = state.page;
    setState({
      ...state,
      page: item === "prev" ? page - 1 : page + 1
    });
  };

  const handleDateChange = date => {
    setState({
      ...state,
      date: getCurrentDate(date)
    });
  };

  return (
    <Fragment>
      <TableHeader
        title={i18n.t("Task list")}
        modalCreate={() => handleActiveModal("modalCreate")}
      />
      <TaskTable
        fetchData={fetchData}
        page={state.page}
        modal={handleSwitchModal}
      />
      <Modals
        modalCreate={state.modalCreate}
        modalEdit={state.modalEdit}
        modalDelete={state.modalDelete}
        handleActiveModal={handleActiveModal}
        handleCreateTask={handleCreateTask}
        handleUpdateTask={handleUpdateTask}
        handleDateChange={handleDateChange}
        deleteTask={handleDeleteTask}
        task={state.task}
        id={state.id}
      />
    </Fragment>
  );
};

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
