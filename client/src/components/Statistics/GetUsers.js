import React from "react";
import { MDBCard } from "mdbreact";

import { compose, graphql, Query } from "react-apollo";

import { getUsers } from "../../queries";

import Loader from "../Loader";

class GetUsers extends React.Component {
  render() {
    const stylesOnCard = { width: "22rem", marginTop: "1rem" };
    return (
      <Query query={getUsers}>
        {({ loading, error, data }) => {
          if (loading) return <Loader styles={stylesOnCard} />;
          if (error) return `Error! ${error.message}`;

          return (
            <MDBCard className="card-body" style={stylesOnCard}>
              <h3>Users: {data.users.length}</h3>
            </MDBCard>
          );
        }}
      </Query>
    );
  }
}

export default compose(graphql(getUsers, { name: "users" }))(GetUsers);
