import React from "react";
import { graphql, compose } from "react-apollo";

import { User } from "../../../queries";

import Dashboard from "../../../containers/Dashboard";
import UserInfoCard from "../../../components/UserInfoCard";

class Profile extends React.Component {
  render() {
    const user = this.props.user.me ? this.props.user.me : this.props.user;
    return (
      <Dashboard>
        <div className="row">
          <div className="col-lg-3 col-xlg-3 col-md-5">
            <UserInfoCard profile={user} />
          </div>
        </div>
      </Dashboard>
    );
  }
}

export default compose(
  graphql(User, {
    name: 'user'
  })
)(Profile);
