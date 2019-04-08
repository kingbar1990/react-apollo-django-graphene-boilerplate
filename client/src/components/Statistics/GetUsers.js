import React from "react";
import { graphql, Query } from "react-apollo";

import { MDBCard } from "mdbreact";

import i18n from "../../i18n";
import { getUsers } from "../../queries";

const GetUsers = () => {
  const stylesOnCard = { width: "22rem", marginTop: "1rem" };
  return (
    <Query query={getUsers}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error! ${error.message}`;
        return (
          <MDBCard className="card-body" style={stylesOnCard}>
            <h3>
              {i18n.t("Users")}: {data.users.length}
            </h3>
          </MDBCard>
        );
      }}
    </Query>
  );
};

export default graphql(getUsers, { name: "users" })(GetUsers);
