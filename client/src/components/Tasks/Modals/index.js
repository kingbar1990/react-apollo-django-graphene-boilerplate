import React, { Fragment } from "react";

import Modal from "../../Forms/ModalForm";
import CreateTaskForm from "../../Forms/CreateTaskForm";
import EditTaskForm from "../../Forms/EditTaskForm";
import ModalDelete from "./ModalDelete";

const Modals = ({
  modalCreate,
  modalEdit,
  modalDelete,
  handleActiveModal,
  handleCreateTask,
  handleUpdateTask,
  handleDateChange,
  deleteTask,
  task,
  id
}) => (
  <Fragment>
    <Modal
      isActive={modalCreate}
      title="Create task"
      closeModal={() => handleActiveModal("modalCreate")}
    > 
      <CreateTaskForm
        submitForm={handleCreateTask}
        changeDate={handleDateChange}
        {...task}
      />
    </Modal>
    <Modal
      isActive={modalEdit}
      title="Edit task"
      closeModal={() => handleActiveModal("modalEdit")}
    >
      <EditTaskForm
        submitForm={handleUpdateTask}
        changeDate={handleDateChange}
        {...task}
      />
    </Modal>
    <ModalDelete
      isActive={modalDelete}
      closeModal={() => handleActiveModal("modalDelete")}
      deleteTask={deleteTask}
      id={id}
    />
  </Fragment>
);

export default Modals;
