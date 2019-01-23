import React, { Component } from 'react';

import Modal from '../Modals/ModalForm';
import CreateTaskForm from '../CreateTaskForm';
import EditTaskForm from '../EditTaskForm';
import ModalDelete from "./ModalDelete";

export default class Modals extends Component {
  render() {
    const {
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
    } = this.props;
    return (
      <>
        <Modal
          isActive={modalCreate}
          title="Create task"
          closeModal={() => handleActiveModal('modalCreate')}
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
          closeModal={() => handleActiveModal('modalEdit')}
        >
          <EditTaskForm
            submitForm={handleUpdateTask}
            changeDate={handleDateChange}
            {...task}
          />
        </Modal>
        <ModalDelete
          isActive={modalDelete}
          closeModal={() => handleActiveModal('modalDelete')}
          deleteTask={deleteTask}
          id={id}
        />
      </>
    )
  }
}