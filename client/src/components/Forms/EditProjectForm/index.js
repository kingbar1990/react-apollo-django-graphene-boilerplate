import React from "react";
import { Query } from 'react-apollo';

import DayPickerInput from "react-day-picker/DayPickerInput";
import { Formik, Form, Field } from "formik";
import { Button } from "mdbreact";
import { ReactstrapInput } from "reactstrap-formik";

import { getUsers, getAllTasks } from '../../../queries';
import { ProjectSchema } from "../CreateProjectForm/validation";

const EditProjectForm = props => (
  <Formik
    initialValues={{
      name: props.name,
      description: props.description,
      deadline: props.deadline,
      budget: props.budget,
      developer: props.developer
    }}
    validationSchema={ProjectSchema}
    onSubmit={props.submitForm}
  >
    {() => (
      <div className="card">
        <div className="card-body">
          <Form>
            <Field
              name="name"
              type="text"
              component={ReactstrapInput}
              label="Name"
            />
            <Field
              name="description"
              type="text"
              component={ReactstrapInput}
              label="Description"
            />
            <Field
              name='budget'
              type='number'
              max="2000000000"
              component={ReactstrapInput}
              label='Budget'
            />
            <Field
              name="deadline"
              type="date"
              component={ReactstrapInput}
              label="Deadline"
            />
            <label>Developer</label>
            <Query query={getUsers}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>{`Error! ${error.message}`}</p>;
                return (
                  <select
                    id="userId"
                    name="status"
                    className="browser-default custom-select position-relative form-group" 
                  > 
                    <option key={props.developer.id} value={props.developer.id}>
                      {props.developer.fullName}
                    </option>
                    {data.users.map(user => {
                      if (user.fullName !== props.developer.fullName) {
                        return (
                          <option key={user.id} value={user.id}>
                            {user.fullName}
                          </option>
                        );
                      }
                      return null
                    })}
                  </select>
                );
              }}
            </Query>
            <Query query={getAllTasks}>
              {({loading, error, data}) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>{`Error ${error.message}`}</p>
                return (
                  <select
                    id="tasksId"
                    name="tasks"
                    multiple
                    className="browser-default custom-select position-relative form-group"
                  >
                    {data.allTasks.map(task => {
                      return (
                        <option key={task.id} value={task.id}>
                          {task.name}
                        </option>
                      );
                    })}
                  </select>
                );
              }}
            </Query>
            <Button color="primary" type="submit" style={{ margin: 0 }}>
              Save 
            </Button>
          </Form>
        </div>
      </div>
    )}
  </Formik>
);

export default EditProjectForm;
