import React, { useState } from "react";
import { graphql, compose } from "react-apollo";

import Profile from "../../../components/UserProfile";
import UserEditForm from "../../../components/Forms/UserEditForm";

import { getBase64 } from "../../../utils";
import { User, editUser } from "../../../queries";

const EditUser = ({ edit, user }) => {
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
    const { fullName, email } = values;
    edit({
      variables: {
        fullName: fullName || user.me.firstName,
        email: email,
        avatar: state.avatar
      },
      refetchQueries: [{ query: User }]
    }).then(response => {
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

  if (user.loading) return null;
  const userProfile = user.me;
  return (
    <div className="row p-5">
      <Profile profile={userProfile} />
      <UserEditForm
        initialValues={userProfile}
        handleEditUser={handleEditUser}
        handleImageChange={handleImageChange}
        error={state.imageError}
      />
    </div>
  );
};

export default compose(
  graphql(editUser, { name: "edit" }),
  graphql(User, { name: "user" })
)(EditUser);
