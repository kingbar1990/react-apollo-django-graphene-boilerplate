import React from "react";
import { graphql, compose } from "react-apollo";

import { withAuth } from "../../../hocs/PrivateRoute";
import { User, editUser } from "../../../queries";

import Dashboard from "../../../containers/Dashboard";
import Loader from "../../../components/Loader";
import UserInfoCard from "../../../components/UserInfoCard";
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
    return this.setState({ imageError: "Max size 1MB" });
  };

  handleEditUser = async (values, { setErrors }) => {
    let { fullName, email } = values;
    if (!this.state.imageError) {
      try {
        await this.props.edit({
          variables: {
            fullName: fullName,
            email: email,
            avatar: this.state.avatar
          },
          refetchQueries: [{ query: User }]
        });
      } catch (error) {
        return setErrors(error);
      }
    }
  };

  render() {
    const user = this.props.user.me || this.props.user;
    if (this.props.user.loading) {
      return (
        <Dashboard>
          <Loader />
        </Dashboard>
      );
    }
    return (
      <Dashboard>
        <div className="row">
          <UserInfoCard profile={user} />
          <UserEditForm
            initialValues={user}
            handleEditUser={this.handleEditUser}
            handleImageChange={this.handleImageChange}
            error={this.state.imageError}
          />
        </div>
      </Dashboard>
    );
  }
}

export default compose(
  withAuth,
  graphql(editUser, { name: "edit" }),
  graphql(User, { name: "user" })
)(EditUser);
