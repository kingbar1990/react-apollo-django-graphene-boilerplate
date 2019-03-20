import React, { useState, Fragment } from "react";
import { graphql, compose } from "react-apollo";

import Profile from "../../../components/UserProfile";
import UserEditForm from "../../../components/Forms/UserEditForm";

import { getBase64 } from "../../../utils";
import { withAuth } from "../../../hocs/PrivateRoute";
import { User, editUser } from "../../../queries";

const EditUser = props => {
  const [state, setState] = useState({
    avatar: "",
    imageError: null
  });

  const handleImageChange = e => {
    try {
      if (!e.target.files) {
        return;
      }
      let file = e.target.files[0];
      if (file.size <= 1048576) {
        getBase64(file)
          .then(image => (file = image))
          .then(() => setState({ avatar: file, imageError: null }));
      }
      setState({ ...state, imageError: "max size 1MB" });
    } catch (error) {}
  };

  const handleEditUser = (values, { setErrors }) => {
    let { firstName, email } = values;
    props
      .edit({
        variables: {
          firstName: firstName || props.user.me.firstName,
          email: email,
          avatar: state.avatar
        },
        refetchQueries: [{ query: User }]
      })
      .then(response => {
        if (response.data.editUser.error.validationErrors.length) {
          let errors = {};
          response.data.editUser.error.validationErrors.map(error => {
            if (error["field"] === "email") {
              errors["email"] = error["messages"].join(" ");
            } else {
              errors[error] = error["messages"];
            }
            return null;
          });
          setErrors(errors);
        }
      });
  };

  if (props.user.loading) return null;
  const user = props.user.me;
  return (
    <Fragment>
      <div className="row p-5">
        <Profile profile={user} />
        <UserEditForm
          initialValues={user}
          handleEditUser={handleEditUser}
          handleImageChange={handleImageChange}
          error={state.imageError}
        />
      </div>
    </Fragment>
  );
};

export default compose(
  graphql(editUser, { name: "edit" }),
  graphql(User, { name: "user" })
)(withAuth(EditUser));
