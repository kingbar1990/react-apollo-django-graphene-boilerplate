import React from "react";
import { graphql, compose } from "react-apollo";

import { withAuth } from '../../../hocs/PrivateRoute';
import { User, editUser } from "../../../queries";

import Dashboard from "../../../containers/Dashboard";
import UserInfoCard from "../../../components/UserInfoCard";
import UserEditForm from "../../../components/UserEditForm";
import { getBase64 } from "../../../utils";

class EditUser extends React.Component {
  constructor() {
    super()
    this.state = {
      avatar: ''
    }

  }

  handleImageChange = (e) => {
    if (!e.target.files) {
      return;
    }
    let file = e.target.files[0];
    getBase64(file).then((image) => {
      file = image;
    }).then(() => this.setState({ avatar: file }))
  }

  handleEditUser = async (values, { setErrors }) => {
    let { fullName, email } = values;
    try {
      await this.props.edit({
        variables: {
          fullName: fullName,
          email: email,
          avatar: this.state.avatar,
        },
        refetchQueries: [{ query: User }]
      });
    } catch (error) {
      return setErrors(error);
    }
  };

  render() {
    const user = this.props.user.me || this.props.user;
    return (
      <Dashboard>
        <div className="row">
          <div className="col-lg-3 col-xlg-3 col-md-5">
            <UserInfoCard profile={user} />
          </div>
          <div className="col-lg-7 col-xlg-9 col-md-7">
            <UserEditForm
              initialValues={user}
              handleEditUser={this.handleEditUser}
              handleImageChange={this.handleImageChange}
            />
          </div>
        </div>
      </Dashboard>
    );
  }
}

export default compose(
  graphql(editUser, { name: "edit" }),
  graphql(User, { name: "user" })
)(EditUser);
