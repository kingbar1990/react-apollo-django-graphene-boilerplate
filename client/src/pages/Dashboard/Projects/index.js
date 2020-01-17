import React, { useState, Fragment } from "react";
import { graphql } from "react-apollo";
import _ from "lodash";
import { createProject, getProjects, deleteProject, updateProject } from "../../../queries";

import TableHeader from "../../../components/Projects/ProjectTable/TableHeader";
import ProjectTable from "../../../components/Projects/ProjectTable";
import Modals from "../../../components/Projects/Modals";

import i18n from "../../../i18n";
import "react-table/react-table.css";
import "../../../index.css";

const Projects = ({ projectCreate, projectUpdate, projectDelete }) => {
  const [state, setState] = useState({
    modalDelete: false,
    modalEdit: false,
    modalCreate: false,
    page: 1,
    project: {
      name: "",
      description: "",
      budget: "",
      deadline: "",
      developer: ""
    },
    id: ""
  });

  const handleCreateProject = (values, { setErrors }) => {
    const userId = document.getElementById("userId").value;
    const { name, description, deadline, budget } = values;
    const { page } = state;
    try {
      const response =  projectCreate({
        variables: {
          name: name,
          description: description,
          deadline: deadline,
          budget: budget,
          developer: userId
        },
        refetchQueries: [{ query: getProjects, variables: { page: page } }]

      });
      setState({ ...state, modalCreate: false });
    } catch (error) {
      setErrors(error);
    }
  };

  const handleUpdateProject = (values, { setErrors }) => {
    const userId = document.getElementById("userId").value;
    const { name, description, budget, deadline } = values;
    const { id, page } = state;
    try {
      projectUpdate({
        variables: {
          projectId: id,
          name: name,
          description: description,
          deadline: deadline,
          budget: budget,
          developer: userId
        },
        refetchQueries: [{ query: getProjects, variables: { page: page } }]
      });
      setState({ ...state, modalEdit: false });
    } catch (error) {
      setErrors(error);
    }
  };

  const handleDeleteProject = async () => {
    const { id, page } = state;
    try {
      await projectDelete({
        variables: {
          projectId: id
        },
        refetchQueries: [{ query: getProjects, variables: { page: page } }]
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

  const handleSwitchModal = (type, project) => {
    setState({
      ...state,
      [type]: !state[type],
      project: project,
      id: project.id
    });
  };

  const fetchData = item => {
    const page = state.page;
    setState({
      ...state,
      page: item === "prev" ? page - 1 : page + 1
    });
  };

  return (
    <Fragment>
      <TableHeader
        title={i18n.t("Project list")}
        modalCreate={() => handleActiveModal("modalCreate")}
      />
      <ProjectTable
        fetchData={fetchData}
        page={state.page}
        modal={handleSwitchModal}
      />
      <Modals
        modalCreate={state.modalCreate}
        modalEdit={state.modalEdit}
        modalDelete={state.modalDelete}
        handleActiveModal={handleActiveModal}
        handleCreateProject={handleCreateProject}
        handleUpdateProject={handleUpdateProject}
        deleteProject={handleDeleteProject}
        project={state.project}
        id={state.id}
      />
    </Fragment>
  );
};

export default _.flowRight(
  graphql(createProject, {
    name: "projectCreate"
  }),
  graphql(updateProject, {
    name: "projectUpdate"
  }),
  graphql(deleteProject, {
    name: "projectDelete"
  })
)(Projects);
