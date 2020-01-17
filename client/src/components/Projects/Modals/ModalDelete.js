import React from "react";
import { Container, Modal, MDBBtn } from "mdbreact";
import IosCloseCircleOutline from "react-ionicons/lib/IosCloseCircleOutline";

import "./style.css";

const ModalDelete = ({ isActive, closeModal, deleteProject, id }) => (
   <Container>
      <Modal isOpen={isActive} toggle={closeModal} >
         <div className="wrapp-modal">
            <IosCloseCircleOutline
               onClick={() => deleteProject(id)}
               fontSize="80px"
               color="red"
            />
            <h3>Are you sure ?</h3>
            <h5>
               Do you really want to delete these project ? This procces cannot be
               undone.
            </h5>
         </div>
         <div className="modal-foot">
            <MDBBtn color="primary" onClick={closeModal}>
               No
            </MDBBtn>
            <MDBBtn color="danger" onClick={() => deleteProject(id)}>
               Yes
            </MDBBtn>
         </div>
      </Modal>
   </Container>
);

export default ModalDelete;
