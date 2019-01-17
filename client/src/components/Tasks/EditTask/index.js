import React from "react";
import IosClose from 'react-ionicons/lib/IosClose';

import { Container, Modal } from "mdbreact";
import EditTaskForm from './EditTaskForm';

const EditTask = (props) => {
  return (
    <Container>
      <Modal isOpen={props.isActive} centered>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Edit task</h3>
            <IosClose onClick={props.closeModal} fontSize="30px" color="#007bff"/>
          </div>
        </div>
        <EditTaskForm {...props} />
      </Modal>
    </Container>
  );
};

export default EditTask;