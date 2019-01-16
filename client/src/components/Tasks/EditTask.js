import React from "react";
import { Query } from "react-apollo";
import { getUsers } from "../../queries";
import { Formik, Form, Field } from "formik";
import { Container, Modal, Button  } from "mdbreact";
import { ReactstrapInput } from "reactstrap-formik";
import IosClose from 'react-ionicons/lib/IosClose';

import DatePicker from "../DatePicker";

import { TaskSchema } from "../../utils/validations/crateTask";

const ModalForm = (props) => {
  return (
    <Container>
      <Modal isOpen={props.isActive} centered>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>{props.title}</h3>
            <IosClose onClick={props.closeModal} fontSize="30px" color="#007bff"/>
          </div>
        </div>
        <Formik
          initialValues={{
            // id: props,id,
            title: props.name,
            description: props.description,
            status: props.status,
            date: props.date,
            estimateTime: props.estimateTime,
            assignedTo: props.assignedTo
          }}
          validationSchema={TaskSchema}
          onSubmit={props.submitForm}
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
                        <DatePicker onDateChange={props.changeDate} /> 
                      </div>
                  <Field
                    name="estimateTime"
                    type="number"
                    component={ReactstrapInput}
                    label="Estimate Time"
                  />
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
                          <option>{props.assignedTo.fullName}</option>
                          {data.users.map(user => (
                            <option key={user.id} value={user.id}>
                              {user.fullName} 
                            </option>
                          ))}
                        </select>
                      );
                    }}
                  </Query>
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

export default ModalForm;
