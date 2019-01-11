import React from "react";
import { Container, Button, Modal, ModalHeader } from "mdbreact";
import { Formik, Form, Field } from "formik";
import { ReactstrapInput } from "reactstrap-formik";

import TextField from '@material-ui/core/TextField';

import { TaskSchema } from "./validation";

const CreateTask = ({ isActive, closeModal, submitForm }) => {
  return (
    <Container>
      <Modal isOpen={isActive} centered>
        <ModalHeader>Create task</ModalHeader>
        <Formik
          initialValues={{
            title: "",
            description: "",
            status: '',
            dueDate: '',
            assignedTo: "",
            estimateTime: 0
          }}
          validationSchema={TaskSchema}
          onSubmit={submitForm}
        >
          {() => (
            <div className="card">
              <div className="card-body">
                <Form>
                  <Field
                    name="title"
                    type="text"
                    component={ReactstrapInput}
                    label="Title"
                  />
                  <Field
                    name="description"
                    type="text"
                    component={ReactstrapInput}
                    label="Description"
                  />
                  <label>Status</label>
                  <select id="statusSelect" name="status" className="browser-default custom-select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Field
                    name="assignedTo"
                    type="text"
                    component={ReactstrapInput}
                    label="Assigned to"
                  />
                  <Field
                    name="estimateTime"
                    type="number"
                    component={ReactstrapInput}
                    label="Estimate Time"
                  />
                  <Button onClick={closeModal} color="secondary">
                    No
                  </Button>
                  <Button color="primary" type="submit">
                    Yes
                  </Button>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </Modal>
    </Container>
  );
};

export default CreateTask;
