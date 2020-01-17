import React from "react";
import { Query } from 'react-apollo';
import { getUsers } from '../../../queries';

import { Formik, Form, Field } from "formik";
import { Button  } from "mdbreact";
import { ReactstrapInput } from "reactstrap-formik";

import { ProjectSchema } from "./validation";

const CreateProjectForm = props => (
  <Formik
    initialValues={{
      name: "",
      developer: "",
      budget: "",
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
              name="budget"
              type="number"
              max="2000000000"
              component={ReactstrapInput}
              label="Budget"
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
                    {data.users.map(user => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.fullName}
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

export default CreateProjectForm;
