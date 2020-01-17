import React, { Fragment } from "react";

import Modal from "../../Forms/ModalForm";
import CreateProjectForm from "../../Forms/CreateProjectForm";
import EditProjectForm from "../../Forms/EditProjectForm";
import ModalDelete from "./ModalDelete";

const Modals = ({
  modalCreate,
  modalEdit,
  modalDelete,
  handleActiveModal,
  handleCreateProject,
  handleUpdateProject,
  deleteProject,
  project,
  id
}) => (
  <Fragment>
    <Modal
      isActive={modalCreate}
      title="Create project"
      closeModal={() => handleActiveModal("modalCreate")}
    > 
      <CreateProjectForm
        submitForm={handleCreateProject}
        {...project}
      />
    </Modal>
    <Modal
      isActive={modalEdit}
      title="Edit project"
      closeModal={() => handleActiveModal("modalEdit")}
    >
      <EditProjectForm
        submitForm={handleUpdateProject}
        {...project}
      />
    </Modal>
    <ModalDelete
      isActive={modalDelete}
      closeModal={() => handleActiveModal("modalDelete")}
      deleteProject={deleteProject}
      id={id}
    />
  </Fragment>
);

export default Modals;
