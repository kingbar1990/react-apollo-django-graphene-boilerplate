import React from "react";
import { Container, Modal } from "mdbreact";
import IosClose from 'react-ionicons/lib/IosClose';

import CreateTaskForm from './CreateTaskForm';

const ModalForm = ({ isActive, closeModal, changeDate, submitForm }) => {
  return (
    <Container>
      <Modal isOpen={isActive} centered>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Create task</h3>
            <IosClose onClick={closeModal} fontSize="30px" color="#007bff"/>
          </div>
        </div>
        <CreateTaskForm changeDate={changeDate} submitForm={submitForm} />
      </Modal>
    </Container>
  );
};

export default ModalForm;
