import React from "react";
import { graphql, compose } from "react-apollo";

import { User, editUser } from "../../../queries";

import UserProfile from "../../../components/UserProfile";
import UserEditForm from "../../../components/Forms/UserEditForm";
import { getBase64 } from "../../../utils";

class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {
      avatar: "",
      imageError: null
    };
  }

  handleImageChange = e => {
    if (!e.target.files) {
      return;
    }
    let file = e.target.files[0];
    if (file.size <= 1048576) {
      getBase64(file)
        .then(image => (file = image))
        .then(() => this.setState({ avatar: file, imageError: null }));
    }
    return this.setState({ imageError: "max size 1MB" });
  };

  handleEditUser = (values, { setErrors }) => {
    let { fullName, email } = values;
    this.props
      .edit({
        variables: {
          fullName: fullName || this.props.user.me.fullName,
          email: email,
          avatar: this.state.avatar
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

  render() {
    const user = this.props.user.me;
    if (this.props.user.loading) return null;
    return (
      <div className="row">
        <UserProfile profile={user} />
        <UserEditForm
          initialValues={user}
          handleEditUser={this.handleEditUser}
          handleImageChange={this.handleImageChange}
          error={this.state.imageError}
        />
      </div>
    );
  }
}

export default compose(
  graphql(editUser, { name: "edit" }),
  graphql(User, { name: "user" })
)(EditUser);
