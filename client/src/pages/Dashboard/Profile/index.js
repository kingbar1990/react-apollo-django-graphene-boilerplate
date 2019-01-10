import React from "react";
import { graphql, compose } from "react-apollo";

import { profile } from "../../../queries";

import Dashboard from "../../../containers/Dashboard";

class Profile extends React.Component {
  render() {
    return (
      <Dashboard>
        <h1>Profile page</h1>
      </Dashboard>
    );
  }
}

export default compose(
  graphql(profile, {
    name: 'meProfile'
  })
)(Profile);
