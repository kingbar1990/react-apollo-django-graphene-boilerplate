import React from "react";
import {
  Container,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "mdbreact";

const ModalDelete = ({ isActive, closeModal, deleteTask, id }) => {
  return (
    <Container>
      <Modal isOpen={isActive} centered>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            No
          </Button>
          <Button color="primary" onClick={() => deleteTask(id)}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ModalDelete;
