import React from "react";
import { Container, Modal } from "mdbreact";
import IosClose from 'react-ionicons/lib/IosClose';

const ModalForm = (props) => {
  const flex = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
  return (
    <Container>
      <Modal isOpen={props.isActive} toggle={props.closeModal}>
        <div className="card-body">
          <div style={flex}>
            <h3>{props.title}</h3>
            <IosClose onClick={props.closeModal} fontSize="30px" color="#007bff"/>
          </div>
        </div>
        {props.children}
      </Modal>
    </Container>
  );
};

export default ModalForm;
