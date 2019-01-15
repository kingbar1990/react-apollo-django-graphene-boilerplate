import React from "react";
import { Query } from "react-apollo";
import { getUsers } from "../../queries";
import { Formik, Form, Field } from "formik";
import { ReactstrapInput } from "reactstrap-formik";

import DatePicker from "../DatePicker";
import { Container, Button, Modal, ModalHeader } from "mdbreact";
import { TaskSchema } from "../../utils/validations/crateTask";

const CreateTask = ({ isActive, closeModal, changeDate, submitForm }) => {
  return (
    <Container>
      <Modal isOpen={isActive} centered>
        <ModalHeader>
          Create task
          <Button onClick={closeModal} color="secondary">
            No
          </Button>
        </ModalHeader>
        <Formik
          initialValues={{
            title: "",
            description: "",
            estimatedTime: 0
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
                  <select
                    id="statusSelect"
                    name="status"
                    className="browser-default custom-select position-relative form-group"
                  >
                    <option value="2">ToDo</option>
                    <option value="1">Done</option>
                    <option value="0">InProgress</option>
                  </select>
                  <div className="position-relative form-group">
                    <label>Due date</label>
                    <DatePicker onDateChange={changeDate} />
                  </div>
                  <Query query={getUsers}>
                    {({ loading, error, data }) => {
                      if (loading) return "Loading...";
                      if (error) return `Error! ${error.message}`;
                      return (
                        <select
                          id="userId"
                          name="status"
                          className="browser-default custom-select position-relative form-group"
                        >
                          {data.users.map(user => (
                            <option key={user.id} value={user.id}>
                              {user.fullName}
                            </option>
                          ))}
                        </select>
                      );
                    }}
                  </Query>
                  <Field
                    name="estimatedTime"
                    type="number"
                    component={ReactstrapInput}
                    label="Estimate Time"
                  />
                  <Button color="primary" type="submit">
                    Save
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
